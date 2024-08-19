class Api::V1::Accounts::CannedResponsesController < Api::V1::Accounts::BaseController
  include ::FileTypeHelper
  before_action :fetch_canned_response, only: [:update, :destroy]

  def index
    @canned_responses = fetch_canned_responses
  end

  def create
    account = Current.account
    cb = CannedResponseBuilder.new(account, canned_response_params)
    @canned_response = cb.perform
  rescue StandardError => e
    render_could_not_create_error(e.message)
  end

  def update
    @canned_response.update!(canned_response_params.except(:attachments))
    process_attachments
    @canned_response.save!
  end

  def destroy
    @canned_response.destroy!
    head :ok
  end

  private

  def fetch_canned_response
    @canned_response = Current.account.canned_responses.find(params[:id])
  end

  def canned_response_params
    params.require(:canned_response).permit(:short_code, :content, attachments: [])
  end

  def fetch_canned_responses
    if params[:search]
      Current.account.canned_responses
             .where('short_code ILIKE :search OR content ILIKE :search', search: "%#{params[:search]}%")
             .order_by_search(params[:search])

    else
      Current.account.canned_responses
    end
  end

  def process_attachments
    @attachments = canned_response_params[:attachments]
    return if @attachments.blank?

    process_canned_attachments_should_be_removed

    @attachments.each do |uploaded_attachment|
      next if uploaded_attachment.is_a?(String) # TODO: else - Handle in case directly uploading with Cloud Storage

      filename = I18n.transliterate(uploaded_attachment.original_filename)
      filename = filename.gsub(/[?]/, '')
      uploaded_attachment.original_filename = filename

      attachment = @canned_response.canned_attachments.build(
        account_id: @canned_response.account_id,
        file: uploaded_attachment
      )

      attachment.file_type = file_type(uploaded_attachment&.content_type)
    end
  end

  def process_canned_attachments_should_be_removed
    current_blob_signed_ids = []
    current_attachments = []
    @canned_response.canned_attachments.each do |ca|
      current_blob_signed_ids << ca.file_blob.signed_id
      current_attachments << {
        canned_attachment_id: ca.id,
        blob_id: ca.file_blob&.id,
        blob_signed_id: ca.file_blob&.signed_id
      }
    end

    blobs_to_be_deleted = current_blob_signed_ids - @attachments.select { |i| i.is_a?(String) }
    canned_attachments_to_be_deleted = current_attachments.select { |i| blobs_to_be_deleted.include?(i[:blob_signed_id]) }
    ca_ids_to_be_deleted = canned_attachments_to_be_deleted.pluck(:canned_attachment_id)

    @canned_response.canned_attachments.where(id: ca_ids_to_be_deleted).destroy_all
  end
end
