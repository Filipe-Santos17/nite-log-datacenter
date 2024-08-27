import React, {useEffect, useState} from "react";
import {useAuth} from "../../hooks/auth/useAuth";

import {UserContext} from "../../../core/context/userContext";
import {UserContextType} from "../../../core/types/User";

import FieldErrorMsg from "../field-error-msg/FieldErrorMsg";
import EmailInput from "../../../core/components/custom-input/EmailInput";
import PasswordInput from "../../../core/components/custom-input/PasswordInput";
import FilledButton from "../../../core/components/filled-btn/FilledButton";
import Loading from "../../../core/components/loading/Loading";
import {checkValues} from "../../../core/utils/utils";
import ErrorModal from "../error-modal/ErrorModal";

type FormValues = {
    email: string;
    password: string;
}

const LoginPage = () => {
    const {
        setGlobalUser
    } = React.useContext(UserContext) as UserContextType;
    const {
        isLoading,
        user,
        error,
        logUserIn
    } = useAuth()

    const [isError, setIsError] = useState(false);
    const [loginError, setLoginError] = useState<string | null | undefined>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formValues, setFormValues] = useState<FormValues>({
        email: '',
        password: ''
    });

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        });
    };

    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault()

        if (checkValues(formValues, setIsError)) return;

        const queryParams = new URLSearchParams(window.location.search);
        const activeCode = queryParams.get('activeCode');

        logUserIn(formValues.email, formValues.password, activeCode);
    }

    useEffect(() => {
        if (user) {
            setGlobalUser(user);
        }
        // eslint-disable-next-line
    }, [user])

    useEffect(() => {
        if (error) {
            setLoginError(error);
            setIsModalOpen(true);
        }
    }, [error])

    return (
        <form onSubmit={submitHandler}>
            {isError &&
                <FieldErrorMsg message="Erro ao fazer login. Verifique os campos!"/>
            }
            <EmailInput
                label="E-mail"
                name="email"
                onChange={changeHandler}
            />
            <PasswordInput
                label="Senha"
                name="password"
                onChange={changeHandler}
            />
            <FilledButton
                type="submit"
                title="Entrar"
            />

            {isLoading && <Loading />}
            {isModalOpen &&
                <ErrorModal
                    setIsModalOpen={setIsModalOpen}
                    error={loginError}
                />
            }
        </form>
    );
};

export default LoginPage;