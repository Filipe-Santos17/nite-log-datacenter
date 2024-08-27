import React from "react";

import "./ScheduleLine.css";

const ScheduleLineHead = () => {
    return (
        <div className="schedule-line">
            <span className="schedule-line__day">Dia</span>
            <span className="schedule-line__from">Entrada</span>
            <span className="schedule-line__to">Saída</span>
        </div>
    );
};

export default ScheduleLineHead;