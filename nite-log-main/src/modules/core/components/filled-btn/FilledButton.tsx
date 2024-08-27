import React, {MouseEventHandler} from 'react';
import './FilledButton.css';

type FilledButtonProps = {
    className?: string;
    onClick?: MouseEventHandler;
    type?: 'button' | 'submit' | 'reset';
    title: string;
};

const FilledButton = ({className, onClick, type = "button",title}: FilledButtonProps) => {
    return (
        <button onClick={onClick} type={type} className={`filled-btn ${className}`}>
            {title}
        </button>
    );
};

export default FilledButton;