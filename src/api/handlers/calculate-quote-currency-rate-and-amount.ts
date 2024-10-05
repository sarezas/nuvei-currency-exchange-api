import { NextFunction, Request, Response } from "express";

import { ApiResponse, BaseCurrencyRates } from "../../types/types";
import { LRUCache } from "../cache/lruCache";
import { getBaseCurrencyRates } from "../exchange-rate/get-base-currency-rates";
import { querySchema } from "../utils/validate-query-params";

export const getQuoteCurrencyRateAndAmount = async (
  req: Request,
  res: Response,
  next: NextFunction,
  cache: LRUCache<string, BaseCurrencyRates>
): Promise<void> => {
  const {
    error,
    value: { baseAmount, baseCurrency, quoteCurrency },
  } = querySchema.validate(req.query);

  if (error) {
    res.status(400).send(`<pre>Invalid request. ${error.message}</pre>`);
    return next();
  } else {
    const rates: BaseCurrencyRates = await getBaseCurrencyRates(baseCurrency, cache);
    const result: ApiResponse = {
      exchangeRate: rates[quoteCurrency],
      quoteAmount: Math.round(baseAmount * rates[quoteCurrency]),
    };

    res.status(200).send(result);
    next();
  }
};
