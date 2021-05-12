import HolidayPlanner from "./HolidayPlanner.js";

const nationalHolidays = [new Date(2020, 1, 1)];

const planner = new HolidayPlanner(nationalHolidays);

console.log(planner.calculateUsedHolidays("1.7.2020 - 11.7.2020"));