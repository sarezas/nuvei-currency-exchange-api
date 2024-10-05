import express, { type Express } from "express";
import quoteRouter from "./routers/quoteRouter";

const app: Express = express();

app.use(express.json());
app.get("/quote", quoteRouter);

export default app;
