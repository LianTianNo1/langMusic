<template>
  <div id="app">
    <Top></Top>
    <Index>
      <keep-alive>
        <router-view v-if="this.$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!this.$route.meta.keepAlive"></router-view>
    </Index>
    <SongDetail :show="show"></SongDetail>
    <transition name="fade">
      <Queue v-show="showQueue"></Queue>
    </transition>
    <Bottom></Bottom>
  </div>
</template>

<script>
import Top from "./components/Top.vue";
import Index from "./components/Index.vue";
import Bottom from "./components/Bottom.vue";
import SongDetail from "./components/SongDetail.vue";
import Queue from "./components/Queue.vue";

export default {
  name: "App",
  components: {
    Top,
    Index,
    Bottom,
    SongDetail,
    Queue,
  },
  data() {
    return {
      show: true,
      showQueue: false,
    };
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

#app {
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
}
#app::before {
  position: absolute;
  content: "";
  display: block;
  z-index: 0;
  left: 0%;
  width: 100%;
  height: 100%;
  background: url(./assets/imgs/bg.jpg);
  background-size: cover;
  filter: blur(10px);
  transform: scale(1.1);
  top: 0%;
}

.header {
  height: 60px;
  position: relative;
  top: 0;
  left: 0;
  z-index: 99;
  right: 0;
  box-shadow: 0px 1px 5px #0000002b;
}

.bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: #ffffff6e;
  box-shadow: 0px -2px 2px rgb(145 145 145 / 12%);
}

.index {
  position: fixed;
  top: 60px;
  bottom: 70px;
  left: 0;
  right: 0;
}

/* 去除scrollbar横向滚动条 */
.el-scrollbar__wrap {
  overflow-x: hidden !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: transform 0.5s;
}
.fade-enter,
.fade-leave-active {
  transform: translate3d(0, 100%, 0);
}

.el-loading-spinner .path {
  stroke: rgb(236, 65, 65) !important;
}
</style>
