import { useAuth } from '@clerk/clerk-expo'

import { AuthorizedInbox, UnauthorizedTab } from '@/components'

const Page = () => {
  const { isSignedIn } = useAuth()

  return (
    <>
      {isSignedIn ? (
        <AuthorizedInbox />
      ) : (
        <UnauthorizedTab
          title="Inbox"
          firstText="Log in to see messages"
          secondText="Once you login, you'll find messages from hosts here."
        />
      )}
    </>
  )
}
export default Page
