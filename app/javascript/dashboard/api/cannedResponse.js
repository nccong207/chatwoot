/* global axios */

import ApiClient from './ApiClient';

export const buildCannedCreatePayload = ({
  content,
  shortCode,
  attachments,
}) => {
  let payload;
  if (attachments && attachments.length !== 0) {
    payload = new FormData();
    payload.append('content', content);
    payload.append('short_code', shortCode);

    attachments.forEach(file => {
      payload.append('attachments[]', file);
    });
  } else {
    payload = {
      content: content,
      shortCode: shortCode,
    };
  }
  return payload;
};

class CannedResponse extends ApiClient {
  constructor() {
    super('canned_responses', { accountScoped: true });
  }

  get({ searchKey }) {
    const url = searchKey ? `${this.url}?search=${searchKey}` : this.url;
    return axios.get(url);
  }

  create({ content, shortCode, attachments }) {
    return axios({
      method: 'post',
      url: this.url,
      data: buildCannedCreatePayload({
        content,
        shortCode,
        attachments,
      }),
    });
  }
}

export default new CannedResponse();
