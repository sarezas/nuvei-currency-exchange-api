# Nuvei Currency exchange API

### API request interface

  - GET /quote
  - Query parameter description:
    - baseCurrency - string, 3 letters ISO currency code. Currency to convert from.
    - quoteCurrency - string, 3 letters ISO currency code. Currency to convert to.
    - baseAmount - integer, amount to convert in cents. Example: 100 (1 USD).

### API response interface

  - JSON
  - Properties:
    - exchangeRate - decimal, the offered exchange rate. Up to 3 decimal digits
    - quoteAmount - integer, the expected amount in cents. Free-choice rounding policy.


### Supported currencies

  - USD
  - EUR 
  - GBP
  - ILS

### Third party exchange rate provider

  - GET https://api.exchangerate-api.com/v4/latest/${baseCurrencyIsoString}

### Caching

  - In-memory LRU cache

### Starting the server locally

  - npm install
  - npm run build
  - npm run dev

### Testing

  - npm run test

### Containerization

  - build Docker image:
    - docker build -t currency-exchange-api .
  
  - run the container
    - docker run -d -p 5001:5001 currency-exchange-api

### Github repo

  - https://github.com/sarezas/nuvei-currency-exchange-api.git

### Public endpoint

  - GET https://www.prisnu.se/quote
      - query params:
        - baseCurrency=USD | EUR | GBP | ILS 
        - baseAmount=any natural number
        - quoteCurrency=USD | EUR | GBP | ILS 

  - e.g. https://www.prisnu.se/quote?baseCurrency=EUR&baseAmount=100&quoteCurrency=GBP
    - reponse body: {"exchangeRate": 1.1,"quoteAmount": 110}

