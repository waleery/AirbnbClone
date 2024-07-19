import { defaultStyles } from '@/constants/Styles'
import { View, Text, StyleSheet } from 'react-native'
const Page = () => {
  return (
    <View style={defaultStyles.flex}>
      <View style={styles.container}>
        <Text style={styles.title}>Wishlist</Text>
      </View>
    </View>
  )
}
export default Page


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    //padding: 16,
    gap: 20,

    flex: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: '500',
    paddingTop:16,
    paddingHorizontal:16
  },
})