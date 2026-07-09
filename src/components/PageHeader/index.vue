<!--
  ============================================================
  PageHeader 页头组件
  
  功能说明：
    页面顶部的页头组件，包含面包屑、标题、描述、操作按钮等
    基于ElementUI的el-page-header进行扩展
  
  Props:
    title: String - 页面标题
    content: String - 页面描述
    showBack: Boolean - 是否显示返回按钮，默认true
  
  Events:
    back - 点击返回按钮时触发
  
  适用场景：
    - 详情页面顶部
    - 二级页面标题栏
    - 带返回功能的页面头部
  
  wjs created by 2019-03-15
  ============================================================
-->
<template>
  <div class="page-header">
    <div class="page-header-content">
      <div class="left">
        <el-page-header @back="handleBack" :content="title">
          <div slot="content" class="title-content">
            <span class="title-text">{{ title }}</span>
            <span v-if="tag" :class="['tag', tagType]">{{ tag }}</span>
          </div>
          <div slot="extra" v-if="extra">
            <slot name="extra"></slot>
          </div>
        </el-page-header>
        <div v-if="content || $slots.content" class="desc">
          <slot name="content">{{ content }}</slot>
        </div>
      </div>
      <div class="right" v-if="$slots.default || $slots.action">
        <slot name="action">
          <slot></slot>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * PageHeader 页头组件
 * 
 * 用于详情页、二级页面顶部，展示标题、描述、操作按钮
 * 
 * @property {String} title - 页面标题
 * @property {String} content - 页面描述文字
 * @property {Boolean} showBack - 是否显示返回按钮
 * @property {String} tag - 标签文字
 * @property {String} tagType - 标签类型 success/info/warning/danger
 * 
 * @event back - 返回按钮点击事件
 * 
 * wjs created by 2019-03-15
 */
export default {
  name: 'PageHeader',
  props: {
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    showBack: {
      type: Boolean,
      default: true
    },
    tag: {
      type: String,
      default: ''
    },
    tagType: {
      type: String,
      default: 'info'
    },
    extra: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleBack() {
      this.$emit('back')
      if (window.history.length > 1) {
        this.$router.back()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.page-header {
  background: #fff;
  padding: 16px 20px;
  margin: -20px -20px 20px;
  border-bottom: 1px solid #ebeef5;
  
  .page-header-content {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  
  .left {
    flex: 1;
  }
  
  .title-content {
    display: flex;
    align-items: center;
    gap: 10px;
    
    .title-text {
      font-size: 18px;
      font-weight: 500;
      color: #303133;
    }
    
    .tag {
      padding: 2px 8px;
      font-size: 12px;
      border-radius: 3px;
      
      &.success {
        background: #f0f9eb;
        color: #67c23a;
      }
      &.info {
        background: #ecf5ff;
        color: #409EFF;
      }
      &.warning {
        background: #fdf6ec;
        color: #e6a23c;
      }
      &.danger {
        background: #fef0f0;
        color: #f56c6c;
      }
    }
  }
  
  .desc {
    margin-top: 8px;
    font-size: 13px;
    color: #909399;
    line-height: 1.5;
  }
  
  .right {
    flex-shrink: 0;
  }
}
</style>
