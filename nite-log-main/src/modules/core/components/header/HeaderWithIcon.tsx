import React, {MouseEventHandler} from "react";

import "./Header.css";

const defaultUserIcon = require("../../assets/default-user.png");

type HeaderWithIconsProps = {
    onClickLogo?: MouseEventHandler
    onClickIcon?: MouseEventHandler
}

const HeaderWithIcon = ({onClickLogo, onClickIcon}: HeaderWithIconsProps) => {
    return (
        <header>
            <span
                className="page-title"
                onClick={onClickLogo}
            >NiteLog</span>
            <img
                src={defaultUserIcon}
                alt="User Icon"
                className="user-icon"
                onClick={onClickIcon}
            />
        </header>
    );
};

export default HeaderWithIcon;