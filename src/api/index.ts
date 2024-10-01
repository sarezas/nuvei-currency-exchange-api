import express, { Request, Response } from "express";
import { STATUS_CODES } from "http";

/**
 * TODO:
 *  import cache in calculation service
 *  import calculation service
 */

const app = express();
const PORT = 5001;

app.use(express.json());

app.get("/quote", async (req: Request, res: Response) => {
  console.log({ req });
});

app.listen(PORT, () => {
  console.log(`Listening: http://localhost:${PORT}`);
});
