import React from "react";

export const checkValues = <T>(values: T, setState: React.Dispatch<React.SetStateAction<boolean>>): boolean => {
    for (const key in values) {
        if (values[key] === '') {
            setState(true);
            return true;
        }
    }

    setState(false);
    return false;
}