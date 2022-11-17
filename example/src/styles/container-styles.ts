import { StyleSheet } from 'react-native'

// Reusable styles
export const containerStyles = StyleSheet.create({
  horizontalSpaceBetween: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  verticalStretchSpaceBetween: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
})
