import React, {useCallback, useEffect, useReducer, useState} from "react";

import "./ScheduleTable.css";

import {ISchedule} from "../../../core/types/Schedule";

import Card from "../../../core/components/card/Card";
import ScheduleLine from "./schedule-line/ScheduleLine";
import FilledButton from "../../../core/components/filled-btn/FilledButton";
import IconButton from "../../../core/components/icon-btn/IconButton";
import { UserContext } from "../../../core/context/userContext";
import {UserContextType} from "../../../core/types/User";
import { useUser } from "../../../core/hooks/user/useUser";
import { scheduleReducer } from "./schedule-reducer/scheduleReducer";
import {DayOfWeek} from "../../../core/types/DayOfWeek";
import Loading from "../../../core/components/loading/Loading";
import ScheduleLineHead from "./schedule-line/ScheduleLineHead";
import RemoveScheduleModal from "./remove-schedule-modal/RemoveScheduleModal";

const addIcon = require("../../assets/icons/add.png");

const createNewSchedule = (scheduleList: ISchedule[]): ISchedule => {
    let nextDayOfWeek = 0;
    if (scheduleList.length > 0) {
        const lastDayOfWeek = scheduleList[scheduleList.length - 1].dayOfWeek;
        nextDayOfWeek = (lastDayOfWeek + 1) % 5;
    }

    while (scheduleList.some(s => s.dayOfWeek === nextDayOfWeek)) {
        nextDayOfWeek = (nextDayOfWeek + 1) % 5;
    }

    return {
        dayOfWeek: nextDayOfWeek,
        fromTime: "08:00",
        toTime: "12:00"
    }
}

const ScheduleTable = () => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dayToRemove, setDayToRemove] = useState<number | undefined>();

    const {
        globalUser,
        setGlobalUser
    } = React.useContext(UserContext) as UserContextType;
    const {
        updateUserSchedule
    } = useUser();

    const getScheduleList = useCallback(() => {
        if (globalUser === null || globalUser.schedule === "not initialized") return [];
        return globalUser.schedule;
    }, [globalUser])

    const [scheduleList, dispatch] = useReducer(scheduleReducer, []);

    useEffect(() => {
        dispatch({type: "REPLACE-ALL", payload: getScheduleList()});
    }, [getScheduleList]);

    const handleScheduleChange = useCallback((newSchedule: ISchedule, originalDayOfWeek: DayOfWeek) => {
        dispatch({type: "UPDATE", payload: {newSchedule, originalDayOfWeek}});
    }, []);

    const handleAddSchedule = () => {
        if (scheduleList.length < 5) {
            const newSchedule = createNewSchedule(scheduleList);
            dispatch({type: "ADD", payload: newSchedule});
        }
    }

    const handleRemoveSchedule = (dayOfWeek: number) => {
        setDayToRemove(dayOfWeek);
        setIsModalOpen(true)
    }

    const removeSchedule = (dayOfWeek: number) => {
        const scheduleToRemove = (scheduleList as ISchedule[]).find(s => s.dayOfWeek === dayOfWeek);
        if (scheduleToRemove) {
            dispatch({type: "REMOVE", payload: scheduleToRemove});
        }
    }

    const handleSaveSchedule = useCallback(() => {
        setIsUpdating(true);
        if (globalUser === null) return;
        setGlobalUser((prevUser) => {
            return {
                ...prevUser,
                schedule: scheduleList
            }
        });
        // eslint-disable-next-line
    }, [globalUser, scheduleList]);

    useEffect(() => {
        if (globalUser === null) return;
        updateUserSchedule(globalUser).then(() => setIsUpdating(false));
    }, [globalUser, updateUserSchedule, isUpdating]);

    return (
        <Card>
            <span className="card-title">Como serão seus horários?</span>

            <ScheduleLineHead />
            {(scheduleList as ISchedule[]).map((schedule, index) => {
                return <ScheduleLine
                    key={index}
                    schedule={schedule}
                    scheduleList={scheduleList}
                    onChange={(updatedSchedule, newDayOfWeek) => handleScheduleChange(updatedSchedule, newDayOfWeek)}
                    onRemove={() => handleRemoveSchedule(schedule.dayOfWeek)}
                />
            })}

            <span className="spacer"></span>

            <IconButton
                icon={addIcon}
                alt={"Novo horário"}
                title={"Novo Horário"}
                onClick={handleAddSchedule}
                className="add-schedule-btn"
            />
            <FilledButton
                title="Salvar"
                onClick={handleSaveSchedule}
            />

            {isUpdating && <Loading />}
            {isModalOpen &&
                <RemoveScheduleModal
                    setIsModalOpen={setIsModalOpen}
                    dayOfWeek={dayToRemove}
                    removeSchedule={removeSchedule}
                />
            }
        </Card>
    );
};

export default ScheduleTable;