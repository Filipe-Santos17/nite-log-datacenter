import React from "react";
import {InputProps} from "./InputProps";
import "./CustomInputs.css";

const TextInput = ({label, name, onChange}: InputProps) => {
    return (
        <input
            type="text"
            placeholder={label}
            name={name}
            onChange={onChange}
        />
    );
};

export default TextInput;