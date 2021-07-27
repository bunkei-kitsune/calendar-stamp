import moment from 'moment';
import React, {useState, Component}  from 'react';
import { StyleSheet,
         Text,
         View,
         Button,
         Dimensions, 
         Alert,
       } from 'react-native';
import { Calendar,
         LocaleConfig
        } from 'react-native-calendars';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';


//ストレージを使う準備
const storage = new Storage({
    storageBackend: AsyncStorage
});

//画面の幅を取得
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//データを保存する
const storeData = async(value) => {
  try {
    await AsyncStorage.setItem('@storage_Key', value)
  } catch (e) {
      // エラーを保存
  }
}




//CalenderScreenのコンポーネント作成
function CalendarScreen() {
  const navigation = useNavigation();
  //TodayからstoreDataに保存したデータを読み込む
  //できた！！なら印を表示する
  return (
    <Calendar
       monthFormat={'yyyy年 MM月'} 
       enableSwipeMonths={true}
    />
  );
}

//TodayScreenのコンポーネント作成
function TodayScreen() {
//今日の日付を取得する
  class Day extends React.Component{
    render(){
      this.now= new Date()
      this.today=`${this.now.getMonth()}月${this.now.getDate()}日`
      return(
        <Text style={{
            fontSize:20,
            lineHeight:90,
            letterSpacing:1,
            marginLeft: 'auto',
            marginRight: 'auto'}}>
            {this.today}
        </Text>
      )
    }
  }

  return (
    <View style={styles.container}>
      <Day/>
      <Text style={{fontSize:23,lineHeight:60,letterSpacing:1}}>
        今日の目標は達成できた？
      </Text>
      <Button
        title="できた！！"
        color={'#ACE176'}
        style={styles.buttonShape}
        //onPressイベントにメッセージの表示処理を設定する
        onPress={() =>
            Alert.alert(
                '素敵！！明日もその調子♪'
            )}
        //onPressイベントにデータの取得と保存処理を設定する

      />
      <Button
        title="できなかった…"
        color={'#76B1E1'}
        style={styles.buttonShape}
        //onPressイベントにメッセージの表示処理を設定する
        onPress={() => Alert.alert('そんな日もある！明日からまた頑張ろ！')}
　　　　　//onPressイベントにデータの取得と保存処理を設定する

      />
    </View>
  );
  }
  const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  date: {
    flex: 1,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  container: {
    flex: 2,
    paddingTop: 50,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  buttonShape:{
    borderRadius: 30,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 30,
  },
  calendarShape:{
    paddingTop:50
  }
});

//タブで２画面を表示させる
  export default function App() {
    return (
      <NavigationContainer>
        <View
          style={{flex: 0.5,backgroundColor: '#6ED4C8'}}>
        </View>
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: '#6ED4C8',
                inactiveTintColor: 'gray',
                labelStyle: {
                    fontSize:15,
                    margin:10
                }
            }}
        >
          <Tab.Screen name="Calendar" component={CalendarScreen} />
          <Tab.Screen name="Today" component={TodayScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }

//カレンダーの言語を日本語に変換
LocaleConfig.locales.jp = {
  monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  monthNamesShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  dayNames: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
  dayNamesShort: ['日', '月', '火', '水', '木', '金', '土'],
};
LocaleConfig.defaultLocale = 'jp';