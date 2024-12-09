import { View, Text } from 'react-native'
import * as DocumentPicker from 'expo-document-picker'
import { Button } from '../ui/button'

const pickDocument = async () => {
  const result = await DocumentPicker.getDocumentAsync({})
  if (result.canceled) {
    alert('You did not select any file')
  }
  if (!result.canceled) {
    alert(result.assets[0].uri)
  }
}
export default function UploadPdf() {
  return (
    <View className='flex-1 bg-gray-900'>
      <Button className='bg-transparent p-2 rounded' onPress={pickDocument}>
          <Text className='text-white text-base font-semibold ml-2'>
            Upload New Note
          </Text>
      </Button>
    </View>
  )
}
