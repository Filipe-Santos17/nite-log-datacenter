import React, {useState} from "react";

import "./DropdownStyles.css";
import {generateHours} from "../../../utils/utils";
import useClickOutside from "../../../hooks/use-click-outside/useClickOutside";

const hours = generateHours(7, 22, 30);

type HoursDropdownProps = {
    hoursValidFrom?: string,
    selectedHour: string,
    onChange: (time: string) => void
}

const HoursDropdown = ({hoursValidFrom, selectedHour, onChange}: HoursDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = React.useRef<HTMLDivElement | null>(null);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleHourChange = (hour: string) => {
        toggleDropdown();
        onChange(hour);
    }

    useClickOutside(dropdownRef, () => setIsOpen(false));

    const validHours = hoursValidFrom ? hours.filter((hour) => hour > hoursValidFrom) : hours;

    return (
        <div className="dropdown-container" ref={dropdownRef}>
            <div className="dropdown-header" onClick={toggleDropdown}>
                {selectedHour || validHours[0]}
            </div>
            {isOpen && (
                <div className="dropdown-list-container">
                    <ul className="dropdown-list">
                        {validHours.map((hour, index) => {
                            return <li
                                className="dropdown-item"
                                onClick={handleHourChange.bind(null, hour)}
                                key={index}
                            >{hour}</li>
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default HoursDropdown;