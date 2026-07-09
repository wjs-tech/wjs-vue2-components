/**
 * ============================================================
 * 路由配置
 *
 * 组件总览 + 29 个组件 Demo 路由
 * wjs created by 2018-06-05
 * ============================================================
 */

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: { title: '组件总览' }
  },
  // 已有组件
  {
    path: '/search-form',
    name: 'SearchForm',
    component: () => import('@/views/SearchFormDemo.vue'),
    meta: { title: '搜索表单' }
  },
  {
    path: '/page-header',
    name: 'PageHeader',
    component: () => import('@/views/PageHeaderDemo.vue'),
    meta: { title: '页头组件' }
  },
  {
    path: '/dict-select',
    name: 'DictSelect',
    component: () => import('@/views/DictSelectDemo.vue'),
    meta: { title: '字典选择器' }
  },
  {
    path: '/table-pro',
    name: 'TablePro',
    component: () => import('@/views/TableProDemo.vue'),
    meta: { title: '增强表格' }
  },
  {
    path: '/upload-image',
    name: 'UploadImage',
    component: () => import('@/views/UploadImageDemo.vue'),
    meta: { title: '图片上传' }
  },
  // 二次封装组件（2018-2024）
  {
    path: '/confirm-dialog',
    name: 'ConfirmDialog',
    component: () => import('@/views/FormDialogDemo.vue'),
    meta: { title: '确认弹窗' }
  },
  {
    path: '/pagination-pro',
    name: 'PaginationPro',
    component: () => import('@/views/PaginationProDemo.vue'),
    meta: { title: '分页增强' }
  },
  {
    path: '/tree-select',
    name: 'TreeSelect',
    component: () => import('@/views/TreeSelectDemo.vue'),
    meta: { title: '树形选择' }
  },
  {
    path: '/result-page',
    name: 'ResultPage',
    component: () => import('@/views/ResultPageDemo.vue'),
    meta: { title: '结果页' }
  },
  {
    path: '/form-drawer',
    name: 'FormDrawer',
    component: () => import('@/views/FormDrawerDemo.vue'),
    meta: { title: '表单抽屉' }
  },
  {
    path: '/image-preview',
    name: 'ImagePreview',
    component: () => import('@/views/ImagePreviewDemo.vue'),
    meta: { title: '图片预览' }
  },
  {
    path: '/steps-form',
    name: 'StepsForm',
    component: () => import('@/views/StepsFormDemo.vue'),
    meta: { title: '分步表单' }
  },
  {
    path: '/crud-table',
    name: 'CrudTable',
    component: () => import('@/views/CrudTableDemo.vue'),
    meta: { title: '增删改查表格' }
  },
  {
    path: '/filter-bar',
    name: 'FilterBar',
    component: () => import('@/views/FilterBarDemo.vue'),
    meta: { title: '筛选栏' }
  },
  {
    path: '/permission-demo',
    name: 'Permission',
    component: () => import('@/views/PermissionDemo.vue'),
    meta: { title: '权限指令' }
  },
  {
    path: '/cascader-panel',
    name: 'CascaderPanel',
    component: () => import('@/views/CascaderPanelDemo.vue'),
    meta: { title: '级联面板' }
  },
  {
    path: '/auth-button',
    name: 'AuthButton',
    component: () => import('@/views/AuthButtonDemo.vue'),
    meta: { title: '权限按钮' }
  },
  {
    path: '/avatar-upload',
    name: 'AvatarUpload',
    component: () => import('@/views/AvatarUploadDemo.vue'),
    meta: { title: '头像上传' }
  },
  {
    path: '/tag-select',
    name: 'TagSelect',
    component: () => import('@/views/TagSelectDemo.vue'),
    meta: { title: '标签多选' }
  },
  {
    path: '/table-select',
    name: 'TableSelect',
    component: () => import('@/views/TableSelectDemo.vue'),
    meta: { title: '下拉表格选择' }
  },
  {
    path: '/region-cascader',
    name: 'RegionCascader',
    component: () => import('@/views/RegionCascaderDemo.vue'),
    meta: { title: '省市区联动' }
  },
  {
    path: '/excel-export',
    name: 'ExcelExport',
    component: () => import('@/views/ExcelExportDemo.vue'),
    meta: { title: '导出按钮' }
  },
  {
    path: '/rich-text-editor',
    name: 'RichTextEditor',
    component: () => import('@/views/RichTextEditorDemo.vue'),
    meta: { title: '富文本编辑器' }
  },
  {
    path: '/tag-input',
    name: 'TagInput',
    component: () => import('@/views/TagInputDemo.vue'),
    meta: { title: '标签输入' }
  },
  {
    path: '/skeleton',
    name: 'Skeleton',
    component: () => import('@/views/SkeletonDemo.vue'),
    meta: { title: '骨架屏' }
  },
  {
    path: '/empty-state',
    name: 'EmptyState',
    component: () => import('@/views/EmptyStateDemo.vue'),
    meta: { title: '空状态' }
  },
  {
    path: '/loading-mask',
    name: 'LoadingMask',
    component: () => import('@/views/LoadingMaskDemo.vue'),
    meta: { title: '加载遮罩' }
  },
  {
    path: '/copy-text',
    name: 'CopyText',
    component: () => import('@/views/CopyTextDemo.vue'),
    meta: { title: '复制文本' }
  },
  {
    path: '/back-top',
    name: 'BackTop',
    component: () => import('@/views/BackTopDemo.vue'),
    meta: { title: '返回顶部' }
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router
