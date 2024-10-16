class Api::V1::Accounts::CampaignsController < Api::V1::Accounts::BaseController
  before_action :campaign, except: [:index, :create]
  before_action :check_authorization

  def index
    @campaigns = Current.account.campaigns
  end

  def show; end

  def create
    @campaign = Current.account.campaigns.create!(campaign_params)
  end

  def update
    @campaign.update!(campaign_params)
  end

  def destroy
    @campaign.destroy!
    head :ok
  end

  def validate_zns_template
    inbox = Current.account.inboxes.find(campaign_params[:inbox_id])
    result, message = inbox.channel.validate_zns_template(campaign_params[:zns_template_id], campaign_params[:zns_template_data])
    if result
      render json: { success: true, message: message }
    else
      render json: { success: false, message: message }, status: :unprocessable_entity
    end
  end

  private

  def campaign
    @campaign ||= Current.account.campaigns.find_by(display_id: params[:id])
  end

  def campaign_params
    params.require(:campaign).permit(:title, :description, :message, :private_note, :trigger_only_during_business_hours,
                                     :scheduled_at, :inbox_id, :sender_id, :enabled, :campaign_type, :planned, :is_zns, :zns_template_id,
                                     inboxes: [:name, :id], audience: [:type, :id], flexible_scheduled_at: {}, trigger_rules: {},
                                     zns_template_data: [:key, :model, :type])
  end
end
