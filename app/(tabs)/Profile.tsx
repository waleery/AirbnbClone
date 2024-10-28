import { useAuth } from '@clerk/clerk-expo'

import { AuthorizedProfile, UnauthorizedProfile } from '@/components'

const Page = () => {
  const { isSignedIn } = useAuth()

  return <>{isSignedIn ? <AuthorizedProfile /> : <UnauthorizedProfile />}</>
}
export default Page
