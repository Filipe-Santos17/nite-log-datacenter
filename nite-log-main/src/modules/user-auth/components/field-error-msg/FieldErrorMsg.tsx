import React from "react";

type FieldErrorMsgProps = {
    message: string;
};


const FieldErrorMsg = ({message}: FieldErrorMsgProps) => {
    return (
        <span className="error-message">
            {message}
        </span>
    );
};

export default FieldErrorMsg;