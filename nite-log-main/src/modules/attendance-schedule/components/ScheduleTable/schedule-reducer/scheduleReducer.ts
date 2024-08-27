import {ISchedule} from "../../../../core/types/Schedule";
import {DayOfWeek} from "../../../../core/types/DayOfWeek";

export type ScheduleAction =
    | {type: "ADD", payload: ISchedule}
    | {type: "REMOVE", payload: ISchedule}
    | {type: "UPDATE", payload: {newSchedule: ISchedule, originalDayOfWeek: DayOfWeek}}
    | {type: "REPLACE-ALL", payload: ISchedule[]}

export const scheduleReducer = (state: ISchedule[], action: ScheduleAction) => {
    switch (action.type) {
        case "ADD":
            return [...state, action.payload];
        case "REMOVE":
            return state.filter(s => s !== action.payload);
        case "UPDATE":
            return state.map(s => s.dayOfWeek === (action.payload.originalDayOfWeek) ? action.payload.newSchedule : s);
        case "REPLACE-ALL":
            return action.payload as ISchedule[];
        default:
            return state;
    }
}