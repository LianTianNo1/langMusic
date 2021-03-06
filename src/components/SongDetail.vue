<template>
  <transition leave-active-class="closeWindow">
    <div class="song-detail" v-show="!show" ref="bg">
      <div
        class="inner-bg"
        :style="{
          backgroundImage: globalMusicInfo.imgUrl
            ? 'url(' + globalMusicInfo.imgUrl + ')'
            : 'url(' + defaultImgUrl + ')',
        }"
      ></div>
      <i class="el-icon-arrow-down" @click="close"></i>
      <div class="content">
        <div class="img-box">
          <img
            :src="playerBar"
            alt=""
            :class="{
              'player-bar isplay': !isMusicPaused,
              'player-bar': isMusicPaused,
            }"
          />
          <div class="img-wrap-rotate">
            <img
              :src="globalMusicInfo.imgUrl ? globalMusicInfo.imgUrl : defaultImgUrl"
              alt=""
              :class="{ running: !isMusicPaused, paused: isMusicPaused }"
              crossorigin="anonymous"
              ref="cover"
            />
          </div>
        </div>

        <div class="song-wrap">
          <h2>{{ globalMusicInfo.songName }}</h2>
          <div style="margin: 5px 0 60px 0">
            <span
              class="song-info"
              v-for="(singer, i) in globalMusicInfo.artistInfo"
              :key="i + Math.random()"
              >{{ singer.name }}
            </span>
          </div>
          <div class="lyric-wrap">
            <el-scrollbar style="height: 100%" v-if="hasLyric" ref="scroll">
              <p
                v-for="(item, index) in lyric"
                :key="index + Math.random()"
                :class="{ 'active-lyric': currentIndex === index }"
              >
                {{ item.lyricWords }}
              </p>
            </el-scrollbar>
            <p v-if="!hasLyric">抱歉，暂无歌词</p>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { lyricAPI } from "@/utils/api";

export default {
  data() {
    return {
      playerBar: require("../assets/imgs/player_bar.png"),
      defaultImgUrl: require("@/assets/imgs/defaultImg.png"),
      lyric: [],
      currentIndex: 0,
      hasLyric: true,
      colors: [],
    };
  },
  props: {
    show: Boolean,
  },
  methods: {
    close() {
      this.$parent.show = true;
    },
    getLyric(id) {
      lyricAPI({ id }).then((res) => {
        // console.log(res);
        if (!res) return;
        const _this = this;
        if (!Object.hasOwnProperty.call(res.data, "lrc")) {
          _this.hasLyric = false;
        } else {
          this.hasLyric = true;
          const lyricStr = res.data.lrc.lyric;
          const lyricList = lyricStr.split("\n");
          const lyric = [];
          for (const item of lyricList) {
            // console.log(item)
            // 截取时间 去掉[]
            const end = item.indexOf("]");
            const time = item.slice(1, end);
            const currentTime = this.timeFormat(time);

            // 截取歌词,正则表达式去除[]及其包括的内容
            const lyricWords = item.replace(/\[.*?\]/g, "");
            if (lyricWords) {
              lyric.push({
                currentTime,
                lyricWords,
              });
            }
          }
          this.lyric = lyric;
          console.log(res.data.lrc.lyric);
        }
      });
    },
    timeFormat(time) {
      const minute = parseInt(time.split(":")[0]);
      const second = Math.ceil(time.split(":")[1]);
      const currentTime = minute * 60 + second;
      return currentTime;
    },
    lryicActive(time) {
      for (let i = 0; i < this.lyric.length; i++) {
        if (this.lyric[i].currentTime == Math.ceil(time)) {
          // 可实现歌词垂直居中
          const _p = document.querySelector(".active-lyric");
          const _pOffsetTop = _p.offsetTop;
          this.$refs.scroll.wrap.scrollTop = _pOffsetTop - _p.offsetHeight * 3; // 想滚到哪个高度，就写多少
          this.currentIndex = i;
        }
      }
    },
  },
  computed: {
    globalMusicInfo() {
      return this.$store.state.globalMusicInfo;
    },
    globalCurrentTime() {
      return this.$store.state.globalCurrentTime;
    },
    isMusicPaused() {
      return this.$store.state.isMusicPaused;
    },
    globalMusicUrl() {
      return this.$store.state.globalMusicUrl;
    },
  },
  watch: {
    globalCurrentTime() {
      if (this.hasLyric) {
        // 解决没有歌词仍会滚动的bug
        this.lryicActive(this.globalCurrentTime);
      }
    },
    globalMusicUrl() {
      if (this.globalMusicUrl != "") {
        const id = this.$store.state.globalMusicInfo.id;
        this.getLyric(id);
      }
    },
  },
};
</script>

