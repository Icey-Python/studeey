import React, { useEffect } from 'react'
import * as Calendar from 'expo-calendar'
import { dummyEvents } from '@/constants/data'
import { MaterialIcons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  Button,
  StyleSheet,
} from 'react-native'

export default function CalendarScreen() {
  useEffect(() => {
    ;(async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync()
      if (status === 'granted') {
        const calendars = await Calendar.getCalendarsAsync(
          Calendar.EntityTypes.EVENT,
        )
        console.log('Here are all your calendars:')
        console.log({ calendars })
      }
    })()
  }, [])
  return (
    <SafeAreaView className='flex-1 bg-gray-100'>
      <Button title='Create a new calendar' onPress={createCalendar} />

      <ScrollView className='flex-1 p-4'>
        {dummyEvents.map((event, index) => (
          <View key={index} className='bg-white rounded-lg p-4 mb-4 shadow-sm'>
            <View className='flex-row justify-between items-center mb-2'>
              <Text className='text-lg font-semibold'>{event.title}</Text>
              <Text className='text-blue-500'>{event.time}</Text>
            </View>
            <Text className='text-gray-600 mb-1'>{event.date}</Text>
            <Text className='text-gray-400'>{event.location}</Text>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity className='flex-row items-center justify-center bg-blue-500 p-4 mx-4 mb-4 rounded-lg'>
        <MaterialIcons name='add' size={24} color='white' />
        <Text className='text-white text-base font-semibold ml-2'>
          Add New Event
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

async function getDefaultCalendarSource() {
  const defaultCalendar = await Calendar.getDefaultCalendarAsync()
  return defaultCalendar.source
}

async function createCalendar() {
  const defaultCalendarSource =
    Platform.OS === 'ios'
      ? await getDefaultCalendarSource()
      : { isLocalAccount: true, name: 'Expo Calendar' }
  const newCalendarID = await Calendar.createCalendarAsync({
    title: 'Expo Calendar',
    color: 'blue',
    entityType: Calendar.EntityTypes.EVENT,
    sourceId: defaultCalendarSource.name,
    name: 'internalCalendarName',
    ownerAccount: 'personal',
    accessLevel: Calendar.CalendarAccessLevel.OWNER,
  })
  console.log(`Your new calendar ID is: ${newCalendarID}`)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
})
