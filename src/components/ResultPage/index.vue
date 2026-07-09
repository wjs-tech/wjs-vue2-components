<!--
  ============================================================
  ResultPage 结果页组件
  
  功能说明：
    封装统一的提交结果反馈页，常用于表单提交、操作完成后的成功/失败/警告提示场景。
    原生 el-result 配置较为简单，本组件预置状态图标、标题、描述、操作按钮区插槽，
    支持通过类型快速切换视觉样式，并允许业务方自定义图标、副标题与底部操作区。
  
  Props:
    type: String - 结果类型 success/warning/error/info，默认 success
    title: String - 主标题
    description: String - 描述文字
    icon: String - 自定义图标类名，缺省时按 type 取内置图标
    extraText: String - 额外提示文字（位于描述下方）
  
  Events:
    confirm - 点击「完成/确定」主按钮时触发
    close - 点击「关闭/返回」次按钮时触发
  
  适用场景：
    - 表单提交成功/失败的结果展示
    - 订单支付、审批流转等流程结果页
    - 操作无数据/异常时的空状态反馈
  
  wjs created by 2018-05-20
  ============================================================
-->
<template>
  <div class="result-page">
    <el-card class="result-card" shadow="never">
      <div class="result-icon" :class="type">
        <i v-if="icon" :class="icon"></i>
        <i v-else :class="defaultIcon"></i>
      </div>
      <div class="result-title">{{ title }}</div>
      <div v-if="description" class="result-desc">{{ description }}</div>
      <div v-if="extraText" class="result-extra">{{ extraText }}</div>
      <div v-if="$slots.extra" class="result-extra">
        <slot name="extra"></slot>
      </div>
      <div v-if="$slots.actions || showActions" class="result-actions">
        <slot name="actions">
          <el-button v-if="confirmText" type="primary" @click="$emit('confirm')">{{ confirmText }}</el-button>
          <el-button v-if="closeText" @click="$emit('close')">{{ closeText }}</el-button>
        </slot>
      </div>
    </el-card>
  </div>
</template>

<script>
/**
 * ResultPage 结果页组件
 * wjs created by 2018-05-20
 */
export default {
  name: 'ResultPage',
  props: {
    type: {
      type: String,
      default: 'success',
      validator: (v) => ['success', 'warning', 'error', 'info'].includes(v)
    },
    title: {
      type: String,
      default: '操作成功'
    },
    description: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    extraText: {
      type: String,
      default: ''
    },
    confirmText: {
      type: String,
      default: '完成'
    },
    closeText: {
      type: String,
      default: ''
    },
    showActions: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    defaultIcon() {
      const map = {
        success: 'el-icon-success',
        warning: 'el-icon-warning',
        error: 'el-icon-error',
        info: 'el-icon-info'
      }
      return map[this.type] || 'el-icon-success'
    }
  }
}
</script>

<style lang="scss" scoped>
.result-page {
  .result-card {
    border: none;
    padding: 40px 20px;
    text-align: center;
  }

  .result-icon {
    font-size: 64px;
    line-height: 1;
    margin-bottom: 20px;

    &.success { color: #67c23a; }
    &.warning { color: #e6a23c; }
    &.error { color: #f56c6c; }
    &.info { color: #409eff; }
  }

  .result-title {
    font-size: 20px;
    font-weight: 500;
    color: #303133;
    margin-bottom: 12px;
  }

  .result-desc {
    font-size: 14px;
    color: #606266;
    line-height: 1.6;
    margin-bottom: 8px;
  }

  .result-extra {
    font-size: 13px;
    color: #909399;
    line-height: 1.6;
    margin-bottom: 16px;
  }

  .result-actions {
    margin-top: 16px;

    .el-button {
      margin: 0 6px;
    }
  }
}
</style>
