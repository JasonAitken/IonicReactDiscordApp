import React, { useState } from 'react';
import {
    IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton,
    IonPopover, IonInput, IonText, IonImg
} from '@ionic/react';
import './HomePage.css';
import { LoginContextConsumer, ActiveLogin, setLogin } from '../States/LoginState';



const HomePage: React.FC = () => {

    const [showPopover, setShowPopover] = useState(false);
    //let name: string;
    const [name, setName] = useState("");
    return (
        <IonPage>
            <IonContent color="base" fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Home Page</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <LoginContextConsumer>
                    {(context: ActiveLogin) => (
                        <IonPopover
                            isOpen={showPopover}
                            cssClass='my-custom-class'
                            onDidDismiss={e => setShowPopover(false)}>
                            <p ><IonText class='welcome' color="light" >Welcome {name}</IonText></p>
                            <IonButton color="tertiary" routerLink="/MyCommands" routerDirection="forward" expand="full" fill="clear" onClick={e => {
                                setShowPopover(false); localStorage.$reset();
                            }}>OK</IonButton>
                        </IonPopover>)
                    }</LoginContextConsumer>
                <IonImg class='image' src= "https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/91_Discord_logo_logos-512.png"></IonImg>
                <IonInput class='center' color="medium" placeholder="Name" onIonChange={e => setName(e.detail.value!)}> </IonInput>

                <LoginContextConsumer>
                    {(context: ActiveLogin) => (

                        <IonButton class='centerB' color="tertiary" onClick={e => {
                            setLogin({ name: name, image: context.login.image })
                            //localStorage.$reset();
                            setShowPopover(true)

                        }}>start</IonButton>
                    )
                    }</LoginContextConsumer>
            </IonContent>
        </IonPage>
    );
};

export default HomePage;
