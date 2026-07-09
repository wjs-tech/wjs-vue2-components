<!--
  ============================================================
  PageHeader 页头组件演示页
  
  wjs created by 2019-04-01
  ============================================================
-->
<template>
  <div class="page-header-demo">
    <PageHeader title="页头组件 PageHeader" content="用于详情页、二级页面顶部，展示标题、描述、操作按钮">
    </PageHeader>
    
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card>
          <div slot="header">基础用法</div>
          <PageHeader
            title="用户详情"
            content="查看用户的详细信息"
            @back="handleBack"
          />
          <div style="margin-top: 20px; padding: 20px; background: #f5f7fa; border-radius: 4px;">
            <p>用户详情内容区域...</p>
          </div>
        </el-card>
      </el-col>
      
      <el-col :span="12">
        <el-card>
          <div slot="header">带标签和操作按钮</div>
          <PageHeader
            title="订单详情"
            content="订单号：202401010001"
            tag="已完成"
            tag-type="success"
          >
            <el-button type="primary">打印订单</el-button>
            <el-button>导出</el-button>
          </PageHeader>
          <div style="margin-top: 20px; padding: 20px; background: #f5f7fa; border-radius: 4px;">
            <p>订单详情内容区域...</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    
    <el-row :gutter="20" style="margin-top: 20px;">
      <el-col :span="12">
        <el-card>
          <div slot="header">不同状态标签</div>
          <PageHeader
            title="待审核申请"
            content="提交时间：2024-01-15 10:30"
            tag="待审核"
            tag-type="warning"
          >
            <el-button type="primary" size="small">审核通过</el-button>
            <el-button type="danger" size="small">驳回</el-button>
          </PageHeader>
        </el-card>
      </el-col>
      
      <el-col :span="12">
        <el-card>
          <div slot="header">自定义描述内容</div>
          <PageHeader
            title="项目名称"
          >
            <el-button type="text">编辑</el-button>
            <template slot="content">
              <div style="color: #909399; line-height: 1.6;">
                <p>负责人：张三</p>
                <p>项目周期：2024-01-01 至 2024-06-30</p>
              </div>
            </template>
          </PageHeader>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
/**
 * PageHeader 组件演示
 * wjs created by 2019-04-01
 */
export default {
  name: 'PageHeaderDemo',
  methods: {
    handleBack() {
      this.$message.info('点击了返回按钮')
    }
  }
}
</script>

<style lang="scss" scoped>
.page-header-demo {
}
</style>
