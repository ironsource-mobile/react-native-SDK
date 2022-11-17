import { StyleSheet } from 'react-native'
import { containerStyles } from '../styles'

export const spacing = StyleSheet.create({
  marginBottomMedium: {
    marginBottom: 24,
  },
})

export const sectionWrapper = StyleSheet.flatten([
  containerStyles.verticalStretchSpaceBetween,
  spacing.marginBottomMedium,
])
