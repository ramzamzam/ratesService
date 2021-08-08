## Simple Currency USD rate service

Supported currencies: 
`['UAH', 'GBP', 'EUR']`

To run in mock mode(rates refreshed every 10 secs): 

`npm run start`

To run in real rates mode(rates refresh every 30 minutes):

`ENABLED_API=FREE_CC npm start`

Example request:
```
curl -X GET \
    'http://localhost:3000/rates/UAH?timestamp=1628437501351'

```

`timestamp` is optional