import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'
import music, { events } from '../../static/js/music'
export default class Detail extends Component {
  config = {
    navigationBarTitleText: '音乐详情页'
  }
  constructor() {
    super()
    this.state = {
      // 当前播放时间
      currentTime: 0,
      playList: [],
      curIndex: -1,
      isPlaying: false,
      curMusic: null,
      duration: 0
    }
  }
  prevMusic() {
    music.playMuisc(this.state.curIndex - 1)
  }
  nextMusic() {
    music.playMuisc(this.state.curIndex + 1)
  }
  togglePlaying(e) {
    music.togglePlaying()
  }
  goBack() {
    Taro.navigateBack({ delta: 2 })
  }
  togglePlayingFn = ({ isPlaying, curIndex }) => {
    this.setState({
      isPlaying,
      curIndex,
      curMusic: this.state.playList[curIndex]
    })
  }
  musicTimeUpdateFn = ({ currentTime, duration }) => {
    console.log(currentTime, duration)
  }
  componentWillMount() {
    this.setState({
      playList: music.playList,
      curIndex: music.curIndex,
      isPlaying: music.isPlaying,
      curMusic: music.playList[music.curIndex]
    })
    // 监听是否在播放
    events.on('togglePlaying', this.togglePlayingFn)
    events.on('musicTimeUpdate', this.musicTimeUpdateFn)
  }
  componentDidMount() {}
  componentWillUnmount() {
    events.off('togglePlaying', this.togglePlayingFn)
    events.off('musicTimeUpdate', this.musicTimeUpdateFn)
  }
  render() {
    return (
      <View className={`music-detail ${!this.state.isPlaying && 'pause'}`}>
        <View className="detail-header">
          <Text className="detail-header-back" onClick={this.goBack} />
          <View className="detail-header-info">
            <h1>{this.state.curMusic.name}</h1>
            <Text>{this.state.curMusic.singer}</Text>
          </View>
        </View>
        <View className="detail-cover">
          <View className="player-cd">
            <View className="player-needle" />
            <View className="player-cover-box">
              <View className="player-cover-bg" />
              <Image src={this.state.curMusic.picUrl} />
            </View>
          </View>
        </View>
        <View class="detail-player">
          {/* <progress-bar
        :currentTime="currentTime"
        :percent="percentMusic"
        @percentChange="changeProgress"
      ></progress-bar> */}
          <View class="music-controls">
            <View class="btn btn-mode" />
            <View class="btn btn-prev" onClick={this.prevMusic} />
            <View class="btn btn-play" onClick={this.togglePlaying} />
            <View class="btn btn-next" onClick={this.nextMusic} />
            <View class="btn btn-list" />
          </View>
        </View>
      </View>
    )
  }
}
