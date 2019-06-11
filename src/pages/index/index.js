import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount () { }

  componentDidMount () {
    console.log(Taro.showToast)
    Taro.showToast({
      title: 'abc',
      duration: 4000
    })
    setTimeout(() => {
      Taro.showLoading();  //显示abc
    }, 4000)
  }

  componentWillUnmount () { }

  componentDidShow () {
    console.log('componentDidShow', this)
  }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <Text>你好</Text>
      </View>
    )
  }
}
