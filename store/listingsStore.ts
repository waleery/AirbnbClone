import { atom } from 'jotai'

import listingsData from '@/assets/data/json/airbnb-listings.json'
import { guestsGroups } from '@/constants/guestsGroups'
import { GuestsGroup, Listing } from '@/types'

export const listingsAtom = atom<Listing[]>(listingsData as Listing[])

export const guestsIncludedFilterAtom = atom<number | null>(null)

export const daysStayFilterAtom = atom<number | null>(null)

export const groupsAtom = atom<GuestsGroup[]>(guestsGroups)
export const isfilteringAtom = atom<boolean>(false)

export const filteredListingsAtom = atom((get) => {
  const listings = get(listingsAtom)
  const isFiltering = get(isfilteringAtom)
  const guestsIncluded = get(guestsIncludedFilterAtom)
  const daysStay = get(daysStayFilterAtom)

  if (!isFiltering) {
    return listings
  }
  let filtered = listings

  if (guestsIncluded && guestsIncluded > 0) {
    filtered = filtered.filter((listing) => listing.guests_included >= guestsIncluded)
  }
  if (daysStay) {
    return filtered.filter(
      (listing) => listing.minimum_nights <= daysStay && listing.maximum_nights >= daysStay
    )
  }
  return filtered
})
