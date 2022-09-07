import { createContext, useReducer,useEffect } from "react";
import { createUserDocFromAuth, onAuthStateChangedListener } from "../utils/firebase/firebase.utils";

// default user values
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER',
};

// REDUCER FUNCTION
const  userReducer = (state , action) => {
    const { type, payload } = action;

    switch (type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser : payload,
            };
        default:
            throw new Error(`Unhandled type ${type} in userReducer`);
    }
};

// INITIAL STATE FOR REDUCER
const INITIAL_STATE = {
    currentUser: null,
};

// "children" = <App />
export const UserProvider = ({ children }) => {
    const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);

    const setCurrentUser = (user) => {
        dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user});
    };

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
