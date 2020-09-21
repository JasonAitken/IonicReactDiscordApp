import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
    IonApp,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle, addCircle, mailUnreadSharp, send, server, images } from 'ionicons/icons';
import HomePage from './pages/HomePage';
import MyCommands from './pages/MyCommands';
import SendSingleMessage from './pages/SendSingleMessage';
import MyServers from './pages/MyServers';
import MyImages from './pages/MyImages';
//import State, { CommandsContext } from './State';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { CommandsContextProvider } from './States/CommandState';
import { ServersContextProvider, ActiveServerContextProvider } from './States/ServerState';
import { ImagesContextProvider, ActiveImageContextProvider } from './States/ImagesState';
import { LoginContextProvider } from './States/LoginState';

const App: React.FC = () => (
    <IonApp>
        <CommandsContextProvider>
            <ServersContextProvider>
                <ActiveServerContextProvider>
                    <LoginContextProvider>
                        <ImagesContextProvider>
                            <ActiveImageContextProvider>
                                <IonReactRouter>
                                    <IonTabs>
                                        <IonRouterOutlet>
                                            <Route path="/HomePage" component={HomePage} exact={true} />
                                            <Route path="/MyCommands" component={MyCommands} exact={true} />
                                            <Route path="/MyServers" component={MyServers} exact={true} />
                                            <Route path="/MyImages" component={MyImages} exact={true} />
                                            <Route path="/SendSingleMessage" component={SendSingleMessage} />
                                            <Route path="/" render={() => <Redirect to="/HomePage" />} exact={true} />
                                        </IonRouterOutlet>
                                        <IonTabBar color="dark" slot="bottom">
                                            
                                            <IonTabButton tab="MyCommands" href="/MyCommands">
                                                <IonIcon color="tertiary" icon={addCircle} />
                                                <IonLabel color="tertiary">My Commands</IonLabel>
                                            </IonTabButton>
                                            <IonTabButton tab="MyServers" href="/MyServers">
                                                <IonIcon color="tertiary" icon={server} />
                                                <IonLabel color="tertiary">My Servers</IonLabel>
                                            </IonTabButton>
                                            <IonTabButton tab="MyImages" href="/MyImages">
                                                <IonIcon color="tertiary" icon={images} />
                                                <IonLabel color="tertiary">My Images</IonLabel>
                                            </IonTabButton>
                                            <IonTabButton tab="SendSingleMessage" href="/SendSingleMessage">
                                                <IonIcon color="tertiary"icon={send} />
                                                <IonLabel color="tertiary">Send Message</IonLabel>
                                            </IonTabButton>
                                        </IonTabBar>
                                    </IonTabs>
                                </IonReactRouter>
                            </ActiveImageContextProvider>
                        </ImagesContextProvider>
                    </LoginContextProvider>
                </ActiveServerContextProvider>
            </ServersContextProvider>
        </CommandsContextProvider>
    </IonApp>
);

export default App;
/*<IonTabButton tab="HomePage" href="/HomePage">
                                                <IonIcon icon={ellipse} />
                                                <IonLabel>Home</IonLabel>
                                            </IonTabButton>*/