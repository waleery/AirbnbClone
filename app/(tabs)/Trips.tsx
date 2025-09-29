import { useAuth } from '@clerk/clerk-expo'

import { AuthorizedTrips, UnauthorizedTab } from '@/components'

const Page = () => {
  const { isSignedIn } = useAuth()

  return (
    <>
      {isSignedIn ? (
        <AuthorizedTrips />
      ) : (
        <UnauthorizedTab
          title="Trips"
          firstText="No trips yet"
          secondText="When you're ready to plan your next trip, we'rehere to help."
        />
      )}
    </>
  )
}
export default Page
