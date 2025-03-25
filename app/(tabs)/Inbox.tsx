import { useAuth } from '@clerk/clerk-expo'

import AuthorizedInbox from '@/components/inbox/AuthorizedInbox'
import { UnauthorizedTab } from '@/components/inbox/UnauthorizedTab'

const Page = () => {
  const { isSignedIn } = useAuth()

  return (
    <>
      {isSignedIn ? (
        <AuthorizedInbox />
      ) : (
        <UnauthorizedTab
          title="Trips"
          firstText="No trips yet"
          secondText="When you're ready to plan your next trip, we're here to help"
        />
      )}
    </>
  )
}
export default Page
