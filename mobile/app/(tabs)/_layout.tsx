import React from 'react'
import { Tabs } from 'expo-router'
import Colors from '@/constants/Colors'
import { AntDesign } from '@expo/vector-icons'
import { useColorScheme } from '@/components/useColorScheme'
import { useClientOnlyValue } from '@/components/useClientOnlyValue'

export default function TabLayout() {
  const colorScheme = useColorScheme()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, false),
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <AntDesign name='home' size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='chat'
        options={{
          title: 'Chats',
          tabBarIcon: ({ color }) => (
            <AntDesign name='message1' size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='calendar'
        options={{
          title: 'Calendar',
          tabBarIcon: ({ color }) => (
            <AntDesign name='calendar' size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='notes'
        options={{
          title: 'Notes',
          tabBarIcon: ({ color }) => (
            <AntDesign name='book' size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  )
}
