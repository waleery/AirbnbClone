import { StyleSheet } from 'react-native'
import colors from './Colors'
import Colors from './Colors'

export const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFFFF',
  },
  flex: {
    flex: 1,
  },
  mediumGap: {
    gap: 5,
  },
  inputField: {
    height: 44,
    borderWidth: 1,
    borderColor: '#ABABAB',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
  },
  btn: {
    backgroundColor: colors.primary,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
  },
  btnOutline: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: colors.grey,
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  btnOutlineText: {
    color: '#000',
    fontSize: 16,
  },
  btnIcon: {
    position: 'absolute',
    left: 16,
  },
  boldText: {
    fontWeight: '600',
  },
  thinText: {
    fontWeight: '300',
  },
  biggerText: {
    fontSize: 16,
  },
  footer: {
    position: 'absolute',
    height: 100,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopColor: colors.grey,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  center: {
    justifyContent: 'center',
  },
  white: {
    color: Colors.white,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    margin: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    gap: 14,
  },
  cardPreview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  previewText: {
    fontWeight: '500',
    fontSize: 14,
    color: Colors.grey,
  },
  previewDate: {
    fontSize: 14,
    fontWeight: '500',
  },
  cardHeader:{
    fontSize: 24,
    padding: 20,
    fontWeight: '500',
  },  
  pX2:{
    paddingHorizontal:20
  },
  safeArea: {
    backgroundColor: '#fff',
  },
})
