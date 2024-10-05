import { Application } from "express";

declare interface ApiResponse {
  exchangeRate: number;
  quoteAmount: number;
}

declare type BaseCurrencyRates = Record<string, number>;
declare type ApiRouteHandler = Application<Record<string, any>> & {};
