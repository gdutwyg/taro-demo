import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'
import music, { events } from '../../static/js/music'
const dotWidth = 10

export default class ProgressBar extends Component {
  config = {}
  constructor() {
    super()
    this.state = {
      curMusic: null
    }
  }
  componentWillMount() {}
  render() {
    return (
      <View className="music-progress">
        <Text className="music-playing-time">{formatCurTime}</Text>
        <View class="music-progress-bar" ref="progressBar">
          <View class="music-progress-outer" />
          <View class="music-progress-inner" ref="progressBarInner">
            <View class="music-progress-dot" />
          </View>
        </View>
        <Text class="music-all-time">{curMusic.musicTime}</Text>
      </View>
    )
  }
}
