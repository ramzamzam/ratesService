import { MockCurrencyConverterAPIClient } from './mock-currencyconverter-rates-client.js'
import { FreeCurrencyConverterAPIClient } from './free-currencyrates-client.js';
import { config } from "../../config.js";

const clients = {};

export function getRatesClient() {
  if(!config.api[config.enabledApi]) throw new Error('Unknown API mode!');

  if(!clients[config.enabledApi]) {
    if (config.enabledApi === 'MOCK_CC') {
      clients[config.enabledApi] = new MockCurrencyConverterAPIClient({
        config: config.api.MOCK_CC,
        currencyList: config.currencyList,
      });
    } else if (config.enabledApi === 'FREE_CC') {
      clients[config.enabledApi] = new FreeCurrencyConverterAPIClient({
        config: config.api.FREE_CC,
        currencyList: config.currencyList,
      });
    }
  }

  return clients[config.enabledApi];
}