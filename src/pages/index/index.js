import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }
  constructor() {
    super()
    this.state = {
      // listLen: [...Array.from({ length: 5 })]
      listLen: [...Array(5).keys()]
    }
  }
  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handleListClick (i) {
    // 跳转到目的页面，打开新页面
    Taro.navigateTo({
      url: `/pages/detail/index?i=${i + 1}`
    })

  }
  render () {
    return (
      this.state.listLen.map((item, i) => {
        return <View className="list-item" onClick={this.handleListClick.bind(this, i)}>我是列表{i + 1}</View>
      })
    )
  }
}
