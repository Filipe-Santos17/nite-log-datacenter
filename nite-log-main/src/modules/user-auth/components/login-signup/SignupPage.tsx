import React, {useEffect, useState} from "react";
import {useAuth} from "../../hooks/auth/useAuth";

import FieldErrorMsg from "../field-error-msg/FieldErrorMsg";
import TextInput from "../../../core/components/custom-input/TextInput";
import EmailInput from "../../../core/components/custom-input/EmailInput";
import PasswordInput from "../../../core/components/custom-input/PasswordInput";
import FilledButton from "../../../core/components/filled-btn/FilledButton";
import Loading from "../../../core/components/loading/Loading";
import {checkValues} from "../../../core/utils/utils";
import {UserContextType} from "../../../core/types/User";
import {UserContext} from "../../../core/context/userContext";
import ErrorModal from "../error-modal/ErrorModal";

type FormValues = {
    username: string;
    email: string;
    password: string;
}

const SignupPage = () => {
    const {
        setGlobalUser
    } = React.useContext(UserContext) as UserContextType;
    const {
        isLoading,
        user,
        error,
        createUser
    } = useAuth();

    const [isError, setIsError] = useState(false);
    const [signupError, setSignupError] = useState<string | undefined | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formValues, setFormValues] = useState<FormValues>({
        username: '',
        email: '',
        password: ''
    });

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        });
    }

    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault();

        if (checkValues(formValues, setIsError)) return;

        const queryParams = new URLSearchParams(window.location.search);
        const activeCode = queryParams.get('activeCode');

        createUser(
            formValues.username,
            formValues.email,
            formValues.password,
            activeCode
        );
    }

    useEffect(() => {
        if (user) {
            setGlobalUser(user);
        }
        // eslint-disable-next-line
    }, [user]);

    useEffect(() => {
        if (error) {
            setSignupError(error);
            setIsModalOpen(true);
        }
    }, [error]);

    return (
        <form onSubmit={submitHandler}>
            {isError &&
                <FieldErrorMsg message="Erro ao criar conta. Verifique os campos!"/>
            }
            <TextInput
                label="Nome de Usuário"
                name="username"
                onChange={changeHandler}
            />
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
                title="Registrar"
            />

            {isLoading && <Loading />}
            {isModalOpen &&
                <ErrorModal
                    setIsModalOpen={setIsModalOpen}
                    error={signupError}
                />
            }
        </form>
    );
};

export default SignupPage;