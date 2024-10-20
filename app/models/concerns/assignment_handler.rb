module AssignmentHandler
  extend ActiveSupport::Concern
  include Events::Types

  included do
    before_validation :ensure_assignee_is_from_contact_assignee
    before_save :ensure_assignee_is_from_team
    after_commit :notify_assignment_change, :process_assignment_changes
  end

  private

  def ensure_assignee_is_from_contact_assignee
    return unless new_record? && !snoozed? && inbox.channel_id == contact.initial_channel_id

    set_agent
    set_team
  end

  def set_agent
    self.assignee = contact.assignee if contact.assignee.present? && inbox.assignable_agents.include?(contact.assignee)
  end

  def set_team
    if contact.team.present? && inbox.team.blank?
      self.team = contact.team
    elsif inbox.team.present?
      self.team = inbox.team
    end
  end

  def ensure_assignee_is_from_team
    return unless team_id_changed? && !snoozed?

    validate_current_assignee_team
    self.assignee ||= find_assignee_from_team
  end

  def validate_current_assignee_team
    self.assignee_id = nil if team&.members&.exclude?(assignee)
  end

  def find_assignee_from_team
    return if team&.allow_auto_assign.blank?

    team_members_with_capacity = inbox.agents.ids
    ::AutoAssignment::AgentAssignmentService.new(conversation: self, allowed_agent_ids: team_members_with_capacity).find_assignee
  end

  def notify_assignment_change
    {
      ASSIGNEE_CHANGED => -> { saved_change_to_assignee_id? },
      TEAM_CHANGED => -> { saved_change_to_team_id? }
    }.each do |event, condition|
      condition.call && dispatcher_dispatch(event)
    end
  end

  def process_assignment_changes
    process_assignment_activities
    process_participant_assignment
  end

  def process_assignment_activities
    user_name = Current.user.name if Current.user.present?
    if saved_change_to_team_id?
      create_team_change_activity(user_name)
    elsif saved_change_to_assignee_id?
      create_assignee_change_activity(user_name)
    end
  end

  def process_participant_assignment
    return unless saved_change_to_assignee_id? && assignee_id.present?

    conversation_participants.find_or_create_by!(user_id: assignee_id)
  end
end
