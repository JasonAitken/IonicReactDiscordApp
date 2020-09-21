import React, { useState } from 'react';
import {
    IonItemOptions, IonItemOption, IonItemSliding, IonList, IonItem, IonLabel,
    IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonInput
} from '@ionic/react';
import uuid from 'uuid';
import { ServersContextConsumer, Servers, saveServers, Server, ActiveServerContextConsumer, setActiveServer, ActiveServer } from '../States/ServerState';
import './MyServers.css';

//this is for the set up of adding and managing all servers

const MyServers: React.FC = () => {
    var prefixTRemove: string;
    //var name: string;
    const [URL, setURL] = useState("");
    const [name, setName] = useState("");
    return (
        <IonPage >
            <IonHeader>
                <IonToolbar color="dark">
                    <IonTitle color="tertiary">My Servers</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent color="base" fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">My Servers</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <ActiveServerContextConsumer>
                    {(context: ActiveServer) => (
                        <IonHeader><IonTitle color="tertiary" size="large">   Active Server: {context.server.serverName}</IonTitle></IonHeader>)}
                </ActiveServerContextConsumer>
                <IonInput color="light" placeholder="Server name" onIonChange={e => setName( e.detail.value!)}></IonInput>
                <IonInput color="light" placeholder="URL" onIonChange={e => setURL(e.detail.value!)}></IonInput>
                <ServersContextConsumer>
                    {(context: Servers) => (
                        <IonButton color="tertiary" routerLink="/MyServers" routerDirection="forward" onClick={e => {
                            //This will create a new server. If there are other servers in the state memory it will push it to the list other wise create a new list
                            context.servers ? context.servers.push({ serverName: name, URL: URL }) :
                                context.servers = [{ serverName: name, URL: URL }]
                            saveServers(context.servers);
                        }
                        }>Add New Server</IonButton>
                    )}
                </ServersContextConsumer>
                <ServersContextConsumer>
                    {(context: Servers) => (
                        <IonList class='ion-list'>
                            <IonItem color="dark"><IonLabel color="tertiary">Total Number of Servers: {context.servers ? context.servers.length : 0}</IonLabel></IonItem>
                            {(context.servers)
                                ? context.servers.map((c: Server) =>
                                    <IonItemSliding  key={uuid.v4()}>
                                        <IonItem color="dark"><IonLabel color="tertiary" className="ion-text-wrap">{c.serverName}</IonLabel></IonItem>
                                        <IonItemOptions side="end">
                                            <IonItemOption color="tertiary" onClick={() => {
                                                //this will set the server t the active server
                                                setActiveServer(c);
                                                setName(c.serverName);
                                            }}>Activate</IonItemOption>
                                            <IonItemOption color="medium" routerLink="/MyServers" routerDirection="forward" onClick={() => {
                                                //this will remove the server from the storage list and the save the new list
                                                var i = context.servers.findIndex(o => o.serverName === c.serverName && o.URL === c.URL);
                                                if (i > -1) context.servers.splice(i, 1);
                                                saveServers(context.servers);
                                            }}>Delete</IonItemOption>
                                        </IonItemOptions>
                                    </IonItemSliding>)
                                : {}}
                        </IonList>
                    )}
                </ServersContextConsumer>
            </IonContent>
        </IonPage >
    );
};

export default MyServers;
