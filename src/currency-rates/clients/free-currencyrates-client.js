import { CurrencyRatesClient } from './currency-rates-client.js'
import axios from "axios";

export class FreeCurrencyConverterAPIClient extends CurrencyRatesClient {
  #rawRateRegex = /(\w+)_(\w+)/

  constructor(params) {
    super(params);
    this.apiKey = params.config.API_KEY;
    this.apiHost = params.config.API_HOST;
    this.updateFrequency = params.config.UPDATE_FREQ;

    // we get max 2 currency pairs per request so we'll make request for each 2 currencies
    this.currencyPairQueryStrings = this.currencyList.reduce((acc, currency, index) => {
      acc.prev.push(`${this.originalCurrency}_${currency}`);
      if (index % 2 === 0) {
        acc.pairs.push(acc.prev.join(','));
        acc.prev = [];
      }
      return acc;
    }, { prev: [], pairs: [] }).pairs;
  }

  async fetchRates() {
    try {
      const pairResults = await Promise.all(
        this.currencyPairQueryStrings.map((ratesUpdateQueryString) => {
          return axios.get(`${this.apiHost}/api/v7/convert`, {
            params: {
              q: ratesUpdateQueryString,
              compact: 'ultra',
              apiKey: this.apiKey,
            },
          }).then(res => {
            return res.data;
          });
        })
      );
      return pairResults.reduce((acc, pairResults) => Object.assign(acc, pairResults), {});
    } catch (e) {
      // Would be good to handle errors here, for example add incremental delay retries for 429
      throw e;
    }
  }

  serialize(rawRates, timestamp) {
    return Object.entries(rawRates).map(([codes, value]) => {
      const [, original, target] = codes.toUpperCase().match(this.#rawRateRegex);
      return { original, target, value, timestamp };
    });
  }
}
