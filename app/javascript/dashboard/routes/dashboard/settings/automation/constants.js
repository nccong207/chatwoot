import {
  OPERATOR_TYPES_1,
  OPERATOR_TYPES_2,
  OPERATOR_TYPES_3,
  OPERATOR_TYPES_4,
  OPERATOR_TYPES_5,
  OPERATOR_TYPES_6,
  OPERATOR_TYPES_7,
} from './operators';

export const AUTOMATIONS = {
  message_created: {
    conditions: [
      {
        key: 'message_type',
        name: 'Message Type',
        attributeI18nKey: 'MESSAGE_TYPE',
        inputType: 'search_select',
        filterOperators: OPERATOR_TYPES_1,
      },
      {
        key: 'content',
        name: 'Message Content',
        attributeI18nKey: 'MESSAGE_CONTENT',
        inputType: 'comma_separated_plain_text',
        filterOperators: OPERATOR_TYPES_2,
      },
      {
        key: 'email',
        name: 'Email',
        attributeI18nKey: 'EMAIL',
        inputType: 'plain_text',
        filterOperators: OPERATOR_TYPES_2,
      },
      {
        key: 'inbox_id',
        name: 'Inbox',
        attributeI18nKey: 'INBOX_NAME',
        inputType: 'multi_select',
        filterOperators: OPERATOR_TYPES_1,
      },
      {
        key: 'phone_number',
        name: 'Phone Number',
        attributeI18nKey: 'PHONE_NUMBER',
        inputType: 'plain_text',
        filterOperators: OPERATOR_TYPES_6,
      },
    ],
    actions: [
      {
        key: 'assign_agent',
        name: 'Assign to agent',
      },
      {
        key: 'assign_team',
        name: 'Assign a team',
      },
      {
        key: 'add_label',
        name: 'Add a label',
      },
      {
        key: 'remove_label',
        name: 'Remove a label',
      },
      {
        key: 'send_email_to_team',
        name: 'Send an email to team',
      },
      {
        key: 'send_message',
        name: 'Send a message',
      },
      {
        key: 'send_email_transcript',
        name: 'Send an email transcript',
      },
      {
        key: 'mute_conversation',
        name: 'Mute conversation',
      },
      {
        key: 'snooze_conversation',
        name: 'Snooze conversation',
      },

      {
        key: 'resolve_conversation',
        name: 'Resolve conversation',
      },
      {
        key: 'send_webhook_event',
        name: 'Send Webhook Event',
      },
      {
        key: 'send_attachment',
        name: 'Send Attachment',
      },
    ],
  },
  conversation_created: {
    conditions: [
      {
        key: 'status',
        name: 'Status',
        attributeI18nKey: 'STATUS',
        inputType: 'multi_select',
        filterOperators: OPERATOR_TYPES_1,
      },
      {
        key: 'mail_subject',
        name: 'Email Subject',
        attributeI18nKey: 'MAIL_SUBJECT',
        inputType: 'plain_text',
        filterOperators: OPERATOR_TYPES_2,
      },
      {
        key: 'phone_number',
        name: 'Phone Number',
        attributeI18nKey: 'PHONE_NUMBER',
        inputType: 'plain_text',
        filterOperators: OPERATOR_TYPES_6,
      },
      {
        key: 'referer',
        name: 'Referrer Link',
        attributeI18nKey: 'REFERER_LINK',
        inputType: 'plain_text',
        filterOperators: OPERATOR_TYPES_2,
      },
      {
        key: 'email',
        name: 'Email',
        attributeI18nKey: 'EMAIL',
        inputType: 'plain_text',
        filterOperators: OPERATOR_TYPES_2,
      },
      {
        key: 'inbox_id',
        name: 'Inbox',
        attributeI18nKey: 'INBOX_NAME',
        inputType: 'multi_select',
        filterOperators: OPERATOR_TYPES_1,
      },
      {
        key: 'priority',
        name: 'Priority',
        attributeI18nKey: 'PRIORITY',
        inputType: 'multi_select',
        filterOperators: OPERATOR_TYPES_1,
      },
    ],
    actions: [
      {
        key: 'assign_agent',
        name: 'Assign to agent',
      },
      {
        key: 'assign_team',
        name: 'Assign a team',
      },
      // Duplicated Key
      // {
      //   key: 'assign_agent',
      //   name: 'Assign an agent',
      // },
      {
        key: 'send_email_to_team',
        name: 'Send an email to team',
      },
      {
        key: 'send_message',
        name: 'Send a message',
      },
      {
        key: 'send_email_transcript',
        name: 'Send an email transcript',
      },
      {
        key: 'mute_conversation',
        name: 'Mute conversation',
      },
      {
        key: 'snooze_conversation',
        name: 'Snooze conversation',
      },
      {
        key: 'resolve_conversation',
        name: 'Resolve conversation',
      },
      {
        key: 'send_webhook_event',
        name: 'Send Webhook Event',
      },
      {
        key: 'send_attachment',
        name: 'Send Attachment',
      },
    ],
  },
  conversation_updated: {
    conditions: [
      {
        key: 'status',
        name: 'Status',
        attributeI18nKey: 'STATUS',
        inputType: 'multi_select',
        filterOperators: OPERATOR_TYPES_1,
      },
      {
        key: 'mail_subject',
        name: 'Email Subject',
        attributeI18nKey: 'MAIL_SUBJECT',
        inputType: 'plain_text',
        filterOperators: OPERATOR_TYPES_2,
      },
      {
        key: 'referer',
        name: 'Referrer Link',
        attributeI18nKey: 'REFERER_LINK',
        inputType: 'plain_text',
        filterOperators: OPERATOR_TYPES_2,
      },
      {
        key: 'phone_number',
        name: 'Phone Number',
        attributeI18nKey: 'PHONE_NUMBER',
        inputType: 'plain_text',
        filterOperators: OPERATOR_TYPES_6,
      },
      {
        key: 'assignee_id',
        name: 'Assignee',
        attributeI18nKey: 'ASSIGNEE_NAME',
        inputType: 'search_select',
        filterOperators: OPERATOR_TYPES_3,
      },
      {
        key: 'team_id',
        name: 'Team',
        attributeI18nKey: 'TEAM_NAME',
        inputType: 'search_select',
        filterOperators: OPERATOR_TYPES_3,
      },
      {
        key: 'email',
        name: 'Email',
        attributeI18nKey: 'EMAIL',
        inputType: 'plain_text',
        filterOperators: OPERATOR_TYPES_2,
      },
      {
        key: 'inbox_id',
        name: 'Inbox',
        attributeI18nKey: 'INBOX_NAME',
        inputType: 'multi_select',
        filterOperators: OPERATOR_TYPES_1,
      },
      {
        key: 'priority',
        name: 'Priority',
        attributeI18nKey: 'PRIORITY',
        inputType: 'multi_select',
        filterOperators: OPERATOR_TYPES_1,
      },
    ],
    actions: [
      {
        key: 'assign_agent',
        name: 'Assign to agent',
      },
      {
        key: 'assign_team',
        name: 'Assign a team',
      },
      // Duplicated Key
      // {
      //   key: 'assign_agent',
      //   name: 'Assign an agent',
      // },
      {
        key: 'send_email_to_team',
        name: 'Send an email to team',
      },
      {
        key: 'send_message',
        name: 'Send a message',
      },
      {
        key: 'send_private_note',
        name: 'Send a private note',
      },
      {
        key: 'send_email_transcript',
        name: 'Send an email transcript',
      },
      {
        key: 'mute_conversation',
        name: 'Mute conversation',
      },
      {
        key: 'snooze_conversation',
        name: 'Snooze conversation',
      },
      {
        key: 'resolve_conversation',
        name: 'Resolve conversation',
      },
      {
        key: 'send_webhook_event',
        name: 'Send Webhook Event',
      },
      {
        key: 'send_attachment',
        name: 'Send Attachment',
      },
    ],
  },
  conversation_opened: {
    conditions: [
      {
        key: 'email',
        name: 'Email',
        attributeI18nKey: 'EMAIL',
        inputType: 'plain_text',
        filterOperators: OPERATOR_TYPES_2,
      },
      {
        key: 'mail_subject',
        name: 'Email Subject',
        attributeI18nKey: 'MAIL_SUBJECT',
        inputType: 'plain_text',
        filterOperators: OPERATOR_TYPES_2,
      },
      {
        key: 'referer',
        name: 'Referrer Link',
        attributeI18nKey: 'REFERER_LINK',
        inputType: 'plain_text',
        filterOperators: OPERATOR_TYPES_2,
      },
      {
        key: 'assignee_id',
        name: 'Assignee',
        attributeI18nKey: 'ASSIGNEE_NAME',
        inputType: 'search_select',
        filterOperators: OPERATOR_TYPES_3,
      },
      {
        key: 'phone_number',
        name: 'Phone Number',
        attributeI18nKey: 'PHONE_NUMBER',
        inputType: 'plain_text',
        filterOperators: OPERATOR_TYPES_6,
      },
      {
        key: 'team_id',
        name: 'Team',
        attributeI18nKey: 'TEAM_NAME',
        inputType: 'search_select',
        filterOperators: OPERATOR_TYPES_3,
      },
      {
        key: 'inbox_id',
        name: 'Inbox',
        attributeI18nKey: 'INBOX_NAME',
        inputType: 'multi_select',
        filterOperators: OPERATOR_TYPES_1,
      },
      {
        key: 'priority',
        name: 'Priority',
        attributeI18nKey: 'PRIORITY',
        inputType: 'multi_select',
        filterOperators: OPERATOR_TYPES_1,
      },
    ],
    actions: [
      {
        key: 'assign_agent',
        name: 'Assign to agent',
      },
      {
        key: 'assign_team',
        name: 'Assign a team',
      },
      // Duplicated Key
      // {
      //   key: 'assign_agent',
      //   name: 'Assign an agent',
      //   attributeI18nKey: 'ASSIGN_AGENT',
      // },
      {
        key: 'send_email_to_team',
        name: 'Send an email to team',
      },
      {
        key: 'send_message',
        name: 'Send a message',
      },
      {
        key: 'send_email_transcript',
        name: 'Send an email transcript',
      },
      {
        key: 'mute_conversation',
        name: 'Mute conversation',
      },
      {
        key: 'snooze_conversation',
        name: 'Snooze conversation',
      },
      {
        key: 'send_webhook_event',
        name: 'Send Webhook Event',
      },
      {
        key: 'send_attachment',
        name: 'Send Attachment',
      },
    ],
  },
  contact_created: {
    conditions: [
      {
        key: 'name',
        attributeI18nKey: 'NAME',
        inputType: 'plain_text',
        dataType: 'text',
        filterOperators: OPERATOR_TYPES_1,
        attribute_type: 'standard',
      },
      {
        key: 'email',
        attributeI18nKey: 'EMAIL',
        inputType: 'plain_text',
        dataType: 'text',
        filterOperators: OPERATOR_TYPES_7,
        attribute_type: 'standard',
      },
      {
        key: 'phone_number',
        attributeI18nKey: 'PHONE_NUMBER',
        inputType: 'plain_text',
        dataType: 'text',
        filterOperators: OPERATOR_TYPES_7,
        attribute_type: 'standard',
      },
      {
        key: 'initial_channel_type',
        attributeI18nKey: 'INITIAL_CHANNEL',
        inputType: 'plain_text',
        dataType: 'text',
        filterOperators: OPERATOR_TYPES_1,
        attribute_type: 'standard',
      },
      {
        key: 'stage_id',
        attributeI18nKey: 'STAGE',
        inputType: 'search_select',
        dataType: 'number',
        filterOperators: OPERATOR_TYPES_3,
        attribute_type: 'standard',
      },
      {
        key: 'assignee_id',
        attributeI18nKey: 'ASSIGNEE_ID',
        inputType: 'search_select',
        dataType: 'number',
        filterOperators: OPERATOR_TYPES_3,
        attribute_type: 'standard',
      },
      {
        key: 'team_id',
        attributeI18nKey: 'TEAM',
        inputType: 'search_select',
        dataType: 'number',
        filterOperators: OPERATOR_TYPES_3,
        attribute_type: 'standard',
      },
      {
        key: 'product_id',
        attributeI18nKey: 'PRODUCT',
        inputType: 'search_select',
        dataType: 'number',
        filterOperators: OPERATOR_TYPES_3,
        attribute_type: 'standard',
      },
      {
        key: 'po_value',
        attributeI18nKey: 'PO_VALUE',
        inputType: 'number',
        dataType: 'number',
        filterOperators: OPERATOR_TYPES_4,
        attribute_type: 'standard',
      },
      {
        key: 'po_date',
        attributeI18nKey: 'PO_DATE',
        inputType: 'date',
        dataType: 'text',
        filterOperators: OPERATOR_TYPES_5,
        attribute_type: 'standard',
      },
      {
        key: 'created_at',
        attributeI18nKey: 'CREATED_AT',
        inputType: 'date',
        dataType: 'text',
        filterOperators: OPERATOR_TYPES_5,
        attributeModel: 'standard',
      },
      {
        key: 'last_activity_at',
        attributeI18nKey: 'LAST_ACTIVITY',
        inputType: 'date',
        dataType: 'text',
        filterOperators: OPERATOR_TYPES_5,
        attributeModel: 'standard',
      },
    ],
    actions: [
      {
        key: 'assign_agent',
        name: 'Assign to agent',
      },
      {
        key: 'assign_team',
        name: 'Assign a team',
      },
      {
        key: 'update_contact_stage',
        name: 'Update Contact Stage',
      },
      {
        key: 'send_email_to_team',
        name: 'Send an email to team',
      },
      {
        key: 'send_message',
        name: 'Send a message',
      },
      {
        key: 'send_email_transcript',
        name: 'Send an email transcript',
      },
      {
        key: 'mute_conversation',
        name: 'Mute conversation',
      },
      {
        key: 'snooze_conversation',
        name: 'Snooze conversation',
      },
      {
        key: 'resolve_conversation',
        name: 'Resolve conversation',
      },
      {
        key: 'send_webhook_event',
        name: 'Send Webhook Event',
      },
      {
        key: 'send_attachment',
        name: 'Send Attachment',
      },
    ],
  },
  contact_updated: {
    conditions: [
      {
        key: 'name',
        attributeI18nKey: 'NAME',
        inputType: 'plain_text',
        dataType: 'text',
        filterOperators: OPERATOR_TYPES_1,
        attribute_type: 'standard',
      },
      {
        key: 'email',
        attributeI18nKey: 'EMAIL',
        inputType: 'plain_text',
        dataType: 'text',
        filterOperators: OPERATOR_TYPES_7,
        attribute_type: 'standard',
      },
      {
        key: 'phone_number',
        attributeI18nKey: 'PHONE_NUMBER',
        inputType: 'plain_text',
        dataType: 'text',
        filterOperators: OPERATOR_TYPES_7,
        attribute_type: 'standard',
      },
      {
        key: 'initial_channel_type',
        attributeI18nKey: 'INITIAL_CHANNEL',
        inputType: 'plain_text',
        dataType: 'text',
        filterOperators: OPERATOR_TYPES_1,
        attribute_type: 'standard',
      },
      {
        key: 'stage_id',
        attributeI18nKey: 'STAGE',
        inputType: 'search_select',
        dataType: 'number',
        filterOperators: OPERATOR_TYPES_3,
        attribute_type: 'standard',
      },
      {
        key: 'assignee_id',
        attributeI18nKey: 'ASSIGNEE_ID',
        inputType: 'search_select',
        dataType: 'number',
        filterOperators: OPERATOR_TYPES_3,
        attribute_type: 'standard',
      },
      {
        key: 'team_id',
        attributeI18nKey: 'TEAM',
        inputType: 'search_select',
        dataType: 'number',
        filterOperators: OPERATOR_TYPES_3,
        attribute_type: 'standard',
      },
      {
        key: 'product_id',
        attributeI18nKey: 'PRODUCT',
        inputType: 'search_select',
        dataType: 'number',
        filterOperators: OPERATOR_TYPES_3,
        attribute_type: 'standard',
      },
      {
        key: 'po_value',
        attributeI18nKey: 'PO_VALUE',
        inputType: 'number',
        dataType: 'number',
        filterOperators: OPERATOR_TYPES_4,
        attribute_type: 'standard',
      },
      {
        key: 'po_date',
        attributeI18nKey: 'PO_DATE',
        inputType: 'date',
        dataType: 'text',
        filterOperators: OPERATOR_TYPES_5,
        attribute_type: 'standard',
      },
      {
        key: 'created_at',
        attributeI18nKey: 'CREATED_AT',
        inputType: 'date',
        dataType: 'text',
        filterOperators: OPERATOR_TYPES_5,
        attributeModel: 'standard',
      },
      {
        key: 'last_activity_at',
        attributeI18nKey: 'LAST_ACTIVITY',
        inputType: 'date',
        dataType: 'text',
        filterOperators: OPERATOR_TYPES_5,
        attributeModel: 'standard',
      },
    ],
    actions: [
      {
        key: 'assign_agent',
        name: 'Assign to agent',
      },
      {
        key: 'assign_team',
        name: 'Assign a team',
      },
      {
        key: 'update_contact_stage',
        name: 'Update Contact Stage',
      },
      {
        key: 'send_email_to_team',
        name: 'Send an email to team',
      },
      {
        key: 'send_message',
        name: 'Send a message',
      },
      {
        key: 'send_email_transcript',
        name: 'Send an email transcript',
      },
      {
        key: 'mute_conversation',
        name: 'Mute conversation',
      },
      {
        key: 'snooze_conversation',
        name: 'Snooze conversation',
      },
      {
        key: 'resolve_conversation',
        name: 'Resolve conversation',
      },
      {
        key: 'send_webhook_event',
        name: 'Send Webhook Event',
      },
      {
        key: 'send_attachment',
        name: 'Send Attachment',
      },
    ], // Nguoi/Nhom Phu Trach, Ghi chu, Lich lien he, them nhan, xoa nhan, custom: chi nhanh,
  },
};

