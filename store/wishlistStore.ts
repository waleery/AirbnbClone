import { atom, createStore } from "jotai";

const store = createStore()

export const wishlistEditMode = atom<boolean>(false)

