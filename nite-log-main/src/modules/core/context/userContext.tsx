import React, {useState} from "react";
import {IUser, UserContextType} from "../types/User";

export const UserContext = React.createContext<UserContextType | null>(null);

const UserProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [path, setPath] = useState("")
    const [globalUser, setGlobalUser] = React.useState<IUser>({
        displayName: "",
        email: "",
        schedule: "not initialized",
        userId: ""
    });

    return (
        <UserContext.Provider value={{globalUser, setGlobalUser, path, setPath}}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;