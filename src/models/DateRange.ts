import moment from "moment-timezone";
import { StartOf } from "moment-timezone";
import { getMomentDurationInDays } from "../utils/utils";

export default class DateRange {
  start: Date;
  end: Date;

  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  public getRangeArray() {
    const totalDays = getMomentDurationInDays(this.start, this.end);
    const dates = [];
    let daysToAdd = 0;
    while (daysToAdd <= totalDays) {
      const tempDate = moment(this.start)
        .add(daysToAdd, "days")
        .format("YYYY-MM-DD");
      dates.push(tempDate);
      daysToAdd += 1;
    }
    return dates;
  }

  public static fromCurrentYear() {
    return this.fromCurrent("year");
  }

  public static fromCurrentMonth() {
    return this.fromCurrent("month");
  }

  public static fromCurrentWeek() {
    return this.fromCurrent("week");
  }

  public static fromRemainingYear() {
    return new DateRange(moment(), moment().endOf("year"));
  }

  private static fromCurrent(startAndEndOf: StartOf) {
    return new DateRange(moment().startOf(startAndEndOf), moment().endOf(startAndEndOf));
  }
}
