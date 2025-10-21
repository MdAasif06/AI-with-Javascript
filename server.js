import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { generate } from "./chatBot.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("this is working");
});

app.post("/chat", async (req, res) => {
  const { message } = req.body;
  console.log("message : ", message);

  const result = await generate(message);
  res.json({ message: result });
});

const port = process.env.PORT;

app.listen(port || 8000, () => {
  console.log(`server is running port at ${port}`);
});
