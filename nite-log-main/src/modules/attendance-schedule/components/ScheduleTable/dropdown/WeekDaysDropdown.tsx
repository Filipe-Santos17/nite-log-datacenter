import React, {useRef, useState} from "react";

import "./DropdownStyles.css";
import {DayOfWeek, getDayOfWeek} from "../../../../core/types/DayOfWeek";
import useClickOutside from "../../../hooks/use-click-outside/useClickOutside";

type WeekDaysDropdownProps = {
    selectedDayOfWeek: DayOfWeek,
    daysInUse: DayOfWeek[]
    onChange: (dayOfWeek: DayOfWeek) => void,
}

const WeekDaysDropdown = ({selectedDayOfWeek, daysInUse, onChange}: WeekDaysDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleDayOfWeekChange = (dayOfWeek: DayOfWeek) => {
        toggleDropdown();
        onChange(dayOfWeek);
    }

    useClickOutside(dropdownRef, () => setIsOpen(false));

    return (
        <div className="dropdown-container" ref={dropdownRef}>
            <div className="dropdown-header" onClick={toggleDropdown}>
                {getDayOfWeek(selectedDayOfWeek) || getDayOfWeek(DayOfWeek.SEGUNDA)}
            </div>
            {isOpen && (
                <div className="dropdown-list-container">
                    <ul className="dropdown-list">
                        {Object.values(DayOfWeek)
                            .filter(dayOfWeek => !daysInUse.includes(dayOfWeek as DayOfWeek))
                            .map((dayOfWeek, index) => {
                            return <li
                                className="dropdown-item"
                                onClick={handleDayOfWeekChange.bind(null, dayOfWeek as DayOfWeek)}
                                key={index}
                            >{getDayOfWeek(dayOfWeek as DayOfWeek)}</li>
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default WeekDaysDropdown;