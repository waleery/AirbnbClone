// atoms.js
import { Listing } from '@/types/listing';
import { atom } from 'jotai';
import listingsData from "@/assets/data/airbnb-listings.json";

export const listingsAtom = atom<Listing[]>(listingsData as Listing[]);
