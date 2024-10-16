/* global axios */
import ApiClient from './ApiClient';

export const buildContactParams = (
  page,
  sortAttr,
  label,
  stageType,
  stageCode,
  search
) => {
  let params = `include_contact_inboxes=false&page=${page}&sort=${sortAttr}`;
  if (search) {
    params = `${params}&q=${search}`;
  }
  if (label) {
    params = `${params}&labels[]=${label}`;
  }
  if (stageType) {
    params = `${params}&stage_type=${stageType}`;
  }
  if (stageCode) {
    params = `${params}&stage_code=${stageCode}`;
  }
  return params;
};

class ContactAPI extends ApiClient {
  constructor() {
    super('contacts', { accountScoped: true });
  }

  get(page, sortAttr = 'name', label = '', stageType = '', stageCode = '') {
    let requestURL = `${this.url}?${buildContactParams(
      page,
      sortAttr,
      label,
      stageType,
      stageCode,
      ''
    )}`;
    return axios.get(requestURL);
  }

  getConversations(contactId) {
    return axios.get(`${this.url}/${contactId}/conversations`);
  }

  getTransactions(contactId) {
    return axios.get(`${this.url}/${contactId}/transactions`);
  }

  getConversationPlans(contactId) {
    return axios.get(`${this.url}/${contactId}/conversation_plans`);
  }

  getContactableInboxes(contactId) {
    return axios.get(`${this.url}/${contactId}/contactable_inboxes`);
  }

  getContactLabels(contactId) {
    return axios.get(`${this.url}/${contactId}/labels`);
  }

  updateContactLabels(contactId, labels) {
    return axios.post(`${this.url}/${contactId}/labels`, { labels });
  }

  search(
    search = '',
    page = 1,
    sortAttr = 'name',
    label = '',
    stageType = '',
    stageCode = ''
  ) {
    let requestURL = `${this.url}/search?${buildContactParams(
      page,
      sortAttr,
      label,
      stageType,
      stageCode,
      search
    )}`;
    return axios.get(requestURL);
  }

  availableProducts(queryPayload) {
    return axios.post(`${this.url}/available_products`, queryPayload);
  }

  // eslint-disable-next-line default-param-last
  filter(page = 1, sortAttr = 'name', stageType, stageCode, queryPayload) {
    let requestURL = `${this.url}/filter?${buildContactParams(
      page,
      sortAttr,
      '',
      stageType,
      stageCode
    )}`;
    return axios.post(requestURL, queryPayload);
  }

  importContacts(file) {
    const formData = new FormData();
    formData.append('import_file', file);
    return axios.post(`${this.url}/import`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }

  destroyCustomAttributes(contactId, customAttributes) {
    return axios.post(`${this.url}/${contactId}/destroy_custom_attributes`, {
      custom_attributes: customAttributes,
    });
  }

  destroyAvatar(contactId) {
    return axios.delete(`${this.url}/${contactId}/avatar`);
  }

  completeConversationPlan(contactId, conversationPlanId) {
    return axios.post(
      `${this.url}/${contactId}/conversation_plans/${conversationPlanId}/complete`
    );
  }

  exportContacts() {
    return axios.get(`${this.url}/export`);
  }
}

export default new ContactAPI();
