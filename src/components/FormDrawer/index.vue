<!--
  ============================================================
  FormDrawer 表单抽屉组件
  
  功能说明：
    基于 el-drawer + el-form 封装的「抽屉内嵌表单」通用容器，避免每个表单页重复编写抽屉、表单、底部固定操作栏。
    预置底部固定「取消/提交」操作区，支持标题、宽度、提交 loading、关闭前拦截（before-close）等能力，
    通过默认插槽承载业务表单，通过 footer 插槽自定义底部操作。
  
  Props:
    visible: Boolean - 抽屉显隐（支持 .sync）
    title: String - 抽屉标题
    width: [String, Number] - 抽屉宽度，默认 480px
    loading: Boolean - 提交按钮 loading 状态
    submitText: String - 提交按钮文字，默认「提交」
    cancelText: String - 取消按钮文字，默认「取消」
    beforeClose: Function - 关闭前拦截函数，返回 false 阻止关闭
    closeOnClickModal: Boolean - 点击遮罩是否关闭，默认 false
  
  Events:
    update:visible - 显隐变化（配合 .sync 使用）
    submit - 点击提交按钮时触发
    cancel - 点击取消按钮时触发
  
  适用场景：
    - 列表页「新增/编辑」弹层
    - 详情页内嵌的录入表单
    - 需要大输入区域的表单（比 dialog 更宽裕）
  
  wjs created by 2018-09-12
  ============================================================
-->
<template>
  <el-drawer
    :title="title"
    :visible.sync="drawerVisible"
    :size="width"
    :close-on-click-modal="closeOnClickModal"
    :before-close="handleBeforeClose"
    custom-class="form-drawer"
    @open="handleOpen"
    @closed="handleClosed"
  >
    <div class="form-drawer-body">
      <slot></slot>
    </div>
    <div class="form-drawer-footer">
      <slot name="footer">
        <el-button :disabled="loading" @click="handleCancel">{{ cancelText }}</el-button>
        <el-button type="primary" :loading="loading" @click="handleSubmit">{{ submitText }}</el-button>
      </slot>
    </div>
  </el-drawer>
</template>

<script>
/**
 * FormDrawer 表单抽屉组件
 * wjs created by 2018-09-12
 */
export default {
  name: 'FormDrawer',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '表单'
    },
    width: {
      type: [String, Number],
      default: '480px'
    },
    loading: {
      type: Boolean,
      default: false
    },
    submitText: {
      type: String,
      default: '提交'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    closeOnClickModal: {
      type: Boolean,
      default: false
    },
    beforeClose: {
      type: Function,
      default: null
    }
  },
  computed: {
    drawerVisible: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$emit('submit')
    },
    handleCancel() {
      this.$emit('cancel')
      this.drawerVisible = false
    },
    handleOpen() {
      this.$emit('open')
    },
    handleClosed() {
      this.$emit('closed')
    },
    handleBeforeClose(done) {
      if (typeof this.beforeClose === 'function') {
        const result = this.beforeClose()
        if (result === false) {
          done && done(false)
          return
        }
        // 支持异步（如 this.$confirm 返回的 Promise）：resolve(false) 视为取消
        if (result && typeof result.then === 'function') {
          result
            .then((ok) => {
              if (ok === false) {
                done && done(false)
              } else {
                this.$emit('update:visible', false)
                done && done()
              }
            })
            .catch(() => done && done(false))
          return
        }
      }
      this.$emit('update:visible', false)
      done && done()
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .form-drawer .el-drawer__header {
  margin-bottom: 0;
  padding: 16px 20px;
  border-bottom: 1px solid #ebeef5;
  color: #303133;
  font-weight: 500;
}

::v-deep .form-drawer .el-drawer__body {
  display: flex;
  flex-direction: column;
  padding: 0;
  height: calc(100% - 57px);
  box-sizing: border-box;
}

.form-drawer-body {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.form-drawer-footer {
  flex-shrink: 0;
  padding: 12px 20px;
  border-top: 1px solid #ebeef5;
  text-align: right;

  .el-button {
    margin-left: 10px;
  }
}
</style>
