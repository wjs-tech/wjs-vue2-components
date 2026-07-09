<!--
  ============================================================
  富文本编辑器 RichTextEditor 演示页
  
  wjs created by 2024-02-19
  ============================================================
-->
<template>
  <div class="rich-text-editor-demo">
    <PageHeader title="富文本编辑器 RichTextEditor" content="基于原生 contenteditable 的轻量富文本封装，支持 v-model 双向绑定与基础工具栏">
    </PageHeader>

    <el-alert
      type="info"
      :closable="false"
      show-icon
      style="margin-bottom: 16px;"
      title="说明"
      description="该组件不依赖任何第三方富文本库，通过 document.execCommand 实现加粗、斜体、标题、列表等基础排版，适合轻量编辑场景。"
    />

    <el-row :gutter="20">
      <el-col :span="14">
        <el-card>
          <div slot="header">基础用法（v-model 双向绑定）</div>
          <RichTextEditor v-model="content" :height="'260px'" placeholder="请输入示例内容…" />
          <div style="margin-top: 12px;">
            <el-button type="primary" size="small" @click="logHtml">打印当前 HTML</el-button>
            <el-button size="small" @click="setDemo">填充示例内容</el-button>
            <el-button size="small" @click="clearContent">清空</el-button>
          </div>
        </el-card>
      </el-col>

      <el-col :span="10">
        <el-card>
          <div slot="header">实时 HTML 预览</div>
          <pre class="html-preview">{{ content || '（空）' }}</pre>
        </el-card>

        <el-card style="margin-top: 16px;">
          <div slot="header">带字数限制（80 字）</div>
          <RichTextEditor v-model="content2" :max-length="80" :height="'160px'" placeholder="超过字数将不可继续输入" />
          <div style="margin-top: 8px; color: #909399; font-size: 12px;">
            当前纯文本长度受 maxLength 约束，超出时自动回退并提示。
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import RichTextEditor from '@/components/RichTextEditor/index.vue'

export default {
  name: 'RichTextEditorDemo',
  components: { RichTextEditor },
  data() {
    return {
      content: '<p>这是一段<strong>示例</strong>富文本内容，请尝试使用上方工具栏进行排版。</p>',
      content2: ''
    }
  },
  methods: {
    logHtml() {
      this.$alert(this.content || '（空）', '当前绑定的 HTML', { customClass: 'rte-html-alert' })
    },
    setDemo() {
      this.content = '<h2>示例标题</h2><p>这是通过按钮<strong>填充</strong>的示例内容，包含：</p><ul><li>无序列表项一</li><li>无序列表项二</li></ul>'
    },
    clearContent() {
      this.content = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.rich-text-editor-demo {
  .html-preview {
    margin: 0;
    padding: 12px;
    background: #f5f7fa;
    border-radius: 4px;
    font-size: 12px;
    line-height: 1.6;
    color: #606266;
    max-height: 260px;
    overflow: auto;
    white-space: pre-wrap;
    word-break: break-all;
  }
}
</style>
