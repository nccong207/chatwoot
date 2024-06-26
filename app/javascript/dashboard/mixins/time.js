import {
  format,
  isSameDay,
  isSameYear,
  fromUnixTime,
  formatDistanceToNow,
} from 'date-fns';

export default {
  methods: {
    messageStamp(time, dateFormat = 'HH:mm') {
      const unixTime = fromUnixTime(time);
      return format(unixTime, dateFormat);
    },
    messageTimestamp(time, dateFormat = 'dd/MM/yyyy') {
      const messageTime = fromUnixTime(time);
      const now = new Date();
      const messageDate = format(messageTime, dateFormat);
      if (!isSameYear(messageTime, now)) {
        return format(messageTime, 'dd/MM/yyyy, HH:mm');
      }
      if (isSameDay(messageTime, now)) {
        return format(messageTime, 'HH:mm');
      }
      return messageDate;
    },
    dynamicTime(time) {
      const unixTime = fromUnixTime(time);
      const timeAgo = formatDistanceToNow(unixTime, { addSuffix: true });
      return this.localizeTimeAgo(timeAgo);
    },
    dynamicTimeFromString(time) {
      const unixTime = new Date(time);
      const timeAgo = formatDistanceToNow(unixTime, { addSuffix: true });
      return this.localizeTimeAgo(timeAgo);
    },
    dateFormat(time, dateFormat = 'dd/MM/yyyy') {
      const unixTime = fromUnixTime(time);
      return format(unixTime, dateFormat);
    },
    shortTimestamp(time, withAgo = false) {
      // This function takes a time string and converts it to a short time string
      // with the following format: 1m, 1h, 1d, 1mo, 1y
      // The function also takes an optional boolean parameter withAgo
      // which will add the word "ago" to the end of the time string
      const suffix = withAgo ? ' ago' : '';
      const timeMappings = {
        'less than a minute ago': 'now',
        'a minute ago': `1m${suffix}`,
        'an hour ago': `1h${suffix}`,
        'a day ago': `1d${suffix}`,
        'a month ago': `1mo${suffix}`,
        'a year ago': `1y${suffix}`,
      };
      // Check if the time string is one of the specific cases
      if (timeMappings[time]) {
        return timeMappings[time];
      }
      const convertToShortTime = time
        .replace(/about|over|almost|/g, '')
        .replace(' minute ago', `m${suffix}`)
        .replace(' minutes ago', `m${suffix}`)
        .replace(' hour ago', `h${suffix}`)
        .replace(' hours ago', `h${suffix}`)
        .replace(' day ago', `d${suffix}`)
        .replace(' days ago', `d${suffix}`)
        .replace(' month ago', `mo${suffix}`)
        .replace(' months ago', `mo${suffix}`)
        .replace(' year ago', `y${suffix}`)
        .replace(' years ago', `y${suffix}`);
      return convertToShortTime;
    },
    localizeTimeAgo(time) {
      const newTime = time
        .replace(/about|over|almost|/g, '')
        .replace(
          'less than a',
          this.$t('CHAT_LIST.CHAT_TIME_STAMP.TIME_LABEL.LESS_THAN_A')
        )
        .replace(
          'minute ago',
          this.$t('CHAT_LIST.CHAT_TIME_STAMP.TIME_LABEL.MINUTE_AGO')
        )
        .replace(
          'minutes ago',
          this.$t('CHAT_LIST.CHAT_TIME_STAMP.TIME_LABEL.MINUTES_AGO')
        )
        .replace(
          'hour ago',
          this.$t('CHAT_LIST.CHAT_TIME_STAMP.TIME_LABEL.HOUR_AGO')
        )
        .replace(
          'hours ago',
          this.$t('CHAT_LIST.CHAT_TIME_STAMP.TIME_LABEL.HOURS_AGO')
        )
        .replace(
          'day ago',
          this.$t('CHAT_LIST.CHAT_TIME_STAMP.TIME_LABEL.DAY_AGO')
        )
        .replace(
          'days ago',
          this.$t('CHAT_LIST.CHAT_TIME_STAMP.TIME_LABEL.DAYS_AGO')
        )
        .replace(
          'month ago',
          this.$t('CHAT_LIST.CHAT_TIME_STAMP.TIME_LABEL.MONTH_AGO')
        )
        .replace(
          'months ago',
          this.$t('CHAT_LIST.CHAT_TIME_STAMP.TIME_LABEL.MONTHS_AGO')
        )
        .replace(
          'year ago',
          this.$t('CHAT_LIST.CHAT_TIME_STAMP.TIME_LABEL.YEAR_AGO')
        )
        .replace(
          'years ago',
          this.$t('CHAT_LIST.CHAT_TIME_STAMP.TIME_LABEL.YEARS_AGO')
        );
      return newTime;
    },
  },
};
