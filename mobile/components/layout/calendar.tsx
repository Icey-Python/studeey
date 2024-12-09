import BottomSheet from '@gorhom/bottom-sheet'
import { Calendar } from '@marceloterreiro/flash-calendar'
import { FlashList } from '@shopify/flash-list'
import React, { useCallback, useMemo, useRef } from 'react'
import { Platform, StyleSheet, View } from 'react-native'
import BottomSheetFlashList from './bottom-sheet-flash'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

/**
 * iOS works fine with default flash list. Is better to keep it
 * since it's more performant.
 */
const SafeFlashList = Platform.select({
  android: FlashList,
  ios: FlashList,
})

export const BottomSheetCalendar = () => {
  const bottomSheetRef = useRef<BottomSheet>(null)
  const snapPoints = useMemo(() => ['25%', '50%'], [])

  return (
    <GestureHandlerRootView>
      <View>
        <BottomSheet index={1} ref={bottomSheetRef} snapPoints={snapPoints}>
          <View>
            <Calendar.List
              CalendarScrollComponent={SafeFlashList}
              calendarInitialMonthId='2024-02-01'
              onCalendarDayPress={(dateId) => console.log(`Pressed ${dateId}`)}
            />
          </View>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  )
}
