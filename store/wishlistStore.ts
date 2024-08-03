import { atom, createStore } from "jotai";

const store = createStore()

export const wishlistEditMode = atom<boolean>(false)

export const toogleWishlistEditMode = () => {
    store.set(wishlistEditMode, !wishlistEditMode)
}
