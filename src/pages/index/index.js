import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import utils from '../../static/js/utils'
import request from '../../static/js/request'
import music, { events } from '../../static/js/music'
import './index.scss'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '首页'
  }
  constructor() {
    super()
    this.state = {
      // 热歌榜
      currentTab: 'hot',
      tabList: [
        {
          name: '热歌榜',
          value: 'hot'
        },
        {
          name: '每日推荐',
          value: 'recommend'
        }
      ],
      playList: [],
      isPlaying: false,
      curIndex: -1,
      curMusic: null
    }
  }
  componentWillMount() {
    this.getMusicList()
    // 监听是否在播放
    events.on('togglePlaying', ({ isPlaying, curIndex }) => {
      this.setState({
        isPlaying,
        curIndex,
        curMusic: this.state.playList[curIndex]
      })
    })
    events.on('musicTimeUpdate', ({ currentTime, duration }) => {
      console.log(currentTime, duration)
    })
  }
  async getMusicList() {
    const data = await request.get({
      url: 'https://api.mtnhao.com/top/List',
      data: {
        idx: 1
      }
    })
    const playList = utils.formatPlayList(data.playlist.tracks)
    this.setState({
      playList
    })
    music.setPlayList(playList)
  }
  toggleTab(tab) {
    this.setState({
      currentTab: tab
    })
  }
  goPlay(i) {
    music.playMuisc(i)
  }
  togglePlaying(e) {
    // 阻止冒泡
    e.stopPropagation()
    music.togglePlaying()
  }
  // 点击mini播放器进入到详情
  turnDetail() {
    Taro.navigateTo({
      url: `/pages/detail/index`
    })
  }
  render() {
    return (
      <View className="music-box">
        <header class="music-header">
          <h1 class="music-header-title">简易音乐播放器</h1>
          {/* <div class="music-login-button">登录</div> */}
        </header>
        <View className="music-content">
          <View className="music-tab">
            {this.state.tabList.map((item, i) => {
              return (
                <View
                  taroKey={String(i)}
                  onClick={this.toggleTab.bind(this, item.value)}
                  className={this.currentTab === item.value && 'active-tab'}
                >
                  {item.name}
                </View>
              )
            })}
          </View>
          {this.state.currentTab === 'hot' && (
            <View className="music-list">
              <View className="music-list-header">
                <Text className="music-header-name">歌名</Text>
                <Text className="music-header-author">歌手</Text>
              </View>
              <View className="music-list-content">
                {this.state.playList.map((item, i) => {
                  return (
                    <View
                      taroKey={String(i)}
                      className={`music-list-item ${this.state.isPlaying &&
                        this.state.curIndex === i &&
                        'isPlaying'}`}
                      onClick={this.goPlay.bind(this, i)}
                    >
                      <Text className="music-item-num">{i + 1}</Text>
                      <Text className="music-item-name">{item.name}</Text>
                      <Text className="music-item-author">{item.singer}</Text>
                    </View>
                  )
                })}
              </View>
            </View>
          )}
          {this.state.currentTab === 'recommend' && (
            <View className="warning">敬请期待。。。</View>
          )}
        </View>
        {this.state.curMusic && (
          <View className="music-footer" onClick={this.turnDetail}>
            <View className="music-img">
              <Image src={this.state.curMusic.picUrl} alt />
            </View>
            <View className="music-info">
              <View className="music-name">{this.state.curMusic.name}</View>
              <View class="music-singer">{this.state.curMusic.singer}</View>
            </View>
            <View
              className={`btn-play ${!this.state.isPlaying && 'pause'}`}
              onClick={this.togglePlaying}
            />
          </View>
        )}
        <View className="music-bg" />
      </View>
    )
  }
}
