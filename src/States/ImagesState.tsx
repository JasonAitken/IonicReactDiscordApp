import React, { createContext, useState, useEffect } from 'react';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

export interface Image {
    active: string;
    URL: string;
}

export interface Images {
    images: Image[];
}

export interface ActiveImage {
    image: Image;
}

export async function setActiveImage(i: Image) {
    await Storage.set({
        key: 'activeImage',
        value: JSON.stringify(i)
    });
}

export async function saveImages(cs: Image[]) {
    await Storage.set({
        key: 'images',
        value: JSON.stringify(cs)
    });

}

let ImagesContext = createContext({} as Images);

//let CommandsContextProvider = CommandsContext.Provider;

function ImagesContextProvider(props: { children: React.ReactNode; }) {

    const [initialImages, setInitialImages] = useState([] as Image[]);

    useEffect(() => {
        Promise.resolve(Storage.get({ key: 'images' }).then(
            (result) => {
                if (typeof result.value === 'string') {
                    setInitialImages(JSON.parse(result.value) as Image[]);
                }
            },
            (reason) => console.log("Failed to load Images from storage because of: " + reason)
        ));
    }, []); // Nifty trick with useEffect from: https://css-tricks.com/run-useeffect-only-once/

    return (
        <ImagesContext.Provider value={{ images: initialImages }}>{props.children}</ImagesContext.Provider>
    )
}

let ActiveImageContext = createContext({} as ActiveImage);

function ActiveImageContextProvider(props: { children: React.ReactNode; }) {

    const [initialActiveImage, setInitialActiveImage] = useState({
        active: "success",
        URL: "https://www.theflavorbender.com/wp-content/uploads/2019/02/Homemade-Bread-Featured-1-500x500.jpg"
    } as Image);

    useEffect(() => {
        Promise.resolve(Storage.get({ key: 'active' }).then(
            (result) => {
                if (typeof result.value === 'string') {
                    setInitialActiveImage(JSON.parse(result.value) as Image);
                }
            },
            (reason) => console.log("Failed to load active Image from storage because of: " + reason)
        ));
    }, []); // Nifty trick with useEffect from: https://css-tricks.com/run-useeffect-only-once/

    return (
        <ActiveImageContext.Provider value={{ image: initialActiveImage }}>{props.children}</ActiveImageContext.Provider>
    )
}

let ImagesContextConsumer = ImagesContext.Consumer;

let ActiveImageContextConsumer = ActiveImageContext.Consumer;

export { ImagesContext, ImagesContextConsumer, ImagesContextProvider, ActiveImageContext, ActiveImageContextConsumer, ActiveImageContextProvider }