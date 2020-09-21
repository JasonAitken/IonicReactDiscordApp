import React, { createContext, useState, useEffect } from 'react';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

export interface Server {
    serverName: string;
    URL: string;
}

export interface Servers {
    servers: Server[];
}

export async function saveServers(ss: Server[]) {
    await Storage.set({
        key: 'servers',
        value: JSON.stringify(ss)
    });

}

export interface ActiveServer {
    server: Server;
}

export async function setActiveServer(s: Server) {
    await Storage.set({
        key: 'active',
        value: JSON.stringify(s)
    });
}

//name: string;
//iage: string;

//export 

//var activeServer: Server = { name:"Test Chat", URL: "https://discordapp.com/api/webhooks/748385870956200057/SGKDX_0m5_YSoqKlyLSl6cuhQK27P9Og-0rB7B0pCDg6aKR3_m5r9dBjQvus3xwoocvb"};

/*export function getActiveServer(){
    return activeServer;
}*/

/*export function setActiveServer(server: Server) {
    activeServer = server;

    
}*/

let ActiveServerContext = createContext({} as ActiveServer);

let ServersContext = createContext({} as Servers);

let initServers = [{
    serverName: "Test Chat",
    name: "Command Creator",
    image: "https://www.theflavorbender.com/wp-content/uploads/2019/02/Homemade-Bread-Featured-1-500x500.jpg",
    URL: "https://discordapp.com/api/webhooks/748385870956200057/SGKDX_0m5_YSoqKlyLSl6cuhQK27P9Og-0rB7B0pCDg6aKR3_m5r9dBjQvus3xwoocvb"

} as Server];

//let CommandsContextProvider = CommandsContext.Provider;

function ServersContextProvider(props: { children: React.ReactNode; }) {

    const [initialServers, setInitialServers] = useState(initServers);

    useEffect(() => {
        Promise.resolve(Storage.get({ key: 'servers' }).then(
            (result) => {
                if (typeof result.value === 'string') {
                    setInitialServers(JSON.parse(result.value) as Server[]);
                }
            },
            (reason) => console.log("Failed to load servers from storage because of: " + reason)
        ));
    }, []); // Nifty trick with useEffect from: https://css-tricks.com/run-useeffect-only-once/

    return (
        <ServersContext.Provider value={{ servers: initialServers }}>{props.children}</ServersContext.Provider>
    )
}

function ActiveServerContextProvider(props: { children: React.ReactNode; }) {

    const [initialActiveServer, setInitialActiveServer] = useState({
        serverName: "Test Chat",
        name: "Command Creator",
        image: "https://www.theflavorbender.com/wp-content/uploads/2019/02/Homemade-Bread-Featured-1-500x500.jpg",
        URL: "https://discordapp.com/api/webhooks/748385870956200057/SGKDX_0m5_YSoqKlyLSl6cuhQK27P9Og-0rB7B0pCDg6aKR3_m5r9dBjQvus3xwoocvb"
    } as Server);

    useEffect(() => {
        Promise.resolve(Storage.get({ key: 'active' }).then(
            (result) => {
                if (typeof result.value === 'string') {
                    setInitialActiveServer(JSON.parse(result.value) as Server);
                }
            },
            (reason) => console.log("Failed to load active server from storage because of: " + reason)
        ));
    }, []); // Nifty trick with useEffect from: https://css-tricks.com/run-useeffect-only-once/

    return (
        <ActiveServerContext.Provider value={{ server: initialActiveServer }}>{props.children}</ActiveServerContext.Provider>
    )
}

let ServersContextConsumer = ServersContext.Consumer;

let ActiveServerContextConsumer = ActiveServerContext.Consumer;

export { ServersContext, ServersContextConsumer, ServersContextProvider, ActiveServerContext, ActiveServerContextConsumer, ActiveServerContextProvider }