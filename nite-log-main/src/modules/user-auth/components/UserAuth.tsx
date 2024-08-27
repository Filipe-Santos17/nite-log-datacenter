import './UserAuth.css';
import React, {useState} from "react";

import Header from "../../core/components/header/Header";
import LoginPage from "./login-signup/LoginPage";
import SignupPage from "./login-signup/SignupPage";

const UserAuth = () => {
    const [isLoginToggled, setIsLoginToggled] = useState(true);

    return (
        <section className="user-auth">
            <Header
                isLoginToggled={isLoginToggled}
                setIsLoginToggled={setIsLoginToggled}
            />

            <span className="task-description">Registre sua presença.</span>

            {isLoginToggled ? (
                <LoginPage/>
            ) : (
                <SignupPage/>
            )}
        </section>
    );
};

export default UserAuth;