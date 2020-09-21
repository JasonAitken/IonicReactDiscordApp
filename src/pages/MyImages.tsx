import React from 'react';
import {
    IonList, IonItem,  IonInput, IonItemSliding, 
    IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonThumbnail, IonImg, IonCard, IonButton,
} from '@ionic/react';
import './MyImages.css';
import { LoginContextConsumer, ActiveLogin, setLogin } from '../States/LoginState';
import { ImagesContextConsumer, Images, saveImages, setActiveImage } from '../States/ImagesState';

//const images: string[] = ['http://placekitten.com/g/200/300', 'https://www.theflavorbender.com/wp-content/uploads/2019/02/Homemade-Bread-Featured-1-500x500.jpg', 'https://gatherforbread.com/wp-content/uploads/2015/08/Easiest-Yeast-Bread.jpg'];

const MyImages: React.FC = () => {
    var prefixTRemove: string;
    var imageUrl: string;
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="dark">
                    <IonTitle color="tertiary">My Images</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent color="base" fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">My Images</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonInput color="light" placeholder="Image URL" onIonChange={e => imageUrl = e.detail.value!}></IonInput>
                <ImagesContextConsumer>
                    {(context: Images) => (
                        <IonButton color="tertiary" routerLink="/MyImages" routerDirection="forward" onClick={e => {
                            context.images ? context.images.push({ active: "medium", URL: imageUrl }) :
                                context.images = [{ active: "medium", URL: imageUrl }]
                            saveImages(context.images);
                        }
                        }>Add New Image</IonButton>
                    )}
                </ImagesContextConsumer>
                <ImagesContextConsumer>
                    {(imagesContext: Images) => (
                        <LoginContextConsumer>
                            {(context: ActiveLogin) => (
                                <IonList class = 'ion-list'>
                                    {imagesContext.images.map((image, i) => (
                                        <IonItemSliding key={i}>
                                            <IonCard  routerLink="/MyImages" routerDirection="forward" class='ion-card' button onClick={() => {
                                                
                                                setLogin({ name: context.login.name, image: image.URL });
                                                for (i = 0; i < imagesContext.images.length; i++) {
                                                    imagesContext.images[i].active = "medium";
                                                }
                                                image.active = "tertiary";
                                                setActiveImage(image);
                                                saveImages(imagesContext.images);
                                            }} >
                                                <IonItem color="dark" lines="none" >
                                                    <IonThumbnail class='thumbnail' >
                                                        <IonImg src={image.URL} />
                                                    </IonThumbnail>
                                                    <IonButton routerLink="/MyImages" routerDirection="forward" slot="end"  color="medium" onClick={() => {
                                                        var i = imagesContext.images.findIndex(o => o.active === image.active && o.URL === image.URL);
                                                        if (i > -1) imagesContext.images.splice(i, 1);
                                                        saveImages(imagesContext.images);
                                                    }}>Delete</IonButton>
                                                </IonItem>
                                                <script>if(image == context.login.image){}</script>
                                                <IonItem lines="none" color={image.active}>
                                                </IonItem>
                                                
                                            </IonCard>
                                            

                                        </IonItemSliding>
                                    ))}
                                </IonList>
                            )}</LoginContextConsumer>
                    )}</ImagesContextConsumer>
            </IonContent>
        </IonPage >
    );
};

export default MyImages;
