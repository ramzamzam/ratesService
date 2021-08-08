import EventEmitter from 'events';

export class CurrencyRatesClient extends EventEmitter {
  #cache = null;
  cacheTimer = null;

  constructor({ currencyList, originalCurrency = 'USD', config }) {
    super();
    this.updateFrequency = config.UPDATE_FREQ;
    this.currencyList = currencyList;
    this.originalCurrency = originalCurrency;
  }

  async getRates() {
    if (this.#cache) return this.#cache;
    const timestamp = Date.now();
    const rawRates = await this.fetchRates()
    this.updateCache(this.serialize(rawRates, timestamp));
    return this.#cache;
  }

  updateCache(serializedRates) {
    this.#cache = serializedRates;
    if (this.cacheTimer) { clearTimeout(this.cacheTimer); }
    this.cacheTimer = setTimeout(() => {
      this.#cache = null;
      this.emit('stale')
    }, this.updateFrequency);
  }

  async fetchRates() { throw new Error('"fetchRates" must be overriden!'); }

  serialize() { throw new Error('"serialize" must be overriden!'); }
}