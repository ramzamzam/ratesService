import express from 'express';
import http from 'http';
import { config } from './config.js';

import { RatesConsumer } from './currency-rates/rates-consumer.js'
import { handlers } from "./handlers.js";


const app = express();

// routes would better be moved into separate Router instance
// also we should probably add some ip-based rate limiting so
// clients won't be able to abuse our API
// also some kind of user input validation could be implemented
app.get('/rates/:target', handlers.getRateHandler);

RatesConsumer.run().catch(console.error)

http.createServer(app).listen(config.PORT, (err) => {
  if(err) {
    console.error(err);
    return process.exit(1);
  }

  console.log(`Listening on ${config.PORT}`);
});



