import moment from 'moment';
import React, {useState, Component}  from 'react';
import { StyleSheet, Text, View, Button ,TouchableOpacity } from 'react-native';
import { Calendar, DateObject, LocaleConfig } from 'react-native-calendars';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//CalenderScreenのコンポーネント作成
function CalendarScreen() {
  const navigation = useNavigation();

  return (
    <Calendar
       monthFormat={'yyyy年 MM月'} 
       enableSwipeMonths={true}
    />
  );
}

//TodayScreenのコンポーネント作成
function TodayScreen() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Text>Today</Text>
    </View>
    
  );
  }

//PushThisButtonのコンポーネント作成
function PushThisButton() {
  <View>
  <Text style={styles.title}>
    今日の目標は達成できた？
  </Text>
  <Button
    title="できた！！"
    onPress={() => Alert.alert('Simple Button pressed')}
  />
  <Button
    title="できなかった…"
    onPress={() => Alert.alert('Simple Button pressed')}
  />
</View>
}



  const Tab = createBottomTabNavigator();

  export default function App() {
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Calendar" component={CalendarScreen} />
          <Tab.Screen name="Today" component={TodayScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }

//カレンダーの日付の色を変える
const dayTextStyle = (date: DateObject, currentDate: moment.Moment) =>
  StyleSheet.create({
    dayText: {
      fontSize: 20,
      backgroundColor: date.dateString === moment().format('YYYY-MM-DD') ? '#CCCCCC' : 'transparent',
      color: date.month !== currentDate.month() + 1 ? 'gray' :  moment(date.dateString).days() === 0 ? 'red' : moment(date.dateString).days() === 6 ? 'blue' : 'black',
    },
  });

//カレンダーの言語を日本語に変換
LocaleConfig.locales.jp = {
  monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  monthNamesShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  dayNames: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
  dayNamesShort: ['日', '月', '火', '水', '木', '金', '土'],
};
LocaleConfig.defaultLocale = 'jp';