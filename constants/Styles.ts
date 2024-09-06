import { StyleSheet } from 'react-native'

import Colors from './Colors'

export const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
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
    borderColor: Colors.grey,
    borderRadius: 8,
    padding: 10,
    backgroundColor: Colors.white,
  },
  btn: {
    backgroundColor: Colors.primary,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: Colors.white,
    fontSize: 16,
  },
  btnOutline: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.grey,
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  btnOutlineText: {
    color: Colors.black,
    fontSize: 16,
  },
  btnIcon: {
    position: 'absolute',
    left: 16,
  },
  boldText: {
    fontWeight: '600',
  },
  font500: {
    fontWeight: '500',
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
    backgroundColor: Colors.white,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopColor: Colors.grey,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  center: {
    justifyContent: 'center',
  },
  white: {
    color: Colors.white,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    margin: 10,
    elevation: 4,
    shadowColor: Colors.black,
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
  cardHeader: {
    fontSize: 24,
    padding: 20,
    fontWeight: '500',
  },
  pX2: {
    paddingHorizontal: 20,
  },
  pX5: {
    paddingHorizontal: 20,
  },
  pb1: {
    paddingBottom: 10,
  },
  pb2: {
    paddingBottom: 20,
  },
  safeArea: {
    backgroundColor: Colors.white,
  },
  textCenter: {
    textAlign: 'center',
  },
})
