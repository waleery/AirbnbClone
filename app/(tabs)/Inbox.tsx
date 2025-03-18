import { useAuth } from '@clerk/clerk-expo'

import AuthorizedInbox from "@/components/inbox/AuthorizedInbox";
import UnauthorizedInbox from '@/components/inbox/UnauthorizedInbox';

const Page = () => {
	const { isSignedIn } = useAuth()

	return <> {isSignedIn ? <AuthorizedInbox /> : <UnauthorizedInbox/> }</>
};
export default Page;
