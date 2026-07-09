<!--
  ============================================================
  FormDialog 表单弹窗组件
  
  功能说明：
    基于 el-dialog 封装的通用弹窗/确认框组件。
    内置底部「取消 / 确定」操作区，支持提交 loading 与点击遮罩控制。
    通过默认插槽传入表单内容，可自定义标题与底部，适用于确认与表单录入。
  
  Props:
    visible: Boolean - 显示状态（支持 .sync / v-model 风格 update:visible）
    title: String - 弹窗标题
    width: String - 弹窗宽度
    submitText: String - 确定按钮文案
    cancelText: String - 取消按钮文案
    submitLoading: Boolean - 确定按钮 loading（由外部业务控制）
    submitType: String - 确定按钮类型（如 danger）
    showFooter: Boolean - 是否显示底部操作区
    showCancel: Boolean - 是否显示取消按钮
    closeOnClickModal: Boolean - 点击遮罩是否关闭
    appendToBody: Boolean - 是否挂载到 body
  
  Events:
    update:visible - 显隐状态变化（.sync）
    submit - 点击确定
    cancel - 点击取消或关闭
    open - 打开
    close - 关闭
  
  适用场景：
    - 删除、提交等二次确认弹窗
    - 新增 / 编辑的表单录入弹窗
  
  wjs created by 2020-03-12
  ============================================================
-->
<template>
  <el-dialog
    :visible="visible"
    :title="title"
    :width="width"
    :show-close="true"
    :close-on-click-modal="closeOnClickModal"
    :append-to-body="appendToBody"
    :before-close="handleBeforeClose"
    class="form-dialog"
    @open="onOpen"
    @close="onClose"
  >
    <slot></slot>
    <span v-if="showFooter" slot="footer" class="dialog-footer">
      <el-button v-if="showCancel" @click="handleCancel">{{ cancelText }}</el-button>
      <el-button :type="submitType" :loading="submitLoading" @click="handleSubmit">
        {{ submitText }}
      </el-button>
    </span>
  </el-dialog>
</template>

<script>
/**
 * FormDialog 表单弹窗组件
 * 基于 el-dialog 封装，内置确定/取消与 loading、确认等能力
 * wjs created by 2020-03-12
 */
export default {
  name: 'FormDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '提示'
    },
    width: {
      type: String,
      default: '520px'
    },
    submitText: {
      type: String,
      default: '确定'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    submitLoading: {
      type: Boolean,
      default: false
    },
    submitType: {
      type: String,
      default: 'primary'
    },
    showFooter: {
      type: Boolean,
      default: true
    },
    showCancel: {
      type: Boolean,
      default: true
    },
    closeOnClickModal: {
      type: Boolean,
      default: false
    },
    appendToBody: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    updateVisible(val) {
      this.$emit('update:visible', val)
    },
    handleBeforeClose(done) {
      if (this.submitLoading) return
      this.updateVisible(false)
      done && done()
    },
    handleCancel() {
      this.updateVisible(false)
      this.$emit('cancel')
    },
    handleSubmit() {
      this.$emit('submit')
    },
    onOpen() {
      this.$emit('open')
    },
    onClose() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.form-dialog {
  // 弹窗内容区与底部留白由 el-dialog 默认样式保证
}
</style>
