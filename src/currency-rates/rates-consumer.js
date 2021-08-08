import { getRatesClient } from "./clients/rates-client-provider.js";
import { RatesStorage } from "./rates-storage.js";

export class RatesConsumer {
  static async run() {
    if (this.instance) return;
    this.instance = new this();
    return this.instance.refresh();
  }

  constructor() {
    this.client = getRatesClient();
    this.storage = RatesStorage.getInstance();
    this.client.on('stale', () => {
      this.refresh().catch(err => console.error(err));
    });
  }

  async refresh() {
    const rates = await this.client.getRates();
    await this.storage.storeRates(rates);
  }
}

