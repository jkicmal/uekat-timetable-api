import util from "util";
import fs from "fs";
import path from "path";
const readFile = util.promisify(fs.readFile);

const run = async () => {
  const calendar = await readFile(path.join(__dirname, "./calendar.ics"), "utf8");
  console.log(calendar);
};

run();
