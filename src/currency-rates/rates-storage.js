// Code below in just a mock implementation (there is memory leak inside)
// For production code some kind database has to be used
// (any SQL database, table with indexes for fast search of queried rate)

export class RatesStorage {
  static instance;
  static getInstance() {
    if (!this.instance) {
      this.instance = new this();
    }
    return this.instance;
  }
  storage = [];

  async storeRates(rates) {
    this.storage.push(...rates);
    this.storage.sort((a, b) => b.timestamp - a.timestamp);
  }

  async getRate({ target, original = 'USD', timestamp }) {
    if(!timestamp) {
      return this.storage.find(s => s.original === original && s.target === target);
    } else {
      return this.storage.find(s => s.original === original && s.target === target && s.timestamp <=timestamp );
    }
  };
}