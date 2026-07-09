<!--
  ============================================================
  AuthButton 权限按钮组件
  
  功能说明：
    基于 el-button 封装的权限按钮组件。
    支持按权限码控制按钮的显隐或禁用（无权限时给出提示）。
    点击后自动进入 loading 状态以防止重复点击，直到业务 Promise 完成。
  
  Props:
    auth: String - 操作所需权限码（为空表示无需权限）
    permissionList: Array - 当前用户拥有的权限码列表
    hideWhenNoAuth: Boolean - 无权限时是否隐藏（默认禁用并提示）
    tip: String - 无权限时的提示文案
    （其余 el-button 属性如 type/size/icon 等透传到内部按钮）
  
  Events:
    click - 点击且通过权限校验后触发，回调返回值若为 Promise 则自动管理 loading
  
  适用场景：
    - 列表/表单中的提交、保存、删除等需防连点的操作按钮
    - 需要按角色权限控制显隐的后台操作入口
  
  wjs created by 2022-01-20
  ============================================================
-->
<template>
  <el-button
    v-if="visible"
    v-bind="$attrs"
    :class="['auth-button', { 'is-no-auth': !hasPermission }]"
    :loading="innerLoading"
    :disabled="buttonDisabled"
    @click="handleClick"
  >
    <slot></slot>
  </el-button>
</template>

<script>
/**
 * AuthButton 权限按钮组件
 * 权限控制 + 防重复点击，基于 el-button 二次封装
 * wjs created by 2022-01-20
 */
export default {
  name: 'AuthButton',
  inheritAttrs: false,
  props: {
    // 操作所需权限码，为空字符串表示不需要权限
    auth: {
      type: String,
      default: ''
    },
    // 当前用户拥有的权限码列表
    permissionList: {
      type: Array,
      default: () => []
    },
    // 无权限时是否直接隐藏（false 时禁用并提示）
    hideWhenNoAuth: {
      type: Boolean,
      default: false
    },
    // 无权限时的提示文案
    tip: {
      type: String,
      default: '暂无操作权限'
    },
    // 外部禁用
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      innerLoading: false
    }
  },
  computed: {
    // 是否拥有权限：未配置 auth 视为无需权限
    hasPermission() {
      if (!this.auth) return true
      return this.permissionList.indexOf(this.auth) > -1
    },
    // 无权限且配置隐藏时整体不渲染
    visible() {
      return this.hasPermission || !this.hideWhenNoAuth
    },
    // 最终禁用状态
    buttonDisabled() {
      return this.disabled || !this.hasPermission || this.innerLoading
    }
  },
  methods: {
    async handleClick(e) {
      // 防连点：已在 loading 中直接拦截
      if (this.innerLoading) return
      // 无权限拦截并提示
      if (!this.hasPermission) {
        this.$message && this.$message.warning(this.tip)
        return
      }
      // 进入加载态，阻止重复点击
      this.innerLoading = true
      try {
        const handler = this.$listeners.click
        let res
        if (typeof handler === 'function') {
          res = handler(e)
        } else if (Array.isArray(handler)) {
          res = handler.map(fn => fn(e))
        }
        // 若业务返回 Promise，则等待其完成后再解除 loading
        if (res && typeof res.then === 'function') {
          await res
        } else if (Array.isArray(res)) {
          await Promise.all(res.filter(r => r && typeof r.then === 'function'))
        }
      } catch (err) {
        // 错误由业务侧统一提示，这里仅保证 loading 一定会结束
        // eslint-disable-next-line no-console
        console.error('[AuthButton] click handler error:', err)
      } finally {
        this.innerLoading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.auth-button {
  &.is-no-auth {
    opacity: 0.6;
    cursor: not-allowed;
  }
}
</style>
