import React, {PropsWithChildren} from "react";

import "./Card.css";

const Card = ({children}: PropsWithChildren) => {
    return (
        <div className="card-container">
            {children}
        </div>
    );
};

export default Card;