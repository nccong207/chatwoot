class TeamPolicy < ApplicationPolicy
  def index?
    true
  end

  def update?
    @account_user.administrator?
  end

  def show?
    true
  end

  def create?
    @account_user.administrator?
  end

  def destroy?
    @account_user.administrator?
  end

  def my_team?
    true
  end

  def leader?
    @account_user.administrator?
  end

  def update_leader?
    @account_user.administrator?
  end
end
