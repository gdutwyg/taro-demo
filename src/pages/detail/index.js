import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './index.scss'
// import img from '@static/imgs/demo.jpg'
export default class Detail extends Component {
  config = {
    navigationBarTitleText: '详情'
  }
  constructor() {
    super()
    this.state = {
      i: 0
    }
  }
  componentDidMount() {
    this.setState({
      i: this.$router.params.i
    })
  }
  render() {
    return (
      <View className="detail">
        {/* <Image src={img} /> */}
        <View>我是详情页面</View>
        <View>我是列表{this.state.i}点击的</View>
      </View>
    )
  }
}
