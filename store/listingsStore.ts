// atoms.js
import { Listing } from '@/types/listing';
import { atom } from 'jotai';
import listingsData from "@/assets/data/airbnb-listings.json";

export const listingsAtom = atom<Listing[]>(listingsData as Listing[]);

// Atom do przechowywania filtra guests_included
export const guestsIncludedFilterAtom = atom<number>(1);

export const filteredListingsAtom = atom((get) => {
    const listings = get(listingsAtom);
    const guestsIncluded = get(guestsIncludedFilterAtom);
    return listings.filter(listing => listing.guests_included >= guestsIncluded);
  });