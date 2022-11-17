import { Alert } from 'react-native'

// Utils
export const p = console.log
export const e = console.error

// each message string will be displayed on a new line
export const showAlert = (title: string, messages?: string[]) => {
  const message = messages?.reduce((acc, s) =>
    s.length > 0 ? `${acc}\n${s}` : acc
  )
  Alert.alert(title, message, [{ text: 'OK' }])
}

export const prettyJSON = (obj: any) => JSON.stringify(obj, null, 2)
