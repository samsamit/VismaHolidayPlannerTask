import HolidayPlanner from "./HolidayPlanner.js";

const nationalHolidays = [
    new Date(2020, 1, 1),
    new Date(2020, 1, 6),
    new Date(2020, 4, 10),
    new Date(2020, 4, 13),
    new Date(2020, 5, 1),
    new Date(2020, 5, 21),
    new Date(2020, 6, 19),
    new Date(2020, 12, 24),
    new Date(2020, 12, 25),
    new Date(2021, 1, 1),
    new Date(2021, 1, 6),
    new Date(2021, 4, 2),
    new Date(2020, 4, 5),
    new Date(2020, 20, 6),
    new Date(2020, 12, 6),
    new Date(2020, 12, 24),
];
const periodStart = new Date(2020, 4, 1);
const periodEnd = new Date(2021, 3, 1);
const maxHolidaySpan = 50;

const planner = new HolidayPlanner(nationalHolidays, periodStart, periodEnd, maxHolidaySpan);

console.log(planner.calculateUsedHolidays("1.7.2020 - 11.7.2020"));