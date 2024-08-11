class CreateCannedAttachments < ActiveRecord::Migration[7.0]
  def change
    create_table 'canned_attachments', id: :serial do |t|
      t.integer 'file_type', default: 0
      t.string 'external_url'
      t.float 'coordinates_lat', default: 0.0
      t.float 'coordinates_long', default: 0.0
      t.integer 'canned_response_id', null: false
      t.integer 'account_id', null: false
      t.datetime 'created_at', precision: nil, null: false
      t.datetime 'updated_at', precision: nil, null: false
      t.string 'fallback_title'
      t.string 'extension'
      t.index ['account_id'], name: 'index_canned_attachments_on_account_id'
      t.index ['canned_response_id'], name: 'index_canned_attachments_on_canned_response_id'
    end
  end
end
