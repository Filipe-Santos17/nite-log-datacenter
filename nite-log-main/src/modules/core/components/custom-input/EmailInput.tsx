import React from "react";
import {InputProps} from "./InputProps";
import "./CustomInputs.css";

const EmailInput = ({label, name, onChange}: InputProps) => {
    return (
        <input
            type="email"
            placeholder={label}
            name={name}
            onChange={onChange}
        />
    );
};

export default EmailInput;