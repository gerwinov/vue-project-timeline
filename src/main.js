import Vue from 'vue'
import VueProjectTimeline from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(VueProjectTimeline)
}).$mount('#app')
