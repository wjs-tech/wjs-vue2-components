/**
 * WJS Vue2 组件库统一出口
 *
 * 供 `npm run build:lib` 打包为 umd 库使用，
 * 同时支持业务侧按需引入单个组件。
 *
 * wjs created by 2024-07-13
 */
import PageHeader from './PageHeader'
import SearchForm from './SearchForm'
import TablePro from './TablePro'
import DictSelect from './DictSelect'
import UploadImage from './UploadImage'

const components = {
  PageHeader,
  SearchForm,
  TablePro,
  DictSelect,
  UploadImage
}

const install = (Vue) => {
  Object.keys(components).forEach((name) => {
    Vue.component(name, components[name])
  })
}

// 浏览器通过 <script> 直接引入时自动安装
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  ...components
}

export {
  PageHeader,
  SearchForm,
  TablePro,
  DictSelect,
  UploadImage
}
