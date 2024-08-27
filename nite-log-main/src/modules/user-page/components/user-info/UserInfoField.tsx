import React from "react";

import "../UserPage.css";

type UserInfoFieldProps = {
    label: string;
    value: string | undefined;
}

const UserInfoField = ({label, value}: UserInfoFieldProps) => {
    return (
        <div className="user-info-field">
            <span className="user-info__label">{label}</span>
            <span className="user-info__value">{value}</span>
        </div>
    );
};

export default UserInfoField;