import { BaseCurrencyRates } from "../../types/types";
import { LRUCache } from "../cache/lruCache";

export const getBaseCurrencyRates = async (
  baseCurrency: string,
  cache: LRUCache<string, BaseCurrencyRates>
): Promise<BaseCurrencyRates> => {
  const cachedRates = cache.get(baseCurrency);

  if (!!cachedRates) {
    cache.put(baseCurrency, cachedRates);
    return cachedRates;
  } else {
    const rates = await fetchBaseCurrencyRates(baseCurrency);
    cache.put(baseCurrency, rates);
    return rates;
  }
};

const fetchBaseCurrencyRates = async (baseCurrency: string): Promise<BaseCurrencyRates> => {
  const url = `https://api.exchangerate-api.com/v4/latest/${baseCurrency}`;
  const res = await fetch(url);
  const data = await res.json();

  if (!data?.rates) {
    throw new Error("No rates found");
  }

  const targetRates = getTargetRates(data.rates);

  return targetRates;
};

const getTargetRates = (rawRates: BaseCurrencyRates): BaseCurrencyRates => {
  return {
    USD: rawRates.USD,
    EUR: rawRates.EUR,
    GBP: rawRates.GBP,
    ILS: rawRates.ILS,
  };
};
