import express, { Router } from "express";

import { BaseCurrencyRates } from "../../types/types";
import { LRUCache } from "../cache/lruCache";
import { getQuoteCurrencyRateAndAmount } from "../controllers/getQuoteCurrencyRateAndAmount";
import { tryCatchRouteWrapper } from "../routeWrapper/routeWrapper";

const quoteRouter: Router = express.Router();
const cache = new LRUCache<string, BaseCurrencyRates>(4);

quoteRouter.get("/quote", tryCatchRouteWrapper(getQuoteCurrencyRateAndAmount, cache));

export default quoteRouter;
