class Api::V1::Accounts::StagesController < Api::V1::Accounts::BaseController
  before_action :fetch_stages
  before_action :fetch_stage, only: [:show, :update]

  def index
    render json: @stages.to_json
  end

  def show
    render json: @stage.to_json
  end

  def update
    @stage.update!(permitted_payload)
    render json: @stage.to_json
  end

  private

  def fetch_stages
    @stages = Current.account.stages.order(id: :asc)
    return if permitted_params[:stage_type].blank?

    stage_type = Stage::STAGE_TYPE_MAPPING[permitted_params[:stage_type]]
    both_type = Stage::STAGE_TYPE_MAPPING['both']
    @stages = @stages.where("stage_type = #{stage_type} or stage_type = #{both_type} or #{stage_type} = #{both_type}")
  end

  def fetch_stage
    @stage = Current.account.stages.find(permitted_params[:id])
  end

  def permitted_payload
    params.require(:stage).permit(
      :name,
      :description,
      :disabled
    )
  end

  def permitted_params
    params.permit(:id, :stage_type)
  end
end
