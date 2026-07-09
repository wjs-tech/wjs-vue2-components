<!--
  ============================================================
  PaginationPro 分页增强组件
  
  功能说明：
    基于 el-pagination 封装的分页增强组件。
    支持 current-page 与 page-size 的 .sync 双向绑定，切换时统一抛出 change 事件。
    提供对齐方式、单页自动隐藏、尺寸等常用增强配置。
  
  Props:
    total: Number - 总条数
    page: Number - 当前页（.sync）
    size: Number - 每页条数（.sync）
    pageSizes: Array - 每页条数选项
    layout: String - el-pagination layout
    background: Boolean - 是否带背景
    small: Boolean - 是否小型
    align: String - 对齐方式 left | center | right
    autoHidden: Boolean - 仅一页时是否隐藏
    disabled: Boolean - 是否禁用
  
  Events:
    change - 分页变化（page, size）
    update:page / update:size - 双向绑定（.sync）
  
  适用场景：
    - 列表页底部的分页条
    - 需要统一分页事件、对齐与单页隐藏的中后台页面
  
  wjs created by 2020-08-19
  ============================================================
-->
<template>
  <div
    v-if="!hidden"
    class="pagination-pro"
    :class="['is-' + align]"
  >
    <el-pagination
      :current-page="page"
      :page-size="size"
      :total="total"
      :page-sizes="pageSizes"
      :layout="layout"
      :background="background"
      :small="small"
      :disabled="disabled"
      @current-change="onCurrentChange"
      @size-change="onSizeChange"
    ></el-pagination>
  </div>
</template>

<script>
/**
 * PaginationPro 分页增强组件
 * 基于 el-pagination，支持 .sync 双向绑定与统一 change 事件
 * wjs created by 2020-08-19
 */
export default {
  name: 'PaginationPro',
  props: {
    total: {
      type: Number,
      default: 0
    },
    page: {
      type: Number,
      default: 1
    },
    size: {
      type: Number,
      default: 10
    },
    pageSizes: {
      type: Array,
      default: () => [10, 20, 50, 100]
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    background: {
      type: Boolean,
      default: true
    },
    small: {
      type: Boolean,
      default: false
    },
    align: {
      type: String,
      default: 'right'
    },
    autoHidden: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    hidden() {
      return this.autoHidden && this.total <= this.size
    }
  },
  methods: {
    onCurrentChange(val) {
      this.$emit('update:page', val)
      this.$emit('change', val, this.size)
    },
    onSizeChange(val) {
      this.$emit('update:size', val)
      // 切换每页条数时回到第一页
      this.$emit('update:page', 1)
      this.$emit('change', 1, val)
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination-pro {
  padding: 12px 0;

  &.is-left {
    text-align: left;
  }

  &.is-center {
    text-align: center;
  }

  &.is-right {
    text-align: right;
  }
}
</style>
