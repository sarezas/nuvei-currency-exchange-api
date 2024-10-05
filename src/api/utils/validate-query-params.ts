import joi from "joi";

const allowedCurrencies = ["USD", "EUR", "GBP", "ILS"];

export const querySchema = joi.object({
  baseAmount: joi.number().integer().required(),
  baseCurrency: joi
    .string()
    .valid(...allowedCurrencies)
    .required(),
  quoteCurrency: joi
    .string()
    .valid(...allowedCurrencies)
    .required(),
});
