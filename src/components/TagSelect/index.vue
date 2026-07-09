<!--
  ============================================================
  TagSelect 标签多选组件
  
  功能说明：
    基于 el-tag + el-input 封装的标签化多选录入组件。
    输入框回车即添加标签，支持删除、去重与数量上限。
    支持粘贴自动按分隔符拆分，常用于标签、兴趣、关键词等录入。
  
  Props:
    value: Array - 已选标签数组（v-model）
    placeholder: String - 输入框占位符
    max: Number - 最大标签数量（0 表示不限制）
    type: String - el-tag 主题类型
    size: String - 尺寸
    allowDuplicate: Boolean - 是否允许重复标签
    splitOnPaste: Boolean - 粘贴时是否按分隔符拆分
  
  Events:
    input - 标签数组变化（v-model）
    change - 同 input，返回最新数组
    exceed - 超过 max 限制时触发
  
  适用场景：
    - 文章标签、用户兴趣、检索关键词等多值录入
    - 需要轻量、直观的多选标签输入场景
  
  wjs created by 2022-09-26
  ============================================================
-->
<template>
  <div class="tag-select" :class="['tag-select--' + size]">
    <el-tag
      v-for="(tag, index) in value"
      :key="index"
      :type="type"
      :size="size"
      closable
      disable-transitions
      class="tag-select__tag"
      @close="removeTag(index)"
    >
      {{ tag }}
    </el-tag>
    <el-input
      v-model="inputVal"
      class="tag-select__input"
      :class="{ 'is-limit': maxReached }"
      :size="size"
      :placeholder="placeholder"
      @keydown.enter.native.prevent="addFromInput"
      @blur="addFromInput"
      @paste.native="handlePaste"
    ></el-input>
  </div>
</template>

<script>
/**
 * TagSelect 标签多选组件
 * 回车即添加 / 可删除 / 可去重，基于 el-tag + el-input
 * wjs created by 2022-09-26
 */
export default {
  name: 'TagSelect',
  props: {
    value: {
      type: Array,
      default: () => []
    },
    placeholder: {
      type: String,
      default: '输入后回车添加'
    },
    max: {
      type: Number,
      default: 0
    },
    type: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'small'
    },
    allowDuplicate: {
      type: Boolean,
      default: false
    },
    splitOnPaste: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      inputVal: ''
    }
  },
  computed: {
    maxReached() {
      return this.max > 0 && this.value.length >= this.max
    }
  },
  methods: {
    emitChange(list) {
      this.$emit('input', list)
      this.$emit('change', list)
    },
    addTag(raw) {
      const val = (raw || '').toString().trim()
      if (!val) return
      if (this.maxReached) {
        this.$message && this.$message.warning(`最多只能添加 ${this.max} 个标签`)
        this.$emit('exceed', this.max)
        return
      }
      if (!this.allowDuplicate && this.value.indexOf(val) > -1) {
        this.$message && this.$message.warning(`标签「${val}」已存在`)
        return
      }
      this.emitChange([...this.value, val])
    },
    addFromInput() {
      if (this.maxReached) {
        this.inputVal = ''
        return
      }
      this.addTag(this.inputVal)
      this.inputVal = ''
    },
    removeTag(index) {
      const list = [...this.value]
      list.splice(index, 1)
      this.emitChange(list)
    },
    handlePaste(e) {
      if (!this.splitOnPaste) return
      // 阻止默认粘贴，自行按分隔符拆分
      e.preventDefault()
      const text = (e.clipboardData || window.clipboardData).getData('text')
      const parts = text
        .split(/[\n,，、;；\s]+/)
        .map(s => s.trim())
        .filter(Boolean)
      if (parts.length <= 1) {
        this.inputVal = parts[0] || ''
        return
      }
      parts.forEach(p => this.addTag(p))
    }
  }
}
</script>

<style lang="scss" scoped>
.tag-select {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  min-height: 32px;
  padding: 4px 8px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background: #fff;

  &__tag {
    margin: 0;
  }

  &__input {
    flex: 1;
    min-width: 120px;

    // 去除 el-input 默认边框，融入容器（Vue2 使用 ::v-deep）
    ::v-deep .el-input__inner {
      border: none;
      padding-left: 0;
      padding-right: 0;
    }

    &.is-limit ::v-deep .el-input__inner {
      cursor: not-allowed;
    }
  }

  &--medium {
    min-height: 36px;
  }

  &--small {
    min-height: 32px;
  }

  &--mini {
    min-height: 28px;
  }
}
</style>
