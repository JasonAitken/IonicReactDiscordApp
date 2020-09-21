import React from 'react';
import {
    IonItemOptions, IonItemOption, IonItemSliding, IonList, IonItem, IonLabel,
    IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonRefresher, IonRefresherContent, IonInput, IonButton, IonIcon
} from '@ionic/react';
import uuid from 'uuid';
import { CommandsContextConsumer, Commands, saveCommands, Command } from '../States/CommandState';
import './MyCommands.css';
import { sendMessage } from '../chatManager';
import { ActiveServerContextConsumer, ActiveServer } from '../States/ServerState';
import { LoginContextConsumer, ActiveLogin} from '../States/LoginState';
import { App } from '@capacitor/core';
import {  logOut } from 'ionicons/icons';


//this is the page for adding and manageing commands

const MyCommands: React.FC = () => {
    var prefix: string;
    var reposnse: string;
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="dark">
                    <IonTitle color="tertiary">My Commands
                        <IonButton routerLink="/HomePage" routerDirection="forward" class='logout' fill='clear'>Logout
                            <IonIcon color="tertiary" icon={logOut}></IonIcon>
                        </IonButton>
                    </IonTitle>
                    
                </IonToolbar>
            </IonHeader>
            <IonContent color="base" fullscreen>

                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">My Commands</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonInput color="light" placeholder="Command Prefix" onIonChange={e => prefix = e.detail.value!}></IonInput>
                <IonInput color="light" placeholder="Command Response" onIonChange={e => reposnse = e.detail.value!}></IonInput>
                <LoginContextConsumer>
                    {(loginContext: ActiveLogin) => (
                        <ActiveServerContextConsumer>
                            {(contexts: ActiveServer) =>
                                <CommandsContextConsumer>
                                    {(context: Commands) => (
                                        <IonButton color="tertiary" routerLink="/MyCommands" routerDirection="forward" onClick={e => {
                                            //this will add the new command using the prefix and respnse and either add it to the existing list r create a new list containing this
                                            //sends a message to the bot so that it can add the commd to its list
                                            context.commands ? context.commands.push({ prefix: prefix, response: reposnse }) :
                                                context.commands = [{ prefix: prefix, response: reposnse }]
                                            saveCommands(context.commands);
                                            sendMessage("created command " + prefix + " : " + reposnse, contexts.server.URL, loginContext.login.name, loginContext.login.image);
                                            
                                        }
                                        }>Add New Command</IonButton>
                                    )}
                                </CommandsContextConsumer>}
                        </ActiveServerContextConsumer>
                    )}</LoginContextConsumer>
                <LoginContextConsumer>
                    {(loginContext: ActiveLogin) => (
                        <ActiveServerContextConsumer>
                            {(contexts: ActiveServer) =>
                                <CommandsContextConsumer>
                                    {(context: Commands) =>
                                        <IonList class='ion-list'>
                                            <IonItem color="dark"><IonLabel color="tertiary">Total Number of Commands: {context.commands ? context.commands.length : 0}</IonLabel></IonItem>
                                            {(context.commands)
                                                ? context.commands.map((c: Command) =>
                                                    <IonItemSliding key={uuid.v4()}>
                                                        <IonItem color="dark"><IonLabel color="tertiary" className="ion-text-wrap">{c.prefix}: {c.response}</IonLabel></IonItem>

                                                        <IonItemOptions side="end">
                                                            <IonItemOption color="medium" routerLink="/HomePage" onClick={() => {
                                                                //this will remove the current command from the list
                                                                //will call a send message so that the bt will also remove it form its list
                                                                //uses the list place as identifyer for the bot
                                                                var i = context.commands.findIndex(o => o.prefix === c.prefix && o.response === c.response);
                                                                if (i > -1) context.commands.splice(i, 1);
                                                                saveCommands(context.commands);
                                                                sendMessage("deleted " + (i + 4), contexts.server.URL, loginContext.login.name, loginContext.login.image);

                                                            }}>Delete</IonItemOption>
                                                        </IonItemOptions>
                                                    </IonItemSliding>)
                                                : {}}
                                            <IonButton routerLink="/MyCommands" routerDirection="forward" color='medium' onClick={() => {
                                                context.commands.splice(0, context.commands.length);
                                                saveCommands(context.commands);
                                                
                                                sendMessage("clear_ALL", contexts.server.URL, loginContext.login.name, loginContext.login.image);
                                                //umimplemented
                                                localStorage.clear();
                                                //localStorage.$reset();
                                            }}>Clear All</IonButton>
                                        </IonList>
                                        
                                    }
                                </CommandsContextConsumer>}

                        </ActiveServerContextConsumer>
                    )}</LoginContextConsumer>
                
            </IonContent>
        </IonPage >
    );
};

export default MyCommands;
