export const config = {
  PORT: process.env.PORT || 3000,
  enabledApi: process.env.ENABLED_API || 'MOCK_CC',
  // Most of rates providers allow to fetch list of supported currencies but for sake of simplicity in this test task
  // I've hardcoded the list. In real-world application we would want all available currencies so we'd fetch a list
  // of those prior to retrieving values
  currencyList: ['UAH', 'GBP', 'EUR'],
  api: {
    FREE_CC: {
      // it is unsafe to store api keys in plain text
      // those should be injected via env variables.
      API_KEY: 'a4d30fa36d155ac11a25',
      API_HOST: 'https://free.currconv.com',
      UPDATE_FREQ: 1000 * 60 * 30, // 30 min
    },
    MOCK_CC: {
      UPDATE_FREQ: 1000 * 10, // 10 sec
    }
  },
};


