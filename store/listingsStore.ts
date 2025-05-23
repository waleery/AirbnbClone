import { atom } from 'jotai'

import listingsData from '@/assets/data/json/airbnb-listings.json'
import { guestsGroups } from '@/constants'
import { GuestsGroup, Listing } from '@/types'

export const listingsAtom = atom<Listing[]>(listingsData as Listing[])

export const guestsIncludedFilterAtom = atom<number | null>(null)

export const daysStayFilterAtom = atom<number | null>(null)

export const groupsAtom = atom<GuestsGroup[]>(guestsGroups)
export const isFilteringAtom = atom<boolean>(false)

export const filteredListingsAtom = atom((get) => {
  const listings = get(listingsAtom)
  const isFiltering = get(isFilteringAtom)
  const guestsIncluded = get(guestsIncludedFilterAtom)
  const daysStay = get(daysStayFilterAtom)

  if (!isFiltering) {
    return listings
  }
  let filteredList = listings

  if (guestsIncluded && guestsIncluded > 0) {
    filteredList = filteredList.filter((listing) => listing.guests_included >= guestsIncluded)
  }
  if (daysStay) {
    filteredList = filteredList.filter(
      (listing) => listing.minimum_nights <= daysStay && listing.maximum_nights >= daysStay
    )
  }
  return filteredList
})
