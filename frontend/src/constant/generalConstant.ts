const loginExpireTime = {
  FIVE_YEAR: 5 * 365 * 24 * 60 * 60 * 1000,
  THREE_YEAR: 3 * 365 * 24 * 60 * 60 * 1000,
  YEAR: 365 * 24 * 60 * 60 * 1000,
  MONTH: 30 * 24 * 60 * 60 * 1000,
  DAY: 24 * 60 * 60 * 1000,
  HOUR: 1 * 60 * 60 * 1000,
  MINUTE: 1 * 60 * 1000,
  SECOND: 1 * 1000,
};

export const { SECOND, MINUTE, HOUR, DAY, MONTH, YEAR } = loginExpireTime;