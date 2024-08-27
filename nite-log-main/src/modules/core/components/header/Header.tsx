import React from 'react';

import './Header.css';

import ToggleLoginBtn from "../../../user-auth/components/toggle-login-btn/ToggleLoginBtn";

type HeaderProps = {
    isLoginToggled: boolean;
    setIsLoginToggled: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({isLoginToggled, setIsLoginToggled}: HeaderProps) => {
    return (
        <header>
            <span className="page-title">NiteLog</span>
            <ToggleLoginBtn
                isLoginToggled={isLoginToggled}
                setIsLoginToggled={setIsLoginToggled}
            />
        </header>
    );
};

export default Header;