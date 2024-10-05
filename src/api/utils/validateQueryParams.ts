import joi from "joi";

const allowedCurrencyCodes = ["USD", "usd", "EUR", "eur", "GBP", "gbp", "ILS", "ils"];

export const querySchema = joi.object({
  baseAmount: joi.number().integer().required(),
  baseCurrency: joi
    .string()
    .valid(...allowedCurrencyCodes)
    .required(),
  quoteCurrency: joi
    .string()
    .valid(...allowedCurrencyCodes)
    .required(),
});
