<!--
  ============================================================
  空状态 EmptyState 演示页
  
  wjs created by 2023-04-22
  ============================================================
-->
<template>
  <div class="empty-state-demo">
    <PageHeader title="空状态 EmptyState" content="基于 el-empty 封装，统一缺省页插画与文案，支持类型切换与底部操作区">
    </PageHeader>

    <el-alert
      type="info"
      :closable="false"
      show-icon
      style="margin-bottom: 16px;"
      title="说明"
      description="通过 type 切换不同场景的缺省插画与文案；默认插槽可放置「刷新 / 返回」等操作按钮。"
    />

    <el-card>
      <div slot="header">场景类型切换</div>
      <el-radio-group v-model="type" size="small" style="margin-bottom: 16px;">
        <el-radio-button label="no-data">无数据</el-radio-button>
        <el-radio-button label="no-permission">无权限</el-radio-button>
        <el-radio-button label="error">加载失败</el-radio-button>
        <el-radio-button label="search">搜索无结果</el-radio-button>
        <el-radio-button label="network">网络异常</el-radio-button>
      </el-radio-group>

      <EmptyState :type="type" :image-size="120">
        <el-button type="primary" size="small" @click="onAction">重新加载</el-button>
        <el-button size="small">返回上一页</el-button>
      </EmptyState>
    </el-card>

    <el-row :gutter="20" style="margin-top: 16px;">
      <el-col :span="12">
        <el-card>
          <div slot="header">列表无数据</div>
          <EmptyState type="no-data" description="暂无示例数据，点击新增试试" :image-size="90">
            <el-button type="primary" size="small" icon="el-icon-plus">新增示例</el-button>
          </EmptyState>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div slot="header">搜索无结果</div>
          <EmptyState type="search" description="没有找到与「示例关键词」相关的内容" :image-size="90" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import EmptyState from '@/components/EmptyState/index.vue'

export default {
  name: 'EmptyStateDemo',
  components: { EmptyState },
  data() {
    return {
      type: 'no-data'
    }
  },
  methods: {
    onAction() {
      this.$message.success('已触发重新加载（示例）')
    }
  }
}
</script>

<style lang="scss" scoped>
.empty-state-demo {
  .el-button {
    margin: 0 4px;
  }
}
</style>
