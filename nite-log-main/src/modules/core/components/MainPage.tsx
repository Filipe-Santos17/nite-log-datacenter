import React, {useEffect} from "react";
import {Route, useLocation} from "wouter";

import "./MainPage.css";
import {UserContextType} from "../types/User";

import {UserContext} from "../context/userContext";
import UserAuth from "../../user-auth/components/UserAuth";
import AttendanceAndSchedules from "../../attendance-schedule/components/AttendanceAndSchedules";
import UserPage from "../../user-page/components/UserPage";

const MainPage = () => {
    const {
        globalUser,
        setPath
    } = React.useContext(UserContext) as UserContextType

    const [location, navigate] = useLocation();

    const queryParams = new URLSearchParams(window.location.search);
    const activeCode = queryParams.get('activeCode');
    const newPath = activeCode ? `?activeCode=${activeCode}` : ""

    location === "/" && navigate(`/auth/${newPath}`);

    useEffect(() => {
        setPath(newPath);
        if (globalUser?.userId !== "") {
            navigate(`/home`);
        }
        //eslint-disable-next-line
    }, [globalUser])

    return (
        <main>
            <Route path="/auth">
                <UserAuth/>
            </Route>
            <Route path="/home">
                <AttendanceAndSchedules
                    navigateToUserPage={() => navigate(`/user-page`)}
                />
            </Route>
            <Route path="/user-page">
                <UserPage
                    navigateToAttendanceSchedule={() => navigate(`/home`)}
                />
            </Route>
        </main>
    );
};

export default MainPage;