import { NextFunction, Request, Response } from "express";

import { ApiRouteHandler, BaseCurrencyRates } from "../../types/types";
import { LRUCache } from "../cache/lruCache";

export const tryCatchRouteWrapper =
  (routeHandler: ApiRouteHandler, cache: LRUCache<string, BaseCurrencyRates>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await routeHandler(req, res, next, cache);
    } catch (err: any) {
      console.error(err);
      return res.status(err.status).json(err);
    }
  };
