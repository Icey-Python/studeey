import { Image, Text, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import user from '@/assets/images/user.png'

export default function HomeHeader() {
  return (
    <View className='flex w-full  flex-row justify-between items-center'>
      <View className='flex flex-1 flex-row justify-start items-center gap-3'>
        <Image
          source={user}
          resizeMode='cover'
          className='w-10 h-10 rounded-full'
        />
        <View className='ml-2'>
          <Text className='text-lg font-bold'>Reese WitherSpoon</Text>
          <Text className='text-sm font-medium text-muted-foreground'>Student</Text>
        </View>
      </View>
      <View className='flex flex-row justify-end items-center'>
        <AntDesign name='setting' size={24} color='black' />
      </View>
    </View>
  )
}
