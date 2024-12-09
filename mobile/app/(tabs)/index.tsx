import { Text, View } from '@/components/Themed'
import HomeHeader from '@/components/layout/home-header'
import { Link, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

type availableRoutes = 'chat' | 'calendar' | 'notes'

export default function TabOneScreen() {
  const menuItems = [
    { title: 'Notes', icon: '📝', route: 'notes' },
    { title: 'AI Chat', icon: '🤖', route: 'chat' },
    { title: 'Calendar', icon: '📅', route: 'calendar' },
  ]

  const router = useRouter()

  const handlePress = (route: availableRoutes) => {
    router.push(`/${route}`)
  }

  return (
    <SafeAreaView className='flex-1'>
      <StatusBar style='auto' />
      <View className='flex-1 p-4'>
        <HomeHeader />
        <View className='flex-1 flex-wrap justify-center'>
          {menuItems.map((item) => (
            <Pressable
              key={item.route}
              onPress={() => handlePress(item.route as availableRoutes)}
              className='w-40 h-40 m-2 bg-white border shadow-md'
            >
              <View className='items-center justify-center h-full'>
                <Text className='text-3xl mb-2'>{item.icon}</Text>
                <Text className='text-lg font-semibold text-gray-800'>
                  {item.title}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
      </View>
    </SafeAreaView>
  )
}
