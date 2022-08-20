import { createContext, useState } from "react";

// default user values
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

// "children" = <App />
export const UserProvider = ({ children }) => {
    // change user state (signed in or out)
    const [currentUser, setCurrentUser] = useState(null);
    const value = {currentUser, setCurrentUser};

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
