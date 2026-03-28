import {create} from 'zustand';

const useMacbookStore = create ((set) =>({
    color: '#2e2c2e', //the default color of the MacBook model is set to a dark gray, which is a common color for MacBooks. This allows us to have a default state for the color, and we can easily update it when users interact with the features or other UI elements.
    setColor:(color) => set({color}), //the setColor function allows us to update the color in the Zustand store, which will then trigger a re-render of the MacBook model with the new color applied.

    scale: 0.08,//the default scale of the MacBook model is set to 0.08, which is a reasonable size for displaying the model in the 3D scene. This allows us to have a default state for the scale, and we can easily update it when users interact with the features or other UI elements.
    setScale: (scale) => set({scale}), //the setScale function allows us to update the scale in the Zustand store, which will then trigger a re-render of the MacBook model with the new scale applied.

    texture: '/videos/feature-1.mp4', //the default texture is set to the first video in the features section, which will be displayed on the MacBook screen when the app loads. This allows us to have a default state for the texture, and we can easily update it when users interact with the features.
    setTexture: (texture) => set({texture}), //the setTexture function allows us to update the texture in the Zustand store, which will then trigger a re-render of the MacBook model with the new texture applied to the screen.

    reset: () => set({ color: '#2e2c2e', scale: 0.08, texture: '/videos/feature-1.mp4'}), //the reset function allows us to reset all the properties in the Zustand store to their default values. This can be useful if we want to provide a way for users to revert any changes they made to the MacBook model back to the original state.
    }))


export default useMacbookStore;