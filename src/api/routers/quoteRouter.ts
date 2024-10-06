import express, { Router } from "express";

import { CurrencyRates } from "../../types/types";
import { LRUCache } from "../cache/lruCache";
import { getQuoteCurrencyRateAndAmount } from "../controllers/getQuoteCurrencyRateAndAmount";
import { tryCatchRouteWrapper } from "../routeWrapper/routeWrapper";

const quoteRouter: Router = express.Router();
const cache = new LRUCache<string, CurrencyRates>(4, 3600000);

quoteRouter.get("/quote", tryCatchRouteWrapper(getQuoteCurrencyRateAndAmount, cache));

export default quoteRouter;
