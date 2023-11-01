import { createContext, useState } from "react";

export const UserContact = createContext();

export const UserProvider = (props) => {
     const [user, setUser] = useState('');
     return (
        <UserContext.Provider value = {{ user }}>
            {props.children}
        </UserContext.Provider>
     )
}