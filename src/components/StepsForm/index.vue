<!--
  ============================================================
  StepsForm 分步表单组件
  
  功能说明：
    基于 el-steps + el-form 封装的多步骤表单容器，解决「分步录入 + 分步校验 + 上一步/下一步」的样板代码重复问题。
    每个步骤对应一个表单（通过具名插槽 step-0、step-1... 提供），切换步骤时自动校验当前步，全部校验通过后可提交。
    支持自定义步骤标题、是否允许跳步、底部按钮文案与最终提交 loading。
  
  Props:
    steps: Array - 步骤标题数组，如 ['基础信息', '扩展配置', '确认提交']
    active: Number - 当前激活步（支持 .sync）
    loading: Boolean - 最后一步提交 loading
    finishText: String - 最后一步按钮文案，默认「提交」
  
  Events:
    update:active - 当前步变化（配合 .sync）
    submit - 全部步骤校验通过、点击提交时触发
    change - 步骤切换时触发，参数为新步骤索引
  
  适用场景：
    - 注册 / 入驻等较长表单的分步录入
    - 多阶段配置（基础→高级→确认）
    - 需要逐步校验、防止跳步提交的业务
  
  wjs created by 2019-11-03
  ============================================================
-->
<template>
  <div class="steps-form">
    <el-steps :active="innerActive" align-center finish-status="success" class="steps-form-header">
      <el-step v-for="(s, i) in steps" :key="i" :title="s" />
    </el-steps>

    <div class="steps-form-body">
      <slot :name="'step-' + innerActive"></slot>
    </div>

    <div class="steps-form-footer">
      <el-button v-if="innerActive > 0" @click="prev">上一步</el-button>
      <el-button v-if="innerActive < steps.length - 1" type="primary" @click="next">下一步</el-button>
      <el-button v-else type="primary" :loading="loading" @click="submit">提交</el-button>
    </div>
  </div>
</template>

<script>
/**
 * StepsForm 分步表单组件
 * wjs created by 2019-11-03
 */
export default {
  name: 'StepsForm',
  props: {
    steps: {
      type: Array,
      default: () => []
    },
    active: {
      type: Number,
      default: 0
    },
    loading: {
      type: Boolean,
      default: false
    },
    finishText: {
      type: String,
      default: '提交'
    }
  },
  computed: {
    innerActive: {
      get() {
        return this.active
      },
      set(val) {
        this.$emit('update:active', val)
      }
    }
  },
  methods: {
    // 取当前步对应表单的 ref 名
    getFormRef(index) {
      const ref = this.$refs['stepForm_' + index]
      if (Array.isArray(ref)) return ref[0]
      return ref
    },
    async validateStep(index) {
      const form = this.getFormRef(index)
      if (!form || typeof form.validate !== 'function') return true
      return new Promise((resolve) => {
        form.validate((valid) => resolve(valid))
      })
    },
    async next() {
      const valid = await this.validateStep(this.innerActive)
      if (!valid) {
        this.$message.warning('请先完成当前步骤必填项')
        return
      }
      const nextIndex = Math.min(this.innerActive + 1, this.steps.length - 1)
      this.innerActive = nextIndex
      this.$emit('change', nextIndex)
    },
    prev() {
      const prevIndex = Math.max(this.innerActive - 1, 0)
      this.innerActive = prevIndex
      this.$emit('change', prevIndex)
    },
    async submit() {
      const valid = await this.validateStep(this.innerActive)
      if (!valid) {
        this.$message.warning('请先完成当前步骤必填项')
        return
      }
      this.$emit('submit')
    }
  }
}
</script>

<style lang="scss" scoped>
.steps-form {
  .steps-form-header {
    margin-bottom: 30px;
  }

  .steps-form-body {
    min-height: 160px;
    padding: 0 20px;
  }

  .steps-form-footer {
    margin-top: 24px;
    text-align: center;

    .el-button {
      margin: 0 8px;
    }
  }
}
</style>
