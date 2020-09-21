import React, { createContext, useState, useEffect } from 'react';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

export interface Login {
    name: string;
    image: string;
}

export interface ActiveLogin {
    login: Login;
}

export async function setLogin(l: Login) {
    await Storage.set({
        key: 'login',
        value: JSON.stringify(l)
    });
}

let LoginContext = createContext({} as ActiveLogin);


function LoginContextProvider(props: { children: React.ReactNode; }) {

    const [initialLogin, setInitialLogin] = useState({ name: "Command Master", image: "https://www.theflavorbender.com/wp-content/uploads/2019/02/Homemade-Bread-Featured-1-500x500.jpg" } as Login);

    useEffect(() => {
        Promise.resolve(Storage.get({ key: 'login' }).then(
            (result) => {
                if (typeof result.value === 'string') {
                    setInitialLogin(JSON.parse(result.value) as Login);
                }
            },
            (reason) => console.log("Failed to load Login from storage because of: " + reason)
        ));
    }, []); // Nifty trick with useEffect from: https://css-tricks.com/run-useeffect-only-once/

    return (
        <LoginContext.Provider value={{ login: initialLogin }}>{props.children}</LoginContext.Provider>
    )
}


let LoginContextConsumer = LoginContext.Consumer;

export { LoginContext, LoginContextConsumer, LoginContextProvider }