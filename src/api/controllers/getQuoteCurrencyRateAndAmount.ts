import { NextFunction, Request, Response } from "express";

import { ApiResponse, CurrencyRates } from "../../types/types";
import { LRUCache } from "../cache/lruCache";

import { getBaseCurrencyRates } from "../exchangeRate/getBaseCurrencyRates";
import { querySchema } from "../utils/validateQueryParams";

export const getQuoteCurrencyRateAndAmount = async (
  req: Request,
  res: Response,
  next: NextFunction,
  cache: LRUCache<string, CurrencyRates>
): Promise<void> => {
  const {
    error,
    value: { baseAmount, baseCurrency, quoteCurrency },
  } = querySchema.validate(req.query);

  if (error) {
    res.status(400).send({ message: `Invalid request. ${error.message}` });
    return next();
  } else {
    const rates: CurrencyRates = await getBaseCurrencyRates(baseCurrency, cache);
    const result: ApiResponse = {
      exchangeRate: rates[quoteCurrency],
      quoteAmount: Math.round(baseAmount * rates[quoteCurrency]),
    };

    res.status(200).send(result);
    next();
  }
};
