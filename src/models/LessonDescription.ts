import { stringContains, arrayLenghIsEqual, capitalizeFirstLetter } from "../utils/utils";

export default class LessonDescription {
  private static STRINGS = {
    SEMINAR: "Seminarium dyplomowe",
    PROMOTOR: "Tomasz Staś",
    LANGUAGES: "Język obcy",
    GROUP: "02",
    NO_TEACHER: "No teacher"
  };

  public static TYPES = {
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
      return this.handleSeminarLessonSummary(summary);
    else if (stringContains(summary, this.STRINGS.LANGUAGES))
      return this.handleLanguagesLessonSummary(summary);
    else return this.handleBasicLessonSummary(summary);
  }

  private static handleLanguagesLessonSummary(summary: string) {
    return new LessonDescription(
      this.STRINGS.LANGUAGES,
      this.STRINGS.NO_TEACHER,
      null,
      false,
      this.TYPES.LANGUAGES
    );
  }
  private static handleSeminarLessonSummary(summary: string) {
    const splittedSummary = summary.split("  ");
    if (arrayLenghIsEqual(splittedSummary, 3)) {
      const [titleRaw, teacher, codes] = splittedSummary;
      const attending = stringContains(summary, this.STRINGS.PROMOTOR);
      const { title, type } = this.getTitleAndTypeFromRawTitle(titleRaw);
      return new LessonDescription(title, teacher, codes, attending, type);
    } else {
      // THROW ERROR - UKNOWN SEMINAR SUMMARY FORMAT
      throw { message: "UKNOWN SEMINAR SUMMARY FORMAT" };
    }
  }
  private static handleBasicLessonSummary(summary: string) {
    const splittedSummary = summary.split("  ");
    if (arrayLenghIsEqual(splittedSummary, 3)) {
      const [titleRaw, teacher, codes] = splittedSummary;
      const attending = stringContains(codes, this.STRINGS.GROUP);
      const { title, type } = this.getTitleAndTypeFromRawTitle(titleRaw);
      return new LessonDescription(title, teacher, codes, attending, type);
    } else {
      // THROW ERROR - UKNOWN BASIC SUMMARY FORMAT
      throw { message: "UKNOWN BASIC SUMMARY FORMAT" };
    }
  }

  private static getTitleAndTypeFromRawTitle(rawTitle: string) {
    const splittedRawTitle = rawTitle.split("-");
    if (arrayLenghIsEqual(splittedRawTitle, 2)) {
      const title = splittedRawTitle[0].trim();
      const rawType = splittedRawTitle[1].trim();
      const type = this.getTypeFromRawType(rawType);
      return { title, type };
    } else {
      // THROW ERROR - UNKNOWN LESSON TITLE FORMAT
      throw { message: "UNKNOWN LESSON TITLE FORMAT" };
    }
  }

  private static getTypeFromRawType(rawType: string) {
    for (const type in this.TYPES) {
      if (stringContains(rawType, this.TYPES[type])) return this.TYPES[type];
    }
    // THROW ERROR - UNKNOWN LESSON TYPE FROMAT
    throw { message: "UNKNOWN LESSON TYPE FROMAT" };
  }
}
