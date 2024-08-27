import {DayOfWeek} from "./DayOfWeek";

export interface ISchedule {
    dayOfWeek: DayOfWeek;
    fromTime: string;
    toTime: string;
}
