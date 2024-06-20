// atoms.js
import { Listing } from '@/types/listing'
import { atom } from 'jotai'
import listingsData from '@/assets/data/airbnb-listings.json'

export const listingsAtom = atom<Listing[]>(listingsData as Listing[])

// Atom do przechowywania filtra guests_included
export const guestsIncludedFilterAtom = atom<number | null>(null)

export const daysStayFilterAtom = atom<number | null>(null)

export const filteredListingsAtom = atom((get) => {
  const listings = get(listingsAtom)
  const guestsIncluded = get(guestsIncludedFilterAtom)
  const daysStay = get(daysStayFilterAtom)

  let filtered = listings

  if (guestsIncluded && guestsIncluded > 0) {
    filtered = filtered.filter((listing) => listing.guests_included >= guestsIncluded)
  }
  if (daysStay) {
    return filtered.filter(
      (listing) => listing.minimum_nights <= daysStay && listing.maximum_nights >= daysStay
    )
  } else {
    return filtered
  }
})
