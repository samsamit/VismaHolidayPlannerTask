export default class HolidayPlanner{
    constructor(nationalHolidays){
        this.nationalHolidays = nationalHolidays;
    }

    calculateUsedHolidays(timespan){
        const {startDate, endDate, error} = parseTimespanInputString(timespan);
        if(error) return error;
        const passedDays = getPassedDays(startDate, endDate);

        console.log(passedDays);
    }
}

const parseTimespanInputString = (timespanString) => {
    if(typeof timespanString !== "string") return null;
    //Split two dates from input string
    let [startDateString, endDateString] = timespanString.split("-");
    //Remove empty spaces
    startDateString = startDateString.replace(/\s/g, '');
    endDateString = endDateString.replace(/\s/g, '');
    //Get day, month, year from string
    const [startDay, startMonth, startYear] = startDateString.split(".");
    const [endDay, endMonth, endYear] = endDateString.split(".");
    //Create date object
    const startDate = new Date(startYear, startMonth, startDay);
    const endDate = new Date(endYear, endMonth, endDay);
    //Check if date object created succeesfully
    if(!isValidDate(startDate) || !isValidDate(endDate)){
        return {error: "date was not consistent of numbers"};;
    }
    //Check if date is changed after creating it, if days ggiven were more than there is in that current month
    if(startDate.getDate() != startDay || (startDate.getMonth()) != startMonth
    || endDate.getDate() != endDay || (endDate.getMonth()) != endMonth
    ) return {error: "days or months were too big"};
    return {startDate, endDate};
}

const isValidDate = (date) => {
    return date instanceof Date && !isNaN(date);
}

const getPassedDays = (startDate, endDate) => {
    //Calculate the difference in millisseconds and then divide the result by the ms of one day
    return Math.round((endDate-startDate)/(1000*60*60*24));
}