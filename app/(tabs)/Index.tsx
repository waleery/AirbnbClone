import { Link } from 'expo-router'
import { View, Text } from 'react-native'

const Page = () => {
  return (
    <View>
      <Link href={'/(modals)/booking'}>Booking</Link>
      <Link href={'/(modals)/login'}>Login</Link>
      <Link href={'/listing/123'}>Listing details</Link>
    </View>
  )
}
export default Page