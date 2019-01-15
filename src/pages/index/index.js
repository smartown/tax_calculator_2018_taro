import Taro, { Component } from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'
import EditItem from '../../components/EditItem'
import './index.css'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <View className='container'>
        <View style={{ flex:1, padding: 16, overflow: "scroll" }}>
          <EditItem ></EditItem>
          <EditItem ></EditItem>
          <EditItem ></EditItem>
          <EditItem ></EditItem>
          <EditItem ></EditItem>
          <EditItem ></EditItem>
          <EditItem ></EditItem>
          <EditItem ></EditItem>
          <EditItem ></EditItem>
          <EditItem ></EditItem>
          <EditItem ></EditItem>
          <EditItem ></EditItem>
          <EditItem ></EditItem>
          <EditItem ></EditItem>
          <EditItem ></EditItem>
          <EditItem ></EditItem>
          <EditItem ></EditItem>
          <EditItem ></EditItem>
          <EditItem ></EditItem>
          <EditItem ></EditItem>
        </View>
      </View>
    )
  }
}

