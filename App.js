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
import AsyncStorage from '@react-native-community/async-storage';

//画面の幅を取得
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//データを保存する
const storage = new Storage({
  // 最大容量
  size: 1000,
  // バックエンドにAsyncStoragnpm install @ react-native-async-storage / async-storage eを使う
  storageBackend: AsyncStorage,
  // キャッシュ期限(null=期限なし)
  defaultExpires: null,
  // メモリにキャッシュするかどうか
  enableCache: true,
});

//キーのみで何かを保存（キー名のみを使用し、IDは使用しません）
//このキーは一意である必要がある。頻繁に使用するデータ用。
//キーと値のペアは、自分で削除しない限り、永続的に保存される。
storage.save({
  key: 'result',
  data: {
    day: `
    ${this.state.year}年
    ${this.state.month}月
    ${this.state.date}日 `,
    result: 'some userid',
    expires: null
  }
});


//CalenderScreenのコンポーネント作成
function CalendarScreen() {
  const navigation = useNavigation();
  //Todayからstrageに保存したデータを読み込む
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
      this.today=`${this.now.getMonth()}月${this.now.getDate()}日${this.now.getDay()}曜日`
      return(
        <Text>{this.today}</Text>
      )
    }
  }

  return (
    <View style={styles.container}>
      <Day style={styles.date}/>
      <Text>
        今日の目標は達成できた？
      </Text>
      <Button
        title="できた！！"
        value='good'
        style={styles.buttonShape}
        //onPressイベントにメッセージの表示処理を設定する
        onPress={() => Alert.alert('素敵！！明日もその調子♪')}
        //onPressイベントにデータの取得と保存処理を設定する
        onPress={() => storage.save}
      />
      <Button
        title="できなかった…"
        value='bad'
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
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: 40
  },
  container: {
    paddingTop: 50,
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: 30
  },
  buttonShape:{
    borderRadius: 30,
    fontSize: 30,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 30,
    },
  calendarShape:{
    padding:50
  }
});

//タブで２画面を表示させる
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

//カレンダーの言語を日本語に変換
LocaleConfig.locales.jp = {
  monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  monthNamesShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  dayNames: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
  dayNamesShort: ['日', '月', '火', '水', '木', '金', '土'],
};
LocaleConfig.defaultLocale = 'jp';