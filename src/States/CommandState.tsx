import React, { createContext, useState, useEffect } from 'react';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

export interface Command {
    prefix: string;
    response: string;
}

export interface Commands {
    commands: Command[];
}

export async function saveCommands(cs: Command[]) {
    await Storage.set({
        key: 'commands',
        value: JSON.stringify(cs)
    });

}

let CommandsContext = createContext({} as Commands);

//let CommandsContextProvider = CommandsContext.Provider;

function CommandsContextProvider(props: { children: React.ReactNode; }) {

    const [initialCommands, setInitialCommands] = useState([] as Command[]);

    useEffect(() => {
        Promise.resolve(Storage.get({ key: 'commands' }).then(
            (result) => {
                if (typeof result.value === 'string') {
                    setInitialCommands(JSON.parse(result.value) as Command[]);
                }
            },
            (reason) => console.log("Failed to load commands from storage because of: " + reason)
        ));
    }, []); // Nifty trick with useEffect from: https://css-tricks.com/run-useeffect-only-once/

    return (
        <CommandsContext.Provider value={{ commands: initialCommands }}>{props.children}</CommandsContext.Provider>
    )
}

let CommandsContextConsumer = CommandsContext.Consumer;

export { CommandsContext, CommandsContextConsumer, CommandsContextProvider }