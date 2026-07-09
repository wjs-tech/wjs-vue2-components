/**
 * ============================================================
 * Vue2 组件库 - 入口文件
 *
 * 功能说明：
 *   项目主入口，引入Vue、ElementUI、路由等
 *   注册全局组件
 *
 * wjs created by 2018-06-01
 * ============================================================
 */

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import './styles/index.scss'

// 引入自定义指令
import permission from './directives/permission'

// 引入自定义组件
import PageHeader from './components/PageHeader/index.vue'
import TablePro from './components/TablePro/index.vue'
import SearchForm from './components/SearchForm/index.vue'

Vue.use(ElementUI)

// 注册全局指令
Vue.directive('permission', permission)

// 注册全局组件
Vue.component('PageHeader', PageHeader)
Vue.component('TablePro', TablePro)
Vue.component('SearchForm', SearchForm)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
