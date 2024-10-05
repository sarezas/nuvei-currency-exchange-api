import express from "express";

import { BaseCurrencyRates } from "../types/types";
import { LRUCache } from "./cache/lruCache";
import { getQuoteCurrencyRateAndAmount } from "./handlers";
import { tryCatchRouteWrapper } from "./utils/route-wrapper";

const app = express();
const PORT = 5001;
const cache = new LRUCache<string, BaseCurrencyRates>(5);

app.use(express.json());
app.get("/quote", tryCatchRouteWrapper(getQuoteCurrencyRateAndAmount, cache));
app.listen(PORT, () => {
  console.log(`Listening: http://localhost:${PORT}`);
});
