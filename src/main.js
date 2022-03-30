import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./assets/icon/iconfont.css";
import router from "./router";
import store from "./store";
import Vuelazyload from "vue-lazyload";

Vue.config.productionTip = false;

Vue.use(ElementUI);

Vue.use(Vuelazyload, {
  preLoad: 1.3,
  loading: require("./assets/imgs/loading.gif"),
  attempt: 2,
});

console.log = function () {};

console.info(
  `%c
这里是小浪音乐！`,
  `color:#bb7cb7`
);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
