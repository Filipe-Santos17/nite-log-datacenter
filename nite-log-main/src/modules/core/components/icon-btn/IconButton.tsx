import React, {MouseEventHandler} from "react";

import "./IconButton.css";

type IconButtonProps = {
    onClick?: MouseEventHandler;
    icon: any;
    alt: string;
    title?: string;
    className?: string;
}

const IconButton = ({onClick, icon, alt, title, className}: IconButtonProps) => {
    return (
        <button onClick={onClick} className={`icon-btn ${className}`}>
            <img src={icon} alt={alt}/>
            {title ? <span>{title}</span> : null}
        </button>
    );
};

export default IconButton;