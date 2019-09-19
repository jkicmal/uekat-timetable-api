import { stringContains, arrayLenghIsEqual, capitalizeFirstLetter } from "./utils";

export default class LectureDescription {
  private static STRINGS = {
    SEMINAR: "Seminarium dyplomowe",
    PROMOTOR: "Tomasz Staś",
    LANGUAGES: "Język obcy",
    GROUP: "02",
    NO_TEACHER: "No teacher"
  };

  private static TYPES = {
    SEMINAR: "seminarium",
    EXCERCISES: "ćwiczenia",
    LABORATIORIES: "lab",
    LECTURE_EXAM: "wykład z egzaminem",
    LECTURE_CREDIT: "wykład z zaliczeniem",
    LANGUAGES: "języki"
  };

  title: string | null;
  teacher: string | null;
  codes: string | null;
  attending: boolean;
  type: string | null;

  constructor(title, teacher, codes, attending, type) {
    this.title = title;
    this.teacher = teacher;
    this.codes = codes;
    this.attending = attending;
    this.type = type;
  }

  public static fromCalendarSummary(summary: string) {
    if (stringContains(summary, this.STRINGS.SEMINAR))
      return this.handleSeminarLectureSummary(summary);
    else if (stringContains(summary, this.STRINGS.LANGUAGES))
      return this.handleLanguagesLectureSummary(summary);
    else return this.handleBasicLectureSummary(summary);
  }

  private static handleLanguagesLectureSummary(summary: string) {
    return new LectureDescription(
      this.STRINGS.LANGUAGES,
      this.STRINGS.NO_TEACHER,
      null,
      false,
      this.TYPES.LANGUAGES
    );
  }
  private static handleSeminarLectureSummary(summary: string) {
    const splittedSummary = summary.split("  ");
    if (arrayLenghIsEqual(splittedSummary, 3)) {
      const [titleRaw, teacher, codes] = splittedSummary;
      const attending = stringContains(summary, this.STRINGS.PROMOTOR);
      const { title, type } = this.getTitleAndTypeFromRawTitle(titleRaw);
      return new LectureDescription(title, teacher, codes, attending, type);
    } else {
      // THROW ERROR - UNHADLED CASE
    }
  }
  private static handleBasicLectureSummary(summary: string) {
    const splittedSummary = summary.split("  ");
    if (arrayLenghIsEqual(splittedSummary, 3)) {
      const [titleRaw, teacher, codes] = splittedSummary;
      const attending = stringContains(codes, this.STRINGS.GROUP);
      const { title, type } = this.getTitleAndTypeFromRawTitle(titleRaw);
      return new LectureDescription(title, teacher, codes, attending, type);
    } else {
      // THROW ERROR - UNHADLED CASE
    }
  }

  private static getTitleAndTypeFromRawTitle(rawTitle: string) {
    const splittedRawTitle = rawTitle.split("-");
    if (arrayLenghIsEqual(splittedRawTitle, 2)) {
      return {
        title: splittedRawTitle[0].trim(),
        type: capitalizeFirstLetter(splittedRawTitle[1].trim())
      };
    } else {
      // THROW ERROR - UNHADLED CASE
    }
  }
}
