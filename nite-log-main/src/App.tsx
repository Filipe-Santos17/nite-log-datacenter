import React from "react";

import UserProvider from "./modules/core/context/userContext";
import MainPage from "./modules/core/components/MainPage";

function App() {
    return (
        <UserProvider>
            <MainPage/>
        </UserProvider>
    );
}

export default App;
