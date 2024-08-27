import React from "react";
import {InputProps} from "./InputProps";
import "./CustomInputs.css";

const PasswordInput = ({label, name, onChange}: InputProps) => {
    return (
        <input
            type="password"
            placeholder={label}
            name={name}
            onChange={onChange}
        />
    );
};

export default PasswordInput;