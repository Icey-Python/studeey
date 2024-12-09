import React from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons } from '@expo/vector-icons'
import { dummyNotes } from '@/constants/data'

export default function NotesScreen() {
  return (
    <SafeAreaView className='flex-1 bg-gray-100'>
      <ScrollView className='p-4'>
        <TouchableOpacity className='flex-row items-center justify-center bg-blue-500 p-4 rounded-lg mb-4'>
          <MaterialIcons name='upload-file' size={24} color='white' />
          <Text className='text-white text-base font-semibold ml-2'>
            Upload New Note
          </Text>
        </TouchableOpacity>

        {dummyNotes.map((note, index) => (
          <View key={index} className='bg-white rounded-lg p-4 mb-4 shadow-sm'>
            <Text className='text-lg font-semibold mb-2'>{note.title}</Text>
            <Text className='text-gray-600 mb-3'>{note.summary}</Text>
            <View className='flex-row justify-between items-center'>
              <Text className='text-xs text-gray-400'>{note.date}</Text>
              <TouchableOpacity className='flex-row items-center'>
                <MaterialIcons name='share' size={20} color='#4A90E2' />
                <Text className='text-blue-500 ml-1'>Share</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}
