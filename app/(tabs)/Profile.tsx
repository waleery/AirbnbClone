import { useAuth } from '@clerk/clerk-expo'

import { AuthorizedProfile } from '@/components/AuthorizedProfile'
import UnauthorizedProfile from '@/components/UnauthorizedProfile'

const Page = () => {
  const { isSignedIn } = useAuth()

  return <>{isSignedIn ? <AuthorizedProfile /> : <UnauthorizedProfile />}</>
}
export default Page
