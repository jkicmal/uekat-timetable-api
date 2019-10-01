import express from "express";
import CalendarService from "./services/CalendarService";
import DaysController from "./controllers/DaysController";

const calendarService = new CalendarService();
const daysController = new DaysController(calendarService);

const app = express();

app.get("/api/v1/days", async (req, res) => {
  console.log("Fetching days...");
  const days = await daysController.getDays();
  res.status(200).json({ data: days });
});

app.get("/api/v1/calendar", (req, res) => {
  console.log("Fetching calendar...");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Listning on port... ${PORT}`);
});
