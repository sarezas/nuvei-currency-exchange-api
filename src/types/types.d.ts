declare interface ApiQueryParams {
  baseCurrency: string;
  quoteCurrency: string;
  baseAmount: number;
}

declare interface ApiResponse {
  exchangeRate: number;
  quoteAmount: number;
}
