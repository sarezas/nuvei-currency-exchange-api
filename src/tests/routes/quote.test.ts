import request, { Response } from "supertest";
import app from "../../api/app";

describe("GET /quote", () => {
  const queryParams = "?baseCurrency=USD&baseAmount=100&quoteCurrency=USD";
  const url = `/quote/${queryParams}`;

  it("should return 1:1 exchange rate and amount when USD is both base and quote currency", async () => {
    const res: Response = await request(app).get(url);
    const expectedResponseBody = { exchangeRate: 1, quoteAmount: 100 };

    expect(res.statusCode).toBe(200);
    expect(res.body).toStrictEqual(expectedResponseBody);
  });

  it("should return 'invalid request' response when 'baseCurrency' parameter is missing", async () => {
    const queryParams = "?baseAmount=100&quoteCurrency=USD";
    const url = `/quote/${queryParams}`;
    const res: Response = await request(app).get(url);
    const expectedResponseBody = JSON.stringify({ message: 'Invalid request. "baseCurrency" is required' });

    expect(res.statusCode).toBe(400);
    expect(res.badRequest).toBe(true);
    expect(res.text).toBe(expectedResponseBody);
  });

  it("should return 'invalid request' response when 'quoteCurrency' parameter is of incorrect type (integer instead of string)", async () => {
    const queryParams = "?baseCurrency=USD&baseAmount=100&quoteCurrency=123";
    const url = `/quote/${queryParams}`;
    const res: Response = await request(app).get(url);
    const expectedResponseBody = JSON.stringify({
      message: 'Invalid request. "quoteCurrency" must be one of [USD, EUR, GBP, ILS]',
    });

    expect(res.statusCode).toBe(400);
    expect(res.badRequest).toBe(true);
    expect(res.text).toBe(expectedResponseBody);
  });
});
