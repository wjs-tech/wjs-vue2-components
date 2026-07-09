<!--
  ============================================================
  复制文本 CopyText 演示页
  
  wjs created by 2022-02-13
  ============================================================
-->
<template>
  <div class="copy-text-demo">
    <PageHeader title="复制文本 CopyText" content="一键复制文本带成功反馈，优先 navigator.clipboard，不支持时自动降级 execCommand">
    </PageHeader>

    <el-alert
      type="info"
      :closable="false"
      show-icon
      style="margin-bottom: 16px;"
      title="说明"
      description="点击文本即可复制到剪贴板，复制成功会切换为对勾图标并弹出成功提示。复制失败（如非安全上下文）会给出降级提示。"
    />

    <el-card>
      <div slot="header">常用场景</div>
      <el-descriptions :column="1" border>
        <el-descriptions-item label="订单号">
          <CopyText :value="orderNo" />
        </el-descriptions-item>
        <el-descriptions-item label="接口地址">
          <CopyText value="https://api.example.com/v1/demo/query" text="https://api.example.com/v1/demo/query" />
        </el-descriptions-item>
        <el-descriptions-item label="鉴权 Token">
          <CopyText :value="token" text="点击复制 Token（已脱敏）" />
        </el-descriptions-item>
        <el-descriptions-item label="自定义插槽">
          <CopyText :value="customText">
            <el-tag type="warning" size="small">复制示例文本</el-tag>
          </CopyText>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>

    <el-card style="margin-top: 16px;">
      <div slot="header">事件回调</div>
      <CopyText :value="orderNo" @success="onSuccess" @error="onError" />
      <div style="margin-top: 12px; color: #909399; font-size: 13px;">
        最近事件：{{ lastEvent || '（暂无）' }}
      </div>
    </el-card>
  </div>
</template>

<script>
import CopyText from '@/components/CopyText/index.vue'

export default {
  name: 'CopyTextDemo',
  components: { CopyText },
  data() {
    return {
      orderNo: 'DEMO202202130001',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9xxxx',
      customText: '这是一段用于演示复制功能的示例文本。',
      lastEvent: ''
    }
  },
  methods: {
    onSuccess(val) {
      this.lastEvent = `success：${val}`
    },
    onError(err) {
      this.lastEvent = `error：${err && err.message ? err.message : err}`
    }
  }
}
</script>

<style lang="scss" scoped>
.copy-text-demo {
  .el-descriptions {
    margin-top: 4px;
  }
}
</style>
