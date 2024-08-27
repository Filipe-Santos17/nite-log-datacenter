import {IAttendanceEntry} from "./AttendanceEntry";

export interface IAttendanceList {
    listDate: string;
    activeCode: string;
    attendees: Array<IAttendanceEntry>;
}