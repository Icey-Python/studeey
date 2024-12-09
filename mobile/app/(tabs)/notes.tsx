import React, { useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons } from '@expo/vector-icons'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import * as DocumentPicker from 'expo-document-picker'
import axios from 'axios'

const pickDocument = async () => {
  const result = await DocumentPicker.getDocumentAsync({})
  if (result.canceled) {
    alert('You did not select any file')
  }
  if (!result.canceled) {
    alert(result.assets[0].uri)
  }
}
export default function NotesScreen() {
  const [value, setValue] = useState('PDF')

  function onLabelPress(label: string) {
    return () => {
      setValue(label)
    }
  }
  return (
    <SafeAreaView className='flex-1 bg-gray-100'>
      <ScrollView className='p-4'>

        <Text className='text-lg font-bold'>Select the file format:</Text>
        <View className='flex-1 flex-row stify-center items-center py-2 mb-2'>
          <RadioGroup value={value} onValueChange={setValue} className='gap-3 flex-row'>
            <RadioGroupItemWithLabel
              value='PDF'
              onLabelPress={onLabelPress('pdf')}
            />
            <RadioGroupItemWithLabel
              value='Image'
              onLabelPress={onLabelPress('image')}
            />
            <RadioGroupItemWithLabel
              value='Text'
              onLabelPress={onLabelPress('text')}
            />
          </RadioGroup>
        </View>
        <TouchableOpacity
          onPress={pickDocument}
          className='flex-row h-32 items-center justify-center bg-blue-500 p-4 rounded-lg mb-4'
        >
          <MaterialIcons name='upload-file' size={24} color='white' />
          <Text className='text-white text-base font-semibold ml-2'>
            Upload New Note
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

function RadioGroupItemWithLabel({
  value,
  onLabelPress,
}: {
  value: string;
  onLabelPress: () => void;
}) {
  return (
    <View className={'flex-row gap-2 items-center'}>
      <RadioGroupItem aria-labelledby={`label-for-${value}`} value={value} />
      <Label nativeID={`label-for-${value}`} onPress={onLabelPress}>
      <Text className='text-sm font-semibold'>
        {value}
        </Text>
      </Label>
    </View>
  );
}
