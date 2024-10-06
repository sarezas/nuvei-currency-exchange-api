import { CurrencyRates } from "../../types/types";
import { LRUCache } from "../cache/lruCache";

export const getBaseCurrencyRates = async (
  baseCurrency: string,
  cache: LRUCache<string, CurrencyRates>
): Promise<CurrencyRates> => {
  const cachedRates: CurrencyRates | undefined = cache.get(baseCurrency);

  if (!!cachedRates) {
    return cachedRates;
  } else {
    const rates: CurrencyRates = await fetchBaseCurrencyRates(baseCurrency);
    cache.set(baseCurrency, rates);
    return rates;
  }
};

const fetchBaseCurrencyRates = async (baseCurrency: string): Promise<CurrencyRates> => {
  const url = `https://api.exchangerate-api.com/v4/latest/${baseCurrency}`;
  const res = await fetch(url);
  const data = await res.json();

  if (!data?.rates) {
    throw new Error("No rates found");
  }

  const targetRates: CurrencyRates = getTargetRates(data.rates);

  return targetRates;
};

const getTargetRates = (rawRates: CurrencyRates): CurrencyRates => {
  return {
    USD: rawRates.USD,
    EUR: rawRates.EUR,
    GBP: rawRates.GBP,
    ILS: rawRates.ILS,
  };
};
