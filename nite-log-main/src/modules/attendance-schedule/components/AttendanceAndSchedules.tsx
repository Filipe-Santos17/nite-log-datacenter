import React, {useEffect} from "react";

import "./AttendanceAndSchedules.css";

import HeaderWithIcon from "../../core/components/header/HeaderWithIcon";
import AttendanceTracker from "./attendance-tracker/AttendanceTracker";
import ScheduleTable from "./ScheduleTable/ScheduleTable";
import { useLocation } from "wouter";
import {UserContextType} from "../../core/types/User";
import {UserContext} from "../../core/context/userContext";

type AttendanceAndSchedulesProps = {
    navigateToUserPage: () => void,
}

const AttendanceAndSchedules = ({navigateToUserPage}: AttendanceAndSchedulesProps) => {
    const {
        path
    } = React.useContext(UserContext) as UserContextType
    const [location, navigate] = useLocation();


    useEffect(() => {
        if (location !== `/home/${path}`) {
            navigate(`/home/${path}`);
        }
    }, [path]);

    return (
        <section className="attendance-schedules">
            <HeaderWithIcon onClickIcon={navigateToUserPage}/>

            <AttendanceTracker/>

            <ScheduleTable />
        </section>
    );
};

export default AttendanceAndSchedules;