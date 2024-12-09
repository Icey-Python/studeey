import { View, Text } from 'react-native'
import { Input } from '../ui/input'
import { useState } from 'react'
import { Label } from '../ui/label'
import { Search } from 'lucide-react-native'
import { FontAwesome } from '@expo/vector-icons'

export default function SearchInput() {
  const [value, setValue] = useState('')

  const onChangeText = (text: string) => {
    setValue(text)
    console.log(text)
  }
  return (
    <View className='flex flex-row items-center gap-2 mt-6 w-full'>
      <FontAwesome name='search' size={18} color='gray' />
      <Input
        placeholder='Search...'
        className='p-2 flex flex-1 rounded-2xl border border-gray-300 bg-gray-100'
        value={value}
        onChangeText={onChangeText}
        aria-labelledby='inputLabel'
        aria-errormessage='inputError'
      />
    </View>
  )
}
