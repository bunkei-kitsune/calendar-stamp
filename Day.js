//今日の日付を取得する
import React from 'react'
class Day extends React.Component{
    constructor(props) {
      super(props);
      this.state = {
      };
    }
  
    componentDidMount() {
      setInterval( () => {
        this.setState({
          current: new Date().toLocaleString(), // 現時刻
          year: new Date().getFullYear(), // 年
          month: new Date().getMonth()+1, // 月
          date: new Date().getDate(), // 日
        })
      })
    }
    render() {
      return (
        <View style={styles.container}>
            <Text style={styles.text}>
              {this.state.year}年
              {this.state.month}月
              {this.state.date}日 
            </Text>
        </View>
      );
    }
  }
export default Day;