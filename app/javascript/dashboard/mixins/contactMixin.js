import { format } from 'date-fns';

export default {
  methods: {
    currentActionText(action) {
      if (!action) return '';
      const status = this.$t(
        'CHAT_LIST.CHAT_STATUS_FILTER_ITEMS.' + action.status + '.TEXT'
      );
      const actionDate = action.snoozed_until || action.updated_at;
      const actionDateText = format(new Date(actionDate), 'dd/MM/yy');
      const actionText = `${action.inbox_type} / ${status}  (${actionDateText})`;
      if (action.additional_attributes.description)
        return `${action.additional_attributes.description} / ${actionText}`;

      return actionText;
    },
    currentConversationPlanText(conversation_plans) {
      if (!conversation_plans.length) return '';

      const latest_conversation_plan = conversation_plans.find(
        conversation_plan => conversation_plan.completed_at === null
      );
      if (!latest_conversation_plan) return '';

      const {
        description,
        status,
        action_date: actionDate,
        inbox_type: inboxType,
      } = latest_conversation_plan;

      const status_text = this.$t(
        'CHAT_LIST.CHAT_STATUS_FILTER_ITEMS.' + status + '.TEXT'
      );
      const actionDateText = format(new Date(actionDate), 'dd/MM/yy');
      const actionText = `${inboxType} / ${status_text}  (${actionDateText})`;
      if (description) return `${description} / ${actionText}`;

      return actionText;
    },
  },
};
