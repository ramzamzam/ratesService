import { RatesStorage }from './currency-rates/rates-storage.js'

export const handlers = {
  getRateHandler: async (req, res) => {
    try {
      const { target } = req.params;
      const { timestamp } = req.query;

      const ratesStorage = RatesStorage.getInstance();

      const rate = await ratesStorage.getRate({target, timestamp});
      if (rate) {
        res.json(rate);
      } else {
        res.status(404).end(`No data for ${target}` + (timestamp ? ` prior to and including ${new Date(+timestamp).toString()}`: ''))
      }
    } catch(err) {
      res.end(err.toString());
    }
  }
}