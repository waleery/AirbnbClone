import { View, Text, StyleSheet, Touchable } from "react-native"
import { BlurView } from "expo-blur"
import Animated, { SlideInDown } from "react-native-reanimated"
import { defaultStyles } from "@/constants/Styles"
import { useRouter } from "expo-router"
import { TouchableOpacity } from "react-native-gesture-handler"
import { Ionicons } from "@expo/vector-icons"
import { useState } from "react"
import Colors from "@/constants/Colors"

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)

const Page = () => {
  const router = useRouter()

  const [openCard, setOpenCard] = useState(0)
  const [selectedPlace, setSelectedPalce] = useState(0)

  const onClearAll = () => {
    setSelectedPalce(0)
    setOpenCard(0)
  }
  return (
    <BlurView intensity={70} style={styles.container} tint="light">

      {/* Where */}
      <View style={styles.card}>
        {openCard != 0 && (
          <AnimatedTouchableOpacity onPress={() => setOpenCard(0)}>
            <Text style={styles.previewText}>Where</Text>
            <Text style={styles.previewDate}>I'm flexible</Text>
          </AnimatedTouchableOpacity>
        )}
      </View>

      {/* When */}
      <View style={styles.card}>
        {openCard != 1 && (
          <AnimatedTouchableOpacity onPress={() => setOpenCard(1)}>
            <Text style={styles.previewText}>When</Text>
            <Text style={styles.previewDate}>Any week</Text>
          </AnimatedTouchableOpacity>
        )}
      </View>

      {/* Who */}
      <View style={styles.card}>
        {openCard != 2 && (
          <AnimatedTouchableOpacity onPress={() => setOpenCard(2)}>
            <Text style={styles.previewText}>Who</Text>
            <Text style={styles.previewDate}>Add guests</Text>
          </AnimatedTouchableOpacity>
        )}
      </View>
      <Animated.View style={defaultStyles.footer} entering={SlideInDown.delay(200)}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={onClearAll} style={{ justifyContent: "center" }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "500",
                textDecorationLine: "underline",
              }}
            >
              Clear all
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={router.back}
            style={[defaultStyles.btn, { paddingRight: 20, paddingLeft: 50 }]}
          >
            <Ionicons
              name="search-outline"
              size={24}
              color={"#fff"}
              style={defaultStyles.btnIcon}
            />
            <Text style={[defaultStyles.btnText, { fontWeight: "500" }]}>Search</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </BlurView>
  )
}
export default Page
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    margin: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    gap: 14,
  },
  previewText: {
    fontWeight: "500",
    fontSize: 14,
    color: Colors.grey,
  },
  previewDate: {
    fontWeight: "500",
    fontSize: 14,
    color: Colors.dark,
  },
})
