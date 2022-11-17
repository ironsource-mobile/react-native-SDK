import React from 'react'
import {
  View,
  TouchableHighlight,
  Text,
  GestureResponderEvent,
  StyleSheet,
} from 'react-native'

const disabledColors = {
  button: '#808080',
  text: '#fff',
}

interface HighlightButtonProps {
  onPress?: (event: GestureResponderEvent) => void
  buttonText: string
  buttonColor?: string
  textColor?: string
  isDisabled?: boolean
}

function HighlightButton({
  onPress,
  buttonText,
  buttonColor,
  textColor,
  isDisabled,
}: HighlightButtonProps) {
  const disabled = isDisabled === true // explicit true
  const styles = StyleSheet.create({
    touchableHighlightStyle: {
      flex: 1,
      borderColor: 'transparent',
      borderRadius: 10,
      margin: 5,
    },
    textWrapperStyle: {
      backgroundColor: disabled
        ? disabledColors.button
        : buttonColor || '#2196f3',
      borderWidth: 0,
      borderRadius: 3,
      padding: 10,
      flex: 1,
    },
    textStyle: {
      color: disabled ? disabledColors.text : textColor || 'white',
      fontWeight: 'bold',
      fontSize: 14,
      textAlign: 'center',
    },
  })

  return (
    <TouchableHighlight
      onPress={onPress}
      underlayColor="#fff"
      activeOpacity={0.5}
      disabled={disabled}
      style={styles.touchableHighlightStyle}
    >
      <View style={styles.textWrapperStyle}>
        <Text style={styles.textStyle}>{buttonText}</Text>
      </View>
    </TouchableHighlight>
  )
}

export default HighlightButton
