import { Text, View } from '@/components/Themed'
import HomeHeader from '@/components/layout/home-header'
import SearchInput from '@/components/layout/search-input'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Link, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { FlatList, Pressable, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { dummyNotes } from '@/constants/data'
import { MaterialIcons } from '@expo/vector-icons'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

type availableRoutes = 'chat' | 'calendar' | 'notes'

const menuItems = [
  { title: 'All' },
  { title: 'Physics' },
  { title: 'Science' },
  { title: 'Maths' },
  { title: 'Chemistry' },
  { title: 'Biology' },
]

export default function TabOneScreen() {
  const [selectedTag, setSelectedTag] = useState('All')
  const [value, setValue] = useState('All')
  const router = useRouter()

  const handlePress = (route: availableRoutes) => {
    router.push(`/${route}`)
  }

  return (
    <SafeAreaView className='flex-1'>
      <StatusBar style='auto' />
      <View className='p-4'>
        <HomeHeader />
        <SearchInput />
      </View>
      <Tabs
        value={value}
        onValueChange={setValue}
        className='w-full  mx-auto flex-col gap-1.5'
      >
        <TabsList
          style={{ backgroundColor: '#fff' }}
          className='flex-row w-full'
        >
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className='flex-row gap-2 space-x-2'>
              {menuItems.map((item) => (
                <TabsTrigger
                  value={item.title}
                  key={item.title}
                  onPress={() => {
                    setSelectedTag(item.title)
                    console.log(item.title)
                  }}
                  className={cn(
                    `px-4 py-2 rounded-full ${
                      selectedTag === item.title ? 'bg-blue-500' : 'bg-gray-200'
                    }`,
                  )}
                >
                  <Text className={cn(`text-sm font-semibold`)}>
                    {item.title}
                  </Text>
                </TabsTrigger>
              ))}
            </View>
          </ScrollView>
        </TabsList>
        <TabsContent value='All' className='mb-20'>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={dummyNotes}
            keyExtractor={(item) => item.title}
            renderItem={({ item, index }) => (
              <View className='p-4 bg-white rounded-lg mb-4 shadow-sm'>
                <Text className='text-lg font-semibold mb-2'>{item.title}</Text>
                <Text className='text-gray-600 mb-3'>{item.summary}</Text>
                <View className='flex-row justify-between items-center'>
                  <Text className='text-xs text-gray-400'>{item.date}</Text>
                  <Button className='flex-row items-center'>
                    <MaterialIcons name='share' size={20} color='#4A90E2' />
                    <Text className='text-blue-500 ml-1'>Share</Text>
                  </Button>
                </View>
              </View>
            )}
          />
        </TabsContent>
        <TabsContent value='physics'></TabsContent>
      </Tabs>
    </SafeAreaView>
  )
}
