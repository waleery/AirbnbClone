import { useAuth } from '@clerk/clerk-expo'
import { useSetAtom } from 'jotai'
import { useEffect } from 'react'

import { AuthorizedWhishlist, UnauthorizedTab } from '@/components'
import { wishlistEditMode } from '@/store'

const Page = () => {
  const { isSignedIn } = useAuth()

  const setEditMode = useSetAtom(wishlistEditMode)

  useEffect(() => {
    return () => {
      setEditMode(false)
    }
  }, [setEditMode])

  return (
    <>
      {isSignedIn ? (
        <AuthorizedWhishlist />
      ) : (
        <UnauthorizedTab
          title="Wishlist"
          firstText="Log in to view your wishlists"
          secondText="You can create, view, or edit wishlists once you've loged in."
        />
      )}
    </>
  )
}
export default Page
