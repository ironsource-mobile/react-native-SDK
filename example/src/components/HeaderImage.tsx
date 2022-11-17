import React from 'react'
import { View, Image, StyleSheet, Text } from 'react-native'

function HeaderImage() {
  return (
    <View style={styles.wrapper}>
      <Image
        source={require('../assets/images/iron_logo.png')}
        style={styles.image}
      />
      <Text style={styles.text}>for ReactNative</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: { padding: 8, marginBottom: 10 },
  image: { width: '100%', resizeMode: 'contain' },
  text: { position: 'absolute', bottom: 0, right: 8 },
})

export default HeaderImage
