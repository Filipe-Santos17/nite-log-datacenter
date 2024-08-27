import React from "react";

import "./UserPage.css";

import {UserContextType} from "../../core/types/User";
import {UserContext} from "../../core/context/userContext";

import HeaderWithIcon from "../../core/components/header/HeaderWithIcon";
import Card from "../../core/components/card/Card";
import UserInfoField from "./user-info/UserInfoField";

type UserPageProps = {
    navigateToAttendanceSchedule: () => void
}

const UserPage = ({navigateToAttendanceSchedule}: UserPageProps) => {
    const {globalUser} = React.useContext(UserContext) as UserContextType;

    return (
        <section className="user-page">
            <HeaderWithIcon
                onClickLogo={navigateToAttendanceSchedule}
            />

            <Card>
                <div className="user-info">
                    <UserInfoField
                        label="Nome de Usuário"
                        value={globalUser?.displayName}
                    />
                    <UserInfoField
                        label="E-mail"
                        value={globalUser?.email}
                    />
                </div>
            </Card>
        </section>
    );
};

export default UserPage;