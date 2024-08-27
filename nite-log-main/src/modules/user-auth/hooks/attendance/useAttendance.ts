import {collection, doc, getDoc, updateDoc} from "firebase/firestore";
import {db} from "../../../core/service/firebase";
import {getToday} from "../../utils/utils";
import {IAttendanceList} from "../../../core/types/AttendanceList";
import {IAttendanceEntry} from "../../../core/types/AttendanceEntry";

type useAttendanceReturn = {
    addUserToAttendanceList(activeCode: string | null, userId: string): void
    removeUserFromAttendanceList(userId: string, workDone: string): Promise<void>,
    checkIsUserOnAttendance(userId: string | undefined): Promise<boolean>,
    checkTodayActiveCode(activeCode: string): Promise<boolean>
}

export const useAttendance = (): useAttendanceReturn => {
    const attendanceListsRef = collection(db, 'attendance-lists');

    const getTodayListRef = () => {
        const today = getToday()
        return doc(attendanceListsRef, today);
    }

    const addUserToAttendanceList = async (activeCode: string | null, userId: string) => {
        // Get today's attendance list
        const todayList = getTodayListRef();

        // If document does not exist, return
        const docSnap = await getDoc(todayList);
        if (!docSnap.exists()) return;

        const listData = docSnap.data() as IAttendanceList;

        // If active code does not match, return
        if (listData.activeCode.toString() !== activeCode) return;

        // Create new attendance entry
        const newAttendanceEntry: IAttendanceEntry = {
            userId: userId,
            clockIn: new Date(),
            clockOut: null,
            workDone: ""
        }

        // If user is already in attendance list, return
        if (listData.attendees.some(attendee => attendee.userId === userId)) return;

        // Add user to attendance list
        listData.attendees.push(newAttendanceEntry);

        await updateDoc(todayList, {"attendees": listData.attendees});
    }

    const removeUserFromAttendanceList = async (userId: string, workDone: string): Promise<void> => {
        // Get today's attendance list
        const todayList = getTodayListRef();

        // If document does not exist, return
        const docSnap = await getDoc(todayList);
        if (!docSnap.exists()) return;

        const listData = docSnap.data() as IAttendanceList;

        // If user is not in attendance list, return
        if (!listData.attendees.some(attendee => attendee.userId === userId)) return;

        // Remove user from attendance list
        listData.attendees.forEach((attendee) => {
            if (attendee.userId === userId) {
                attendee.clockOut = new Date();
                attendee.workDone = workDone;
            }
        })

        await updateDoc(todayList, {"attendees": listData.attendees});
        return;
    }

    const checkIsUserOnAttendance = async (userId: string | undefined): Promise<boolean> => {
        const todayList = getTodayListRef();

        const docSnap = await getDoc(todayList);
        if (!docSnap.exists()) return false;

        if (userId === undefined) return false;

        const listData = docSnap.data() as IAttendanceList;

        return listData.attendees.some(attendee => attendee.userId === userId);
    }

    const checkTodayActiveCode = async (activeCode: string): Promise<boolean> => {
        const todayList = getTodayListRef();

        const docSnap = await getDoc(todayList);
        if (!docSnap.exists()) return false;

        const listData = docSnap.data() as IAttendanceList;

        return listData.activeCode.toString() === activeCode;
    }

    return {
        addUserToAttendanceList,
        removeUserFromAttendanceList,
        checkIsUserOnAttendance,
        checkTodayActiveCode
    };
}