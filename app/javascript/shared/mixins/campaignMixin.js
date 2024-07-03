import { CAMPAIGN_TYPES } from '../constants/campaign';

export default {
  computed: {
    campaignType() {
      const campaignTypeMap = {
        ongoing_campaigns: CAMPAIGN_TYPES.ONGOING,
        one_off: CAMPAIGN_TYPES.ONE_OFF,
        flexible: CAMPAIGN_TYPES.FLEXIBLE,
      };
      return campaignTypeMap[this.$route.name];
    },
    isFlexibleType() {
      return this.campaignType === CAMPAIGN_TYPES.FLEXIBLE;
    },
    isOngoingType() {
      return this.campaignType === CAMPAIGN_TYPES.ONGOING;
    },
    isOneOffType() {
      return this.campaignType === CAMPAIGN_TYPES.ONE_OFF;
    },
    contactDateAttributes() {
      const attributes = this.contactFilterItems
        .filter(item => item.inputType === 'date')
        .map(item => ({
          key: item.attributeKey,
          name: this.$t(`CONTACTS_FILTER.ATTRIBUTES.${item.attributeI18nKey}`),
          type: 'attribute',
        }));

      const allCustomAttributes =
        this.$store.getters['attributes/getAttributesByModel'](
          'contact_attribute'
        );
      const customAttributes = allCustomAttributes
        .filter(attr => attr.attribute_display_type === 'date')
        .map(attr => ({
          key: attr.attribute_key,
          name: attr.attribute_display_name,
          type: 'custom_attribute',
        }));

      return [...attributes, ...customAttributes];
    },
    audienceList() {
      const customViews =
        this.$store.getters['customViews/getCustomViewsByFilterType'](
          'contact'
        );
      const newCustomViews = customViews.map(item => ({
        id: item.id,
        title: item.name,
        type: 'custom_filter',
      }));

      const labels = this.$store.getters['labels/getLabels'];
      const newLabels = labels.map(item => ({
        id: item.id,
        title: `${this.$t('LABEL_MGMT.HEADER')}: ${item.description}`,
        type: 'label',
      }));

      return [...newCustomViews, ...newLabels];
    },
  },
};
