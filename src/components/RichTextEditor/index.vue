<!--
  ============================================================
  富文本编辑器 RichTextEditor 组件
  
  功能说明：
    基于原生 contenteditable + document.execCommand 实现的轻量富文本编辑器
    通过 v-model 双向绑定 HTML 字符串，开箱即用的基础工具栏
    不依赖任何第三方富文本库，体积小、易嵌入表单场景
  
  Props:
    value: String - 富文本 HTML 内容（v-model）
    placeholder: String - 空内容占位提示
    height: String - 编辑区高度，默认 280px
    readonly: Boolean - 只读模式，默认 false
    disabled: Boolean - 禁用模式，默认 false
    maxLength: Number - 纯文本最大长度，0 表示不限制
  
  Events:
    input - 内容变化（用于 v-model）
    change - 内容变化（失焦时触发，带纯文本长度）
  
  适用场景：
    - 后台文章/公告编辑
    - 表单中的富文本字段
    - 轻量评论/备注录入
  
  wjs created by 2024-02-19
  ============================================================
-->
<template>
  <div class="rich-text-editor" :class="{ 'is-disabled': disabled, 'is-readonly': readonly }">
    <!-- 工具栏 -->
    <div v-if="!readonly && !disabled" class="rte-toolbar" @mousedown.prevent>
      <button
        v-for="item in toolbar"
        :key="item.cmd"
        type="button"
        class="rte-btn"
        :class="{ 'is-active': activeMap[item.cmd] }"
        :title="item.title"
        @click="exec(item)"
      >
        <i :class="item.icon"></i>
      </button>
      <span class="rte-count" v-if="maxLength > 0">{{ textLength }} / {{ maxLength }}</span>
    </div>

    <!-- 编辑区 -->
    <div
      ref="editor"
      class="rte-content"
      :style="{ height: height }"
      :contenteditable="!readonly && !disabled"
      :data-placeholder="placeholder"
      @input="onInput"
      @blur="onBlur"
      @keyup="syncActive"
      @mouseup="syncActive"
    ></div>
  </div>
</template>

<script>
/**
 * RichTextEditor 富文本编辑器组件
 *
 * 基于原生 contenteditable 实现，通过 execCommand 执行基础排版命令。
 * 不引入 vue-quill-editor 等三方库，适合轻量富文本场景。
 *
 * @property {String} value - 富文本 HTML（v-model）
 * @property {String} placeholder - 占位提示
 * @property {String} height - 编辑区高度
 * @property {Boolean} readonly - 只读
 * @property {Boolean} disabled - 禁用
 * @property {Number} maxLength - 纯文本最大长度
 *
 * @event input - 内容变化
 * @event change - 失焦时内容变化
 *
 * wjs created by 2024-02-19
 */
export default {
  name: 'RichTextEditor',
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '请输入内容…'
    },
    height: {
      type: String,
      default: '280px'
    },
    readonly: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    maxLength: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      // 工具栏命令定义
      toolbar: [
        { cmd: 'bold', icon: 'el-icon-bold', title: '加粗' },
        { cmd: 'italic', icon: 'el-icon-italic', title: '斜体' },
        { cmd: 'underline', icon: 'el-icon-document', title: '下划线' },
        { cmd: 'formatBlock:h2', icon: 'el-icon-document-copy', title: '标题' },
        { cmd: 'insertUnorderedList', icon: 'el-icon-menu', title: '无序列表' },
        { cmd: 'insertOrderedList', icon: 'el-icon-s-order', title: '有序列表' },
        { cmd: 'removeFormat', icon: 'el-icon-delete', title: '清除格式' }
      ],
      activeMap: {},
      lastHtml: '',
      textLength: 0
    }
  },
  watch: {
    value(val) {
      // 外部值变化时同步到编辑区，避免与本地输入互相覆盖
      if (this.$refs.editor && val !== this.lastHtml) {
        this.$refs.editor.innerHTML = val || ''
        this.lastHtml = val || ''
        this.calcTextLength()
      }
    }
  },
  mounted() {
    if (this.$refs.editor) {
      this.$refs.editor.innerHTML = this.value || ''
      this.lastHtml = this.value || ''
      this.calcTextLength()
    }
  },
  methods: {
    // 执行工具栏命令
    exec(item) {
      const editor = this.$refs.editor
      if (!editor) return
      editor.focus()
      const [cmd, value] = item.cmd.split(':')
      if (cmd === 'formatBlock') {
        document.execCommand('formatBlock', false, value || 'p')
      } else {
        document.execCommand(cmd, false, null)
      }
      this.onInput()
      this.syncActive()
    },
    // 输入回调
    onInput() {
      const editor = this.$refs.editor
      if (!editor) return
      let html = editor.innerHTML
      const text = editor.innerText.replace(/ /g, '')
      // 字数限制：超出时回退
      if (this.maxLength > 0 && text.length > this.maxLength) {
        editor.innerHTML = this.lastHtml
        html = this.lastHtml
        this.$message && this.$message.warning(`最多输入 ${this.maxLength} 个字符`)
      }
      this.lastHtml = html
      this.calcTextLength()
      this.$emit('input', html)
    },
    onBlur() {
      this.$emit('change', {
        html: this.lastHtml,
        length: this.textLength
      })
      this.syncActive()
    },
    // 计算纯文本长度
    calcTextLength() {
      const editor = this.$refs.editor
      if (!editor) return
      this.textLength = (editor.innerText || '').replace(/ /g, '').length
    },
    // 同步工具栏高亮状态
    syncActive() {
      const map = {}
      this.toolbar.forEach((item) => {
        const [cmd] = item.cmd.split(':')
        try {
          map[item.cmd] = document.queryCommandState(cmd)
        } catch (e) {
          map[item.cmd] = false
        }
      })
      this.activeMap = map
    }
  }
}
</script>

<style lang="scss" scoped>
.rich-text-editor {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background: #fff;
  transition: border-color 0.2s;

  &:hover {
    border-color: #c0c4cc;
  }

  &.is-disabled,
  &.is-readonly {
    background: #f5f7fa;
    cursor: not-allowed;
  }

  .rte-toolbar {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: 6px 8px;
    border-bottom: 1px solid #ebeef5;
    background: #fafafa;

    .rte-btn {
      min-width: 30px;
      height: 30px;
      margin-right: 4px;
      padding: 0 8px;
      border: 1px solid transparent;
      border-radius: 4px;
      background: transparent;
      color: #606266;
      font-size: 14px;
      cursor: pointer;
      outline: none;

      &:hover {
        background: #ecf5ff;
        color: #409eff;
      }

      &.is-active {
        background: #ecf5ff;
        color: #409eff;
        border-color: #d9ecff;
      }
    }

    .rte-count {
      margin-left: auto;
      font-size: 12px;
      color: #909399;
    }
  }

  .rte-content {
    padding: 12px;
    overflow-y: auto;
    line-height: 1.7;
    font-size: 14px;
    color: #303133;
    outline: none;

    &:empty::before {
      content: attr(data-placeholder);
      color: #c0c4cc;
    }

    h2 {
      font-size: 18px;
      font-weight: 600;
      margin: 8px 0;
    }

    ul,
    ol {
      padding-left: 22px;
    }
  }
}
</style>
