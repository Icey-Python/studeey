import React, { useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons } from '@expo/vector-icons'
import { dummyChatMessages } from '@/constants/data'

export default function ChatScreen() {
  const [message, setMessage] = useState('')

  return (
    <SafeAreaView className='flex-1 bg-gray-100'>
      <ScrollView className='flex-1 p-4'>
        {dummyChatMessages.map((msg, index) => (
          <View
            key={index}
            className={`max-w-[80%] p-3 rounded-2xl mb-2 ${
              msg.isBot ? 'bg-white self-start' : 'bg-blue-500 self-end'
            }`}
          >
            <Text className={msg.isBot ? 'text-gray-800' : 'text-white'}>
              {msg.text}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View className='flex-row p-4 bg-white border-t border-gray-200'>
        <TextInput
          className='flex-1 bg-gray-100 rounded-full px-4 py-2 mr-2'
          value={message}
          onChangeText={setMessage}
          placeholder='Type your message...'
          placeholderTextColor='#999'
        />
        <TouchableOpacity className='w-10 h-10 bg-blue-500 rounded-full items-center justify-center'>
          <MaterialIcons name='send' size={24} color='white' />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
