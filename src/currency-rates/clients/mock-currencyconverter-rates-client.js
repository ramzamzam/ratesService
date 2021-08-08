import { CurrencyRatesClient } from './currency-rates-client.js'

export class MockCurrencyConverterAPIClient extends CurrencyRatesClient {
  #rawRateRegex = /(\w+)_(\w+)/

  constructor(params) {
    super(params);
  }

  async fetchRates() {
    return this.currencyList.reduce((acc, currency) => {
      acc[`${this.originalCurrency}_${currency}`] = Math.random() * 100;
      return acc;
    }, {});
  }

  serialize(rawRates, timestamp) {
    return Object.entries(rawRates).map(([codes, value]) => {
      const [, original, target] = codes.toUpperCase().match(this.#rawRateRegex);
      return { original, target, value, timestamp };
    });
  }
}
