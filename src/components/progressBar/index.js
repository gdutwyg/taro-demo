import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'
import music, { events } from '../../static/js/music'
import utils from '../../static/js/utils'
const dotWidth = 10

export default class ProgressBar extends Component {
  config = {}
  constructor() {
    super()
    this.state = {
      // 当前播放时间
      currentTime: 0,
      duration: 0,
      percentWidth: 0
    }
  }
  musicTimeUpdateFn = ({ currentTime, duration }) => {
    this.setState({
      currentTime,
      duration
    })
    this.moveSilde(currentTime / duration)
  }
  moveSilde(percent) {
    const query = this.refs.progressBar
    query.boundingClientRect().exec(res => {
      this.setState({
        percentWidth: (res[0].width - dotWidth) * percent
      })
    })
    // query.select('.progressBar').boundingClientRect()
    // query.selectViewport().scrollOffset()
    // query.exec(function(res) {
    //   console.log(res[0].clientWidth)
    // })
    // const offsetWidth = percent * (this.refs.progressBar.clientWidth - dotWidth)
    // this.refs.progressBarInner.style.width = `${offsetWidth}px`
  }
  componentDidMount() {
    this.moveSilde()
    // 监听播放进度
    events.on('musicTimeUpdate', this.musicTimeUpdateFn)
  }
  componentWillUnmount() {
    events.off('musicTimeUpdate', this.musicTimeUpdateFn)
  }
  render() {
    return (
      <View className="music-progress">
        <Text className="music-playing-time">
          {utils.formatMusicTime(this.state.currentTime)}
        </Text>
        <View class="music-progress-bar" ref="progressBar">
          <View class="music-progress-outer" />
          <View
            class="music-progress-inner"
            style={{ width: this.state.percentWidth + 'px' }}
          >
            <View class="music-progress-dot" />
          </View>
        </View>
        <Text class="music-all-time">
          {utils.formatMusicTime(this.state.duration)}
        </Text>
      </View>
    )
  }
}
