import './ToggleLoginBtn.css';
import React from "react";

type ToggleLoginBtnProps = {
    isLoginToggled: boolean;
    setIsLoginToggled: React.Dispatch<React.SetStateAction<boolean>>;
}

const ToggleLoginBtn = ({isLoginToggled, setIsLoginToggled}: ToggleLoginBtnProps) => {
    const loginBtnClassNames: string = isLoginToggled? "toggle-btn active" : "toggle-btn";
    const signupBtnClassNames: string = isLoginToggled? "toggle-btn" : "active toggle-btn";

    const handleLoginBtnClick = () => {
        setIsLoginToggled(true);
    }

    const handleSignupBtnClick = () => {
        setIsLoginToggled(false);
    }

    return (
        <div className="toggle-btn-container">
            <button
                className={loginBtnClassNames}
                onClick={handleLoginBtnClick}
            >Entrar</button>
            <button
                className={signupBtnClassNames}
                onClick={handleSignupBtnClick}
            >Criar conta</button>
        </div>
    );
};

export default ToggleLoginBtn;