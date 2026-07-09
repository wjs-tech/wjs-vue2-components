<!--
  ============================================================
  返回顶部 BackTop 组件
  
  功能说明：
    基于 el-backtop 封装的回到顶部按钮，监听滚动并在超过阈值后浮现
    支持自定义触发高度 visibilityHeight、停靠位置与按钮文案
    可针对指定滚动容器（target）或全局窗口工作，提升长页浏览体验
  
  Props:
    target: String - 滚动容器选择器，留空则监听 window，默认 ''
    visibilityHeight: Number - 滚动多少像素后显示，默认 200
    text: String - 按钮下方文案，默认空
    right: Number - 距右侧距离(px)，默认 40
    bottom: Number - 距底部距离(px)，默认 40
  
  Events:
    无
  
  适用场景：
    - 长列表 / 长文档页
    - 嵌套滚动容器内部回到顶部
    - 后台详情页快速返回
  
  wjs created by 2021-06-09
  ============================================================
-->
<template>
  <el-backtop
    class="wjs-backtop"
    :target="target"
    :visibility-height="visibilityHeight"
    :right="right"
    :bottom="bottom"
  >
    <div class="wjs-backtop__inner">
      <i class="el-icon-caret-top"></i>
      <span v-if="text" class="wjs-backtop__text">{{ text }}</span>
    </div>
  </el-backtop>
</template>

<script>
/**
 * BackTop 返回顶部组件
 *
 * 封装 el-backtop：透传 target / visibilityHeight / right / bottom，
 * 默认插槽内提供图标 + 可选文案。
 *
 * @property {String} target - 滚动容器选择器
 * @property {Number} visibilityHeight - 触发高度
 * @property {String} text - 文案
 * @property {Number} right - 距右
 * @property {Number} bottom - 距底
 *
 * wjs created by 2021-06-09
 */
export default {
  name: 'BackTop',
  props: {
    target: {
      type: String,
      default: ''
    },
    visibilityHeight: {
      type: Number,
      default: 200
    },
    text: {
      type: String,
      default: ''
    },
    right: {
      type: Number,
      default: 40
    },
    bottom: {
      type: Number,
      default: 40
    }
  }
}
</script>

<style lang="scss" scoped>
.wjs-backtop {
  &__inner {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    border-radius: 50%;
    background: #fff;
    color: #409eff;

    .el-icon-caret-top {
      font-size: 20px;
      line-height: 1;
    }

    .wjs-backtop__text {
      font-size: 12px;
      margin-top: 2px;
      line-height: 1;
    }
  }
}
</style>
