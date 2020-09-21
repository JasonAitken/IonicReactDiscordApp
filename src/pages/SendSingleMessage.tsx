import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonSelect, IonSelectOption, IonList } from '@ionic/react';
import './SendSingleMessage.css';
import { ServersContextConsumer, Servers, Server} from '../States/ServerState';
import { sendMessage } from '../chatManager';

interface Message {
    name: string;
    message: string;
    image: string;
    server: string;
}

const SendSingleMessage: React.FC = () => {
    const [message, setMessage] = useState(" ");
    const [name, setName] = useState(" ");
    const [image, setImage] = useState(" ");
    const [server, setServer] = useState(" ");
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="dark">
                    <IonTitle color="tertiary">Send Message</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent color="base" fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Send Message</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonInput class= 'center' color="light" placeholder="Name" onIonChange={e => setName( e.detail.value!)}></IonInput>
                <IonInput class='centerB' color="light" placeholder="Message" onIonChange={e => setMessage( e.detail.value!)}></IonInput>
                <IonInput class='centerB' color="light" placeholder="Image URL" onIonChange={e => setImage(e.detail.value!)}></IonInput>                
                <IonSelect class='ion-select' interfaceOptions='my-custom-class' placeholder="Sever" onIonChange={e => setServer( e.detail.value)}>
                    <ServersContextConsumer>
                        {(context: Servers) => (
                            <IonList class='ion-list'>                                
                                {(context.servers)
                                    ? context.servers.map((c: Server) =>
                                        <IonSelectOption color="tertiary" value={c.URL}>{c.serverName}</IonSelectOption>)
                                    : {}}
                            </IonList>
                        )}
                    </ServersContextConsumer>                    
                </IonSelect>
                <IonButton class='centerB' color="tertiary" onClick={() => {
                    sendMessage(message, server, name, image);
                    //sendMessage("clearingAllCommands", contexts.server.URL, loginContext.login.name, loginContext.login.image);
                }}>
                Send</IonButton>

            </IonContent>
        </IonPage>
    );
};

export default SendSingleMessage;

//<IonInput placeholder="Server WebHook" onIonChange={e => server = e.detail.value!}></IonInput>

/*<ActiveServerContextConsumer>
                    {(activeContexts: ActiveServer) =>
                    <CommandsContextConsumer>
                    {(context: Commands) => (
                        <LoginContextConsumer>
                            {(loginContext: ActiveLogin) => (
                                <IonButton onClick={e => {
                                    context.commands ? context.commands.push({ prefix: prefix, response: reposnse }) :
                                        context.commands = [{ prefix: prefix, response: reposnse }]
                                    saveCommands(context.commands);


                                    sendMessage("created command " + prefix + " : " + reposnse, activeContexts.server.URL, loginContext.login.name, loginContext.login.image);

                                }
                                }>Send Message</IonButton>)}
                        </LoginContextConsumer>
                    )}

                </CommandsContextConsumer>}</ActiveServerContextConsumer>*/