export default class HolidayPlanner{
    constructor(nationalHolidays, holidayPeriodStart, holidayPeriodEnd, maxHolidaySpan){
        this.nationalHolidays = nationalHolidays.map(day => day.getTime());
        this.holidayPeriodStart = holidayPeriodStart;
        this.holidayPeriodEnd = holidayPeriodEnd;
        this.maxHolidaySpan = maxHolidaySpan;
    }

    calculateUsedHolidays(timespan){
        const {startDate, endDate, error} = parseTimespanInputString(timespan);
        if(error) return error;
        if(!this.isDateInHolidayperiod(startDate) || !this.isDateInHolidayperiod(endDate)) return "Date span not in holiday period";
        const passedDays = getPassedDays(startDate, endDate);
        if(passedDays > this.maxHolidaySpan) return `Planned holiday ${passedDays}days exceeds the max holiday span ${this.maxHolidaySpan}days` ;
        const bonusHolidays = calculateBonusHolidaysAndSundays({startDate, endDate}, this.nationalHolidays); 
        const totalHolidayDaysNeeded = passedDays - bonusHolidays;
        return `Total holiday days needed is ${totalHolidayDaysNeeded}`;
    }

    isDateInHolidayperiod = (date) => {
        return (date >= this.holidayPeriodStart || date <= this.holidayPeriodEnd);
    }
}

const calculateBonusHolidaysAndSundays = ({startDate, endDate}, bonusDates) =>{
    let bonusHoliday = 0;
    //Loop trough datespan and check if the day is sunday (0)
    for (var i = startDate; i <= endDate; i.setDate(i.getDate()+1)){
        if (i.getDay() == 0 || bonusDates.includes(i.getTime())) bonusHoliday++;
    }
    return bonusHoliday;
}


const parseTimespanInputString = (timespanString) => {
    if(typeof timespanString !== "string") return null;
    //Split two dates from input string
    const dateeSpanStrings = timespanString.split("-");
    if(dateeSpanStrings.length !== 2) return {error: "date was not given in required format (1.1.2021)"};;
    let [startDateString, endDateString] = dateeSpanStrings;
    const startDate = getDateFromDateString(startDateString);
    const endDate = getDateFromDateString(endDateString);
    //Check if date object created succeesfully
    if(!isValidDate(startDate) || !isValidDate(endDate)){
        return {error: "date was not given in required format (1.1.2021)"};
    }
    return {startDate, endDate};
}

const getDateFromDateString = (dateString) => {
    //Remove empty spaces
    dateString = dateString.replace(/\s/g, '');
    //Get day, month, year from string
    const dateValues = dateString.split(".");
    // if there is multiple numbers
    if(dateValues.length !== 3) return;
    const [Day, Month, Year] = dateValues;
    const date = new Date(Year, Month, Day);
    //Check if date is changed after creating it, if days ggiven were more than there is in that current month
    if(date.getDate() != Day || (date.getMonth()) != Month)return;
    //Create and return date object, No need for checks cos Date creation never fails
    return date;
}

const isValidDate = (date) => {
    return date && date instanceof Date && !isNaN(date);
}

const getPassedDays = (startDate, endDate) => {
    //Calculate the difference in millisseconds and then divide the result by the ms of one day
    return Math.round((endDate-startDate)/(1000*60*60*24));
}