<style>
ul {
  list-style: none;
}

.lyric-wrap .el-scrollbar__view {
  position: relative;
  padding: 100px 0 300px 0;
  text-align: center;
}

.song-detail {
  width: 100%;
  height: calc(100% - 70px);
  position: fixed;
  top: 0%;
  color: #fff;
  overflow: hidden;
  animation-duration: 0.5s;
  animation-name: showWindow;
  animation-fill-mode: forwards;
  animation-timing-function: ease-out;
  z-index: 10;
}
.inner-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  z-index: 0;
  background-size: cover;
  filter: blur(30px);
  transform: translate(-50%, -50%) scale(1.1);
}
@keyframes showWindow {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0%);
  }
}

@keyframes closeWindow {
  from {
    transform: translateY(0%);
  }
  to {
    transform: translateY(100%);
  }
}

.closeWindow {
  animation-duration: 0.5s;
  animation-name: closeWindow;
  animation-fill-mode: forwards;
  animation-timing-function: ease-out;
}

.song-detail i {
  margin: 10px;
  font-size: 22px;
  cursor: pointer;
  opacity: 0.99;
  padding: 5px;
  text-shadow: 1px 1px black;
  border-radius: 50%;
  color: white;
}

.song-detail i:hover {
  background-color: rgb(176, 174, 179);
}

.content {
  display: flex;
}

.content .img-box {
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin-top: 120px;
}

.player-bar {
  position: absolute;
  left: 50%;
  top: -10px;
  z-index: 10;
  transform: rotate(-25deg);
  transform-origin: 12px 12px;
  transition: 1s;
}

.isplay {
  transform: rotate(0);
}

.running {
  animation-play-state: running;
}

.paused {
  animation-play-state: paused;
}

.img-wrap-rotate {
  position: relative;
  width: 400px;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px 0;
}

.img-wrap-rotate::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.3);
}

.img-wrap-rotate::before {
  content: "";
  position: absolute;
  width: 90%;
  height: 90%;
  border-radius: 50%;
  background-color: #000;
}

.img-wrap-rotate img {
  width: 70%;
  height: 70%;
  border-radius: 50%;
  position: relative;

  animation-name: rotation;
  animation-duration: 30s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

@keyframes rotation {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

span.song-info {
  margin: 5px 0 60px 0;
  font-size: 16px;
  opacity: 0.28;
}

.song-wrap {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 60vh;
}

.song-wrap h2 {
  font-weight: normal;
  font-size: 23px;
}

.lyric-wrap {
  height: 100%;
  width: 80%;
}

.lyric-wrap p {
  padding: 18px;
  font-size: 1.7rem;
  opacity: 0.28;
  cursor: default;
  border-radius: 12px;
  transition: transform 0.2s ease-out;
  text-shadow: 1px 1px #ea3838c9, -1px -1px #e132f0c9;
  filter: drop-shadow(0 2px 10px #ea3838c9);
}

.lyric-wrap p:hover {
  transform: scale(1.1) translate(0, -20%);
}

.active-lyric {
  font-weight: bold;
  font-size: 15px;
  opacity: 1 !important;
}
</style>
