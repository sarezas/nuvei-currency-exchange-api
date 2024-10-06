import { Application } from "express";

declare interface ApiResponse {
  exchangeRate: number;
  quoteAmount: number;
}

declare type CurrencyRates = Record<string, number>;
declare type ApiRouteHandler = Application<Record<string, any>> & {};
