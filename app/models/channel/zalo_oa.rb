# == Schema Information
#
# Table name: channel_zalo_oa
#
#  id              :bigint           not null, primary key
#  expires_in      :integer          not null
#  oa_access_token :string           not null
#  refresh_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  account_id      :integer          not null
#  oa_id           :string           not null
#
# Indexes
#
#  index_channel_zalo_oa_on_oa_id  (oa_id) UNIQUE
#

class Channel::ZaloOa < ApplicationRecord
  include Channelable

  self.table_name = 'channel_zalo_oa'
  EDITABLE_ATTRS = [:oa_access_token, :refresh_token, :expires_in].freeze

  validates :oa_access_token, presence: true, length: { maximum: 2048 }
  validates :refresh_token, presence: true, length: { maximum: 2048 }
  validates :expires_in, presence: true
  validates :account_id, presence: true
  validates :oa_id, presence: true
  validates :oa_id, uniqueness: true

  def name
    'ZaloOa'
  end

  def send_message(user_id, message, access_token)
    responses = []
    # Check attachments to send first.
    message.attachments.each do |attachment|
      response = send_attachment(user_id, attachment, access_token)
      # If any error occurs, break and return this response along with the error message.
      responses << response
      return responses unless (response['error']).zero?
    end
    # Send the text message.
    # Please note that you cannot reply with a message that only has an attachment (isn't supported on ZaloOA)
    return responses if message.content.blank?

    body = message_body(user_id, message.content)
    body[:message][:quote_message_id] = message.content_attributes[:in_reply_to_external_id] if message.content_attributes[:in_reply_to_external_id]
    responses << send_message_cs(body, access_token)

    responses
  end

  def refresh_access_token(channel)
    response = refresh_post(channel.refresh_token)
    if response['access_token']
      channel.update!(oa_access_token: response['access_token'], refresh_token: response['refresh_token'],
                      expires_in: response['expires_in'])
    end
    response
  end

  def send_message_cs(body, access_token)
    HTTParty.post(
      url_message_cs,
      headers: { 'Content-Type' => 'application/json', 'access_token' => access_token },
      body: body.to_json
    )
  end

  def send_message_zns(phone, template_id, template_data, tracking_id)
    HTTParty.post(
      url_message_cs,
      headers: { 'Content-Type' => 'application/json', 'access_token' => oa_access_token },
      body: zns_body(phone, template_id, template_data, tracking_id).to_json
    )
  end

  def validate_zns_template(template_id, template_data)
    response = get_zns_template_info(template_id)

    return false, 'Không thể lấy thông tin tin nhắn mẫu' if response['error'] != 0

    return false, 'Tin nhắn mẫu chưa sẵn sàng để gửi tin' unless response['data']['status'].casecmp('ENABLE').zero?

    expected_params = template_data.to_set { |param| "#{param['model']}_#{param['key']}" }
    actual_params = response['data']['listParams'].to_set { |param| param['name'] }

    return false, 'Dữ liệu đưa vào mẫu tin chưa khớp' if expected_params != actual_params

    true
  end

  private

  def url_message_cs
    'https://openapi.zalo.me/v3.0/oa/message/cs'
  end

  def url_message_zns
    'https://business.openapi.zalo.me/message/template'
  end

  def url_refresh_token
    'https://oauth.zaloapp.com/v4/oa/access_token'
  end

  def url_upload_file
    'https://openapi.zalo.me/v2.0/oa/upload/file'
  end

  def url_upload_image
    'https://openapi.zalo.me/v2.0/oa/upload/image'
  end

  def url_zns_template_info
    'https://business.openapi.zalo.me/template/info/v2'
  end

  def get_zns_template_info(template_id)
    HTTParty.get(
      "#{url_zns_template_info}?template_id=#{template_id}",
      headers: { 'Content-Type' => 'application/json', 'access_token' => oa_access_token }
    )
  end

  def send_attachment(user_id, attachment, access_token)
    is_image = attachment.file_type == 'image'
    url_upload = is_image ? url_upload_image : url_upload_file
    return unless (response = upload_file_to_zalo_api(url_upload, attachment, access_token)).code == '200'

    data = JSON.parse(response.body)
    return data unless (data['error']).zero?

    body = is_image ? image_body(user_id, data['data']['attachment_id']) : attachment_body(user_id, data['data']['token'])
    send_message_cs(body, access_token)
  end

  # unknown issue with HTTParty so changed to Net::HTTP with success
  def upload_file_to_zalo_api(url_upload, attachment, access_token)
    url = URI.parse(url_upload)
    http = Net::HTTP.new(url.host, url.port)
    http.use_ssl = true

    request = Net::HTTP::Post.new(url.path)
    request['access_token'] = access_token
    request.content_type = 'multipart/form-data'
    request.set_form([
                       ['file', attachment.file.download, { filename: attachment.file.filename.to_s }],
                       ['file', attachment.file.download, { filename: attachment.file.filename.to_s }]
                     ], 'multipart/form-data')

    http.request(request)
  end

  def refresh_post(refresh_token)
    HTTParty.post(
      url_refresh_token,
      headers: { 'Content-Type' => 'application/x-www-form-urlencoded', 'secret_key' => ENV.fetch('ZALO_APP_SECRET', nil) },
      body: refresh_body(refresh_token)
    )
  end

  def refresh_body(refresh_token)
    {
      refresh_token: refresh_token,
      app_id: ENV.fetch('ZALO_APP_ID', nil),
      grant_type: 'refresh_token'
    }
  end

  def attachment_body(user_id, file_token)
    {
      recipient: { user_id: user_id },
      message: {
        attachment: {
          type: 'file',
          payload: {
            token: file_token
          }
        }
      }
    }
  end

  def image_body(user_id, attachment_id)
    {
      recipient: { user_id: user_id },
      message: {
        attachment: {
          type: 'template',
          payload: {
            template_type: 'media',
            elements: [{
              media_type: 'image',
              attachment_id: attachment_id
            }]
          }
        }
      }
    }
  end

  def message_body(user_id, message_content)
    {
      recipient: { user_id: user_id },
      message: { text: message_content }
    }
  end

  def zns_body(phone, template_id, template_data, tracking_id)
    {
      mode: 'development',
      phone: phone,
      template_id: template_id,
      template_data: template_data,
      tracking_id: tracking_id
    }
  end
end
