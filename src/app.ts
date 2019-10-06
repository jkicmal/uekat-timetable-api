import express from "express";
import CalendarRepository from "./repositories/CalendarRepository";
import DaysController from "./controllers/DaysController";

const calendarRepository = new CalendarRepository();
const daysController = new DaysController(calendarRepository);

const app = express();

app.get("/api/v1/days", async (req, res) => {
  // console.log("Fetching days...");
  const days = await daysController.getDays();
  res.status(200).json({ data: days });
});

app.get("/api/v1/calendar", (req, res) => {
  // console.log("Fetching calendar...");
  res.status(200).json({ data: {} });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Listning on port... ${PORT}`);
});
