<!--
  ============================================================
  App.vue - 根组件
  
  布局说明：
    经典后台管理系统布局
    左侧菜单 + 顶部导航 + 主内容区
    
  wjs created by 2018-06-01
  ============================================================
-->
<template>
  <div id="app" class="app-wrapper">
    <!-- 左侧菜单 -->
    <div class="sidebar" :class="{ collapsed: isCollapsed }">
      <div class="logo">
        <span v-if="!isCollapsed">WJS组件库</span>
        <span v-else>WJS</span>
      </div>
      <el-menu
        :default-active="$route.path"
        :collapse="isCollapsed"
        :collapse-transition="false"
        router
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409EFF"
      >
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>

        <el-submenu v-for="group in menu" :key="group.index" :index="group.index">
          <template slot="title">
            <i :class="group.icon"></i>
            <span>{{ group.title }}</span>
          </template>
          <el-menu-item
            v-for="item in group.items"
            :key="item.path"
            :index="item.path"
          >{{ item.title }}</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    
    <!-- 右侧主区域 -->
    <div class="main-container">
      <!-- 顶部导航 -->
      <div class="header">
        <div class="header-left">
          <i class="el-icon-s-fold toggle-btn" @click="toggleSidebar"></i>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ $route.meta.title || '' }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="header-right">
          <i class="el-icon-bell"></i>
          <el-dropdown>
            <span class="user-info">
              <el-avatar size="small" icon="el-icon-user-solid"></el-avatar>
              管理员
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item>设置</el-dropdown-item>
              <el-dropdown-item divided>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      
      <!-- 主内容 -->
      <div class="main-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
/**
 * App根组件
 * wjs created by 2018-06-01
 */
export default {
  name: 'App',
  data() {
    return {
      isCollapsed: false,
      // 侧边栏菜单：按分类收纳全部 29 个组件 Demo，保证每个路由都可从导航直达
      menu: [
        {
          index: 'g-form', icon: 'el-icon-edit', title: '表单组件',
          items: [
            { path: '/search-form', title: '搜索表单' },
            { path: '/filter-bar', title: '筛选栏' },
            { path: '/dict-select', title: '字典选择器' },
            { path: '/tag-select', title: '标签多选' },
            { path: '/tag-input', title: '标签输入' },
            { path: '/steps-form', title: '分步表单' },
            { path: '/form-drawer', title: '表单抽屉' }
          ]
        },
        {
          index: 'g-table', icon: 'el-icon-tickets', title: '表格组件',
          items: [
            { path: '/table-pro', title: '增强表格' },
            { path: '/crud-table', title: '增删改查表格' },
            { path: '/pagination-pro', title: '分页增强' },
            { path: '/table-select', title: '下拉表格选择' }
          ]
        },
        {
          index: 'g-biz', icon: 'el-icon-s-shop', title: '业务组件',
          items: [
            { path: '/upload-image', title: '图片上传' },
            { path: '/avatar-upload', title: '头像上传' },
            { path: '/image-preview', title: '图片预览' },
            { path: '/region-cascader', title: '省市区联动' },
            { path: '/cascader-panel', title: '级联面板' },
            { path: '/tree-select', title: '树形选择' },
            { path: '/excel-export', title: '导出按钮' }
          ]
        },
        {
          index: 'g-feedback', icon: 'el-icon-bell', title: '反馈组件',
          items: [
            { path: '/confirm-dialog', title: '确认弹窗' },
            { path: '/result-page', title: '结果页' },
            { path: '/loading-mask', title: '加载遮罩' },
            { path: '/skeleton', title: '骨架屏' },
            { path: '/empty-state', title: '空状态' }
          ]
        },
        {
          index: 'g-display', icon: 'el-icon-s-grid', title: '展示与通用',
          items: [
            { path: '/page-header', title: '页头组件' },
            { path: '/rich-text-editor', title: '富文本编辑器' },
            { path: '/copy-text', title: '复制文本' },
            { path: '/back-top', title: '返回顶部' },
            { path: '/permission-demo', title: '权限指令' },
            { path: '/auth-button', title: '权限按钮' }
          ]
        }
      ]
    }
  },
  methods: {
    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed
    }
  }
}
</script>

<style lang="scss">
.app-wrapper {
  position: relative;
  height: 100vh;
  width: 100%;
  overflow: hidden;
}

.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 210px;
  background: #304156;
  transition: width 0.3s;
  overflow: hidden;
  z-index: 100;
  
  &.collapsed {
    width: 64px;
  }
  
  .logo {
    height: 60px;
    line-height: 60px;
    text-align: center;
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    background: #2b2f3a;
    white-space: nowrap;
    overflow: hidden;
  }
  
  .el-menu {
    border-right: none;
  }
}

.main-container {
  margin-left: 210px;
  transition: margin-left 0.3s;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  .sidebar.collapsed + & {
    margin-left: 64px;
  }
}

.header {
  height: 60px;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  
  .header-left {
    display: flex;
    align-items: center;
    
    .toggle-btn {
      font-size: 20px;
      cursor: pointer;
      margin-right: 20px;
      
      &:hover {
        color: #409EFF;
      }
    }
  }
  
  .header-right {
    display: flex;
    align-items: center;
    gap: 20px;
    
    .el-icon-bell {
      font-size: 18px;
      cursor: pointer;
      
      &:hover {
        color: #409EFF;
      }
    }
    
    .user-info {
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
    }
  }
}

.main-content {
  flex: 1;
  padding: 20px;
  background: #f0f2f5;
  overflow-y: auto;
}
</style>