// NOTE: USE FOR THE EVENT SELECT DROPDOWN
export const AUTOMATION_RULE_EVENTS = [
  {
    key: 'conversation_created',
    value: 'Conversation Created',
  },
  {
    key: 'conversation_updated',
    value: 'Conversation Updated',
  },
  {
    key: 'message_created',
    value: 'Message Created',
  },
  {
    key: 'conversation_opened',
    value: 'Conversation Opened',
  },
  {
    key: 'contact_created',
    value: 'Contact Created',
  },
  {
    key: 'contact_updated',
    value: 'Contact Updated',
  },
];

export const AUTOMATION_ACTION_TYPES = [
  {
    key: 'assign_agent',
    label: 'Assign to agent',
    inputType: 'search_select',
    attributeI18nKey: 'ASSIGN_AGENT',
  },
  {
    key: 'assign_team',
    label: 'Assign a team',
    inputType: 'search_select',
    attributeI18nKey: 'ASSIGN_TEAM',
  },
  {
    key: 'update_contact_stage',
    label: 'Update contact stage',
    inputType: 'search_select',
    attributeI18nKey: 'UPDATE_CONTACT_STAGE',
  },
  {
    key: 'add_label',
    label: 'Add a label',
    inputType: 'multi_select',
    attributeI18nKey: 'ADD_LABEL',
  },
  {
    key: 'remove_label',
    label: 'Remove a label',
    inputType: 'multi_select',
    attributeI18nKey: 'REMOVE_LABEL',
  },
  {
    key: 'send_email_to_team',
    label: 'Send an email to team',
    inputType: 'team_message',
    attributeI18nKey: 'SEND_EMAIL_TO_TEAM',
  },
  {
    key: 'send_email_transcript',
    label: 'Send an email transcript',
    inputType: 'email',
    attributeI18nKey: 'SEND_EMAIL_TRANSCRIPT',
  },
  {
    key: 'mute_conversation',
    label: 'Mute conversation',
    inputType: null,
    attributeI18nKey: 'MUTE_CONVERSATION',
  },
  {
    key: 'snooze_conversation',
    label: 'Snooze conversation',
    inputType: null,
    attributeI18nKey: 'SNOOZE_CONVERSATION',
  },
  {
    key: 'resolve_conversation',
    label: 'Resolve conversation',
    inputType: null,
    attributeI18nKey: 'RESOLVE_CONVERSATION',
  },
  {
    key: 'send_webhook_event',
    label: 'Send Webhook Event',
    inputType: 'url',
    attributeI18nKey: 'SEND_WEBHOOK_EVENT',
  },
  {
    key: 'send_attachment',
    label: 'Send Attachment',
    inputType: 'attachment',
    attributeI18nKey: 'SEND_ATTACHMENT',
  },
  {
    key: 'send_message',
    label: 'Send a message',
    inputType: 'textarea',
    attributeI18nKey: 'SEND_MESSAGE',
  },
  {
    key: 'send_private_note',
    label: 'Send a private note',
    inputType: 'textarea',
    attributeI18nKey: 'SEND_PRIVATE_NOTE',
  },
  {
    key: 'change_priority',
    label: 'Change Priority',
    inputType: 'search_select',
    attributeI18nKey: 'CHANGE_PRIORITY',
  },
  {
    key: 'add_sla',
    label: 'Add SLA',
    inputType: 'search_select',
    attributeI18nKey: 'ADD_SLA',
  },
];

export const AUTOMATION_CONTACT_EVENTS = ['contact_created', 'contact_updated'];
