import { createContext, useState, useEffect } from "react";
import { createUserDocFromAuth, onAuthStateChangedListener } from "../utils/firebase/firebase.utils";

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

    // switching to the auth page check if user signed in or out to use correct settings
    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) =>{
            if (user) {
                createUserDocFromAuth(user);
            }
            setCurrentUser(user);
        });

        return unsubscribe;
    }, []);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
