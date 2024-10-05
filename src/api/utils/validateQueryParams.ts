import joi from "joi";

const allowedCurrencyCodes = ["USD", "EUR", "GBP", "ILS"];

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
