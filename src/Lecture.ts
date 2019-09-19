import { getMomentDateTime } from "./dateUtils";

export default class Lecture {
  startTime: Date;
  endTime: Date;
  location: string;
  title: string;
  teacher: string;
  codes: string;
  attending: boolean;

  constructor(startTime, endTime, description, location) {
    this.startTime = getMomentDateTime(startTime);
    this.endTime = getMomentDateTime(endTime);
    this.location = location;

    const [title, teacher, codes, attending] = this.parseDescription(
      description
    );
    this.title = title;
    this.teacher = teacher;
    this.codes = codes;
    this.attending = attending;
  }

  /**
   * Description can be splitted with double spaces "  "
   * [
   *    * We can split this with -
   *   'Podstawy ekonomii - wykład z zaliczeniem'
   *   'prof. UE dr hab. Ewa Zeman-Miszewska',
   *    * Here we have to check if this string contains 'gc02' otherwise lecture should be ommited
   *   'I_K-ce_17_z_SI_gc02_PGiAM\\, I_K-ce_17_z_SI_gc03_PGiAM\\, I_K-ce_17_z_SI_gc01_BDiHD\\, I_K-ce_17_z_SI_gc04_PGiAM'
   * ]
   */

  // returns [title, teacher, codes, attending]
  parseDescription(description) {
    const descriptionSplitted = description.split("  ");

    // 3 means valid format
    if (descriptionSplitted.length === 3) {
      const attending = descriptionSplitted[2].includes("02");
      return [...descriptionSplitted, attending];
    }

    // 2 means english lessons
    if (descriptionSplitted.length === 2) {
      return ["Język obcy", "None", descriptionSplitted[1], false];
    }

    return [null, null, null, false];
  }
}
