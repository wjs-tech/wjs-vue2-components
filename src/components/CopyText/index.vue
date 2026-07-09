<!--
  ============================================================
  复制文本 CopyText 组件
  
  功能说明：
    一键复制文本的轻量组件，点击即可将目标内容写入剪贴板并给出成功反馈
    优先使用 navigator.clipboard API，不支持时自动降级到 execCommand 方案
    通过 value 指定待复制内容，text / 插槽自定义展示文案，复制成功有图标与提示反馈
  
  Props:
    value: String - 需要复制的文本内容
    text: String - 展示文案，默认等于 value
    tooltip: String - 悬停提示，默认「点击复制」
    successText: String - 复制成功提示，默认「复制成功」
    showIcon: Boolean - 是否显示复制图标，默认 true
  
  Events:
    success - 复制成功，携带复制内容
    error - 复制失败，携带错误信息
  
  适用场景：
    - 订单号 / 流水号复制
    - 接口地址 / token 复制
    - 任何需要快速拷贝的场景
  
  wjs created by 2022-02-13
  ============================================================
-->
<template>
  <span
    class="wjs-copy-text"
    :class="{ 'is-copied': copied, 'is-disabled': !value }"
    :title="tooltip"
    @click="copy"
  >
    <slot>{{ displayText }}</slot>
    <i v-if="showIcon && !copied" class="el-icon-document-copy copy-icon"></i>
    <i v-if="copied" class="el-icon-check copy-icon copied"></i>
  </span>
</template>

<script>
/**
 * CopyText 复制文本组件
 *
 * navigator.clipboard 优先，execCommand 兜底；复制成功切换图标并触发 success 事件。
 *
 * @property {String} value - 待复制文本
 * @property {String} text - 展示文案
 * @property {String} tooltip - 悬停提示
 * @property {String} successText - 成功提示
 * @property {Boolean} showIcon - 是否显示图标
 *
 * @event success - 复制成功
 * @event error - 复制失败
 *
 * wjs created by 2022-02-13
 */
export default {
  name: 'CopyText',
  props: {
    value: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    tooltip: {
      type: String,
      default: '点击复制'
    },
    successText: {
      type: String,
      default: '复制成功'
    },
    showIcon: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      copied: false
    }
  },
  computed: {
    displayText() {
      return this.text || this.value || ''
    }
  },
  methods: {
    copy() {
      if (!this.value) return
      const done = () => {
        this.copied = true
        this.$emit('success', this.value)
        if (this.$message) {
          this.$message.success(this.successText)
        }
        setTimeout(() => {
          this.copied = false
        }, 1500)
      }
      const fail = (err) => {
        this.$emit('error', err)
        if (this.$message) {
          this.$message.error('复制失败，请手动选择复制')
        }
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(this.value).then(done).catch(() => {
          this.fallbackCopy(done, fail)
        })
      } else {
        this.fallbackCopy(done, fail)
      }
    },
    // 降级方案：临时 textarea + execCommand
    fallbackCopy(done, fail) {
      try {
        const textarea = document.createElement('textarea')
        textarea.value = this.value
        textarea.setAttribute('readonly', '')
        textarea.style.position = 'fixed'
        textarea.style.top = '-9999px'
        textarea.style.opacity = '0'
        document.body.appendChild(textarea)
        textarea.select()
        textarea.setSelectionRange(0, textarea.value.length)
        const ok = document.execCommand('copy')
        document.body.removeChild(textarea)
        ok ? done() : fail(new Error('execCommand copy failed'))
      } catch (e) {
        fail(e)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.wjs-copy-text {
  display: inline-flex;
  align-items: center;
  padding: 2px 6px;
  border-radius: 4px;
  color: #409eff;
  cursor: pointer;
  user-select: none;
  transition: background 0.2s;

  &:hover {
    background: #ecf5ff;
  }

  &.is-copied {
    color: #67c23a;
  }

  &.is-disabled {
    color: #c0c4cc;
    cursor: not-allowed;

    &:hover {
      background: transparent;
    }
  }

  .copy-icon {
    margin-left: 4px;
    font-size: 14px;

    &.copied {
      color: #67c23a;
    }
  }
}
</style>
