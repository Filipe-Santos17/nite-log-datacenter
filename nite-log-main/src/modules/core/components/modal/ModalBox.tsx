import React, {MouseEventHandler, PropsWithChildren} from "react";

import './ModalBox.css';

type ModalBoxProps = {
    onClick: MouseEventHandler<HTMLDivElement>;
    className?: string;
}

const ModalBox = ({onClick, className, children}: PropsWithChildren<ModalBoxProps>) => {
    return (
        <div className={`modal-box ${className}`} onClick={onClick}>
            <div className="modal-content">
                {children}
            </div>
        </div>
    );
};

export default ModalBox;