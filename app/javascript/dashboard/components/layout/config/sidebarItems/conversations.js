import { frontendURL } from '../../../../helper/URLHelper';

const conversations = accountId => ({
  parentNav: 'conversations',
  routes: [
    'home',
    'inbox_dashboard',
    'inbox_conversation',
    'conversation_through_inbox',
    'notifications_dashboard',
    'label_conversations',
    'conversations_through_label',
    'team_conversations',
    'conversations_through_team',
    'conversation_mentions',
    'conversation_through_mentions',
    'conversation_unread',
    'conversation_through_unread',
    'folder_conversations',
    'conversations_through_folders',
    'conversation_unattended',
    'conversation_through_unattended',
    'conversation_open_status',
    'conversation_through_open_status',
    'conversation_open_from_snoozed_status',
    'conversation_through_open_from_snoozed_status',
    'conversation_pending_status',
    'conversation_through_pending_status',
    'conversation_snoozed_status',
    'conversation_through_snoozed_status',
    'conversation_resolved_status',
    'conversation_through_resolved_status',
  ],
  menuItems: [
    {
      icon: 'chat',
      label: 'ALL_CONVERSATIONS',
      toolTip: 'ALL_CONVERSATIONS_TOOLTIP',
      key: 'conversations',
      toState: frontendURL(`accounts/${accountId}/dashboard`),
      toStateName: 'home',
      params: {},
    },
    {
      icon: 'person-chat',
      label: 'UNATTENDED_CONVERSATIONS',
      toolTip: 'UNATTENDED_CONVERSATIONS_TOOLTIP',
      key: 'conversation_unattended',
      toState: frontendURL(`accounts/${accountId}/unattended/conversations`),
      toStateName: 'conversation_unattended',
      params: { conversationType: 'unattended' },
    },
    {
      icon: 'mail-unread',
      label: 'UNREAD_CONVERSATIONS',
      toolTip: 'UNREAD_CONVERSATIONS_TOOLTIP',
      key: 'conversation_unread',
      toState: frontendURL(`accounts/${accountId}/unread/conversations`),
      toStateName: 'conversation_unread',
      params: { conversationType: 'unread' },
    },
    {
      icon: 'mention',
      label: 'MENTIONED_CONVERSATIONS',
      toolTip: 'MENTIONED_CONVERSATIONS_TOOLTIP',
      key: 'conversation_mentions',
      toState: frontendURL(`accounts/${accountId}/mentions/conversations`),
      toStateName: 'conversation_mentions',
      params: { conversationType: 'mention' },
    },
  ],
});

export default conversations;
