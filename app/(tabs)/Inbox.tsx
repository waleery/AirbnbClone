import { useAuth } from '@clerk/clerk-expo'

import AuthorizedInbox from "@/components/inbox/AuthorizedInbox";

const Page = () => {
	const { isSignedIn } = useAuth()

	return <> {isSignedIn ? <AuthorizedInbox /> : null}</>
};
export default Page;
