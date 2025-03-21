import express from "express";
import CalendarRepository from "./repositories/CalendarRepository";
import DaysController from "./controllers/DaysController";
import cors from "cors";
import dotenv from "dotenv";
import { RSA_NO_PADDING } from "constants";

dotenv.config();

const calendarRepository = new CalendarRepository();
const daysController = new DaysController(calendarRepository);

const app = express();
app.use(cors());

app.get("/api/v1/days", async (req, res) => {
  const headerApiKey = req.headers.api_key;
  const envApiKey = process.env.API_KEY;

  if (headerApiKey != envApiKey) {
    res.status(504).json({ message: "ERROR: Invalid api key" });
  }

  const days = await daysController.getDays();
  res.status(200).json({ data: days });
});

app.get("/api/v1/calendar", (req, res) => {
  // console.log("Fetching calendar...");
  res.status(200).json({ data: {} });
});

app.get("/", (req, res) => {
  res.status(200).json({ data: { message: "You shouldn't be here ;)" } });
});

app.all("*", (req, res) => {
  res.status(404).json({ data: { message: "ERROR: Not found" } });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Listning on port... ${PORT}`);
});
