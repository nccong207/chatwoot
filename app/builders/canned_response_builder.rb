class CannedResponseBuilder
  include ::FileTypeHelper
  attr_reader :canned_response

  def initialize(account, params)
    @params = params
    @account = account
    return unless params.instance_of?(ActionController::Parameters) # TODO: Need to check this line

    @attachments = params[:attachments]
  end

  def perform
    @canned_response = @account.canned_responses.build(canned_response_params)
    process_attachments
    @canned_response.save!
    @canned_response
  end

  private

  def process_attachments
    return if @attachments.blank?

    @attachments.each do |uploaded_attachment|
      filename = I18n.transliterate(uploaded_attachment.original_filename)
      filename = filename.gsub(/[?]/, '')
      uploaded_attachment.original_filename = filename
      attachment = @canned_response.canned_attachments.build(
        account_id: @canned_response.account_id,
        file: uploaded_attachment
      )

      attachment.file_type = if uploaded_attachment.is_a?(String)
                               file_type_by_signed_id(
                                 uploaded_attachment
                               )
                             else
                               file_type(uploaded_attachment&.content_type)
                             end
    end
  end

  def canned_response_params
    {
      short_code: @params[:short_code],
      content: @params[:content]
    }
  end
end
