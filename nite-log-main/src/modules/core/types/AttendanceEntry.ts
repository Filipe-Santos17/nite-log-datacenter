export interface IAttendanceEntry {
    userId: string;
    clockIn: Date;
    clockOut: Date | null;
    workDone: string | "";
}