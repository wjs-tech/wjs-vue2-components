<!--
  ============================================================
  骨架屏 Skeleton 组件
  
  功能说明：
    基于 el-skeleton 二次封装的加载占位骨架屏
    支持自定义行数、头像、动画开关与节流，loading 关闭后自动展示真实内容
    用于在列表 / 详情等异步加载场景缓解白屏焦虑，提升等待体验
  
  Props:
    loading: Boolean - 是否处于加载中，默认 true
    rows: Number - 占位段落行数，默认 3
    avatar: Boolean - 是否显示头像占位，默认 false
    animated: Boolean - 是否开启动画，默认 true
    avatarSize: Number - 头像占位尺寸(px)，默认 40
    throttle: Number - 显示延迟(ms)，用于避免闪屏，默认 0
  
  Events:
    无
  
  适用场景：
    - 列表 / 卡片数据加载占位
    - 详情页首屏骨架
    - 局部异步刷新的占位过渡
  
  wjs created by 2024-01-08
  ============================================================
-->
<template>
  <el-skeleton
    class="wjs-skeleton"
    :loading="loading"
    :rows="rows"
    :animated="animated"
    :avatar="avatar"
    :avatar-size="avatarSize"
    :throttle="throttle"
  >
    <template v-if="$slots.template" slot="template">
      <slot name="template" />
    </template>
    <slot />
  </el-skeleton>
</template>

<script>
/**
 * Skeleton 骨架屏组件
 *
 * 对 el-skeleton 的轻封装：透传 loading / rows / avatar / animated 等配置，
 * 默认插槽放置真实内容，loading 关闭后自动渲染。
 *
 * @property {Boolean} loading - 是否加载中
 * @property {Number} rows - 占位行数
 * @property {Boolean} avatar - 是否显示头像占位
 * @property {Boolean} animated - 是否开启动画
 * @property {Number} avatarSize - 头像尺寸
 * @property {Number} throttle - 显示延迟(ms)
 *
 * wjs created by 2024-01-08
 */
export default {
  name: 'Skeleton',
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    rows: {
      type: Number,
      default: 3
    },
    avatar: {
      type: Boolean,
      default: false
    },
    animated: {
      type: Boolean,
      default: true
    },
    avatarSize: {
      type: Number,
      default: 40
    },
    throttle: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang="scss" scoped>
.wjs-skeleton {
  width: 100%;
}
</style>
