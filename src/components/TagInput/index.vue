<!--
  ============================================================
  标签输入 TagInput 组件
  
  功能说明：
    基于 el-tag + el-input 封装的标签输入组件
    回车或失焦生成标签，自动去重并支持数量上限与单标签长度限制
    通过 v-model 双向绑定标签数组，常用于兴趣、关键词等录入场景
  
  Props:
    value: Array - 标签数组（v-model）
    max: Number - 最多标签数，0 表示不限制，默认 0
    maxlength: Number - 单个标签最大长度，默认 20
    placeholder: String - 输入框占位提示
    size: String - 尺寸，同 el-tag（medium/small/mini）
    disabled: Boolean - 是否禁用，默认 false
    separator: String - 分隔符，支持逗号/分号/空格快速分词
  
  Events:
    input - 标签数组变化（用于 v-model）
    change - 标签数组变化（含操作类型）
    exceed - 达到数量上限时触发
  
  适用场景：
    - 关键词 / 兴趣标签录入
    - 邮件收件人、抄送人输入
    - 多值字段的可视化录入
  
  wjs created by 2024-06-10
  ============================================================
-->
<template>
  <div class="tag-input" :class="['tag-input--' + size, { 'is-disabled': disabled }]">
    <div class="tag-input__body" @click="focusInput">
      <el-tag
        v-for="(tag, index) in value"
        :key="index"
        :size="size"
        :closable="!disabled"
        :disable-transitions="false"
        class="tag-input__tag"
        @close="removeTag(index)"
      >
        {{ tag }}
      </el-tag>

      <input
        v-if="!disabled"
        ref="input"
        v-model="draft"
        class="tag-input__input"
        :size="size === 'mini' ? 8 : 12"
        :placeholder="showPlaceholder"
        :disabled="disabled"
        @keydown.enter.prevent="addTag"
        @keydown.delete="handleDelete"
        @keyup="onKeyUp"
        @blur="addTag"
      />
    </div>

    <span v-if="max > 0" class="tag-input__count">{{ value.length }} / {{ max }}</span>
  </div>
</template>

<script>
/**
 * TagInput 标签输入组件
 *
 * 回车 / 逗号 / 分号 / 失焦 生成标签，自动去重，支持 max 上限与 maxlength 单标签长度。
 *
 * @property {Array} value - 标签数组（v-model）
 * @property {Number} max - 最多标签数
 * @property {Number} maxlength - 单标签最大长度
 * @property {String} placeholder - 占位提示
 * @property {String} size - 尺寸
 * @property {Boolean} disabled - 禁用
 * @property {String} separator - 分隔符
 *
 * @event input - 标签数组变化
 * @event change - 标签数组变化（带 action）
 * @event exceed - 达到数量上限
 *
 * wjs created by 2024-06-10
 */
export default {
  name: 'TagInput',
  props: {
    value: {
      type: Array,
      default: () => []
    },
    max: {
      type: Number,
      default: 0
    },
    maxlength: {
      type: Number,
      default: 20
    },
    placeholder: {
      type: String,
      default: '输入后回车生成标签'
    },
    size: {
      type: String,
      default: 'small'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    separator: {
      type: String,
      default: ',;，；'
    }
  },
  data() {
    return {
      draft: ''
    }
  },
  computed: {
    showPlaceholder() {
      if (this.max > 0 && this.value.length >= this.max) {
        return '已达数量上限'
      }
      return this.value.length ? '' : this.placeholder
    },
    reachedMax() {
      return this.max > 0 && this.value.length >= this.max
    }
  },
  methods: {
    focusInput() {
      if (!this.disabled && !this.reachedMax) {
        this.$refs.input && this.$refs.input.focus()
      }
    },
    // 键盘输入：支持逗号/分号/空格作为分隔符即时分词
    onKeyUp(e) {
      if (!e) return
      const key = e.key
      if (this.separator && this.separator.indexOf(key) > -1) {
        // 阻止分隔符残留在输入框
        e.preventDefault()
        this.addTag()
      }
    },
    // 添加标签：支持分隔符拆分多个
    addTag() {
      if (this.disabled || this.reachedMax) return
      const raw = (this.draft || '').trim()
      if (!raw) return

      // 按分隔符拆分
      let items = [raw]
      if (this.separator) {
        const sep = this.separator.split('').map((s) => (s === ' ' ? '\\s' : s)).join('|')
        items = raw.split(new RegExp(sep)).map((s) => s.trim()).filter(Boolean)
      }

      const next = this.value.slice()
      items.forEach((text) => {
        let t = text
        if (this.maxlength > 0 && t.length > this.maxlength) {
          t = t.slice(0, this.maxlength)
        }
        const exists = next.some((x) => x === t)
        if (!exists && !(this.max > 0 && next.length >= this.max)) {
          next.push(t)
        }
      })

      this.draft = ''
      if (next.length !== this.value.length) {
        this.emitChange(next, 'add')
      }
      // 达到上限提示
      if (this.max > 0 && next.length >= this.max) {
        this.$emit('exceed')
      }
    },
    removeTag(index) {
      if (this.disabled) return
      const next = this.value.slice()
      next.splice(index, 1)
      this.emitChange(next, 'remove')
    },
    // 删除键：输入框为空时删除最后一个标签
    handleDelete() {
      if (this.draft === '' && this.value.length > 0) {
        const next = this.value.slice()
        next.pop()
        this.emitChange(next, 'remove')
      }
    },
    emitChange(next, action) {
      this.$emit('input', next)
      this.$emit('change', { value: next, action })
    }
  }
}
</script>

<style lang="scss" scoped>
.tag-input {
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 32px;
  padding: 2px 6px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background: #fff;
  cursor: text;
  transition: border-color 0.2s;
  box-sizing: border-box;

  &:hover {
    border-color: #c0c4cc;
  }

  &.is-disabled {
    background: #f5f7fa;
    cursor: not-allowed;
  }

  &__body {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 4px;
  }

  &__tag {
    margin: 2px;
  }

  &__input {
    flex: 1;
    min-width: 80px;
    height: 24px;
    border: none;
    outline: none;
    background: transparent;
    font-size: 13px;
    color: #303133;

    &::placeholder {
      color: #c0c4cc;
    }
  }

  &__count {
    margin-left: 6px;
    font-size: 12px;
    color: #909399;
    white-space: nowrap;
  }

  &--medium {
    min-height: 36px;
  }

  &--mini {
    min-height: 28px;
  }
}
</style>
