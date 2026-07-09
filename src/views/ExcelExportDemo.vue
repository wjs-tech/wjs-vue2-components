<!--
  ============================================================
  ExcelExport 导出按钮组件演示页
  
  wjs created by 2023-11-22
  ============================================================
-->
<template>
  <div class="excel-export-demo">
    <PageHeader title="导出按钮 ExcelExport" content="纯前端分片导出 CSV / 简易 Excel，带进度反馈"></PageHeader>

    <el-card>
      <div slot="header">导出示例数据（5000 行）</div>
      <div class="btns">
        <ExcelExport
          :data="tableData"
          :columns="columns"
          file-name="示例数据"
          type="excel"
          button-text="导出 Excel"
          @success="onSuccess"
        ></ExcelExport>

        <ExcelExport
          :data="tableData"
          :columns="columns"
          file-name="示例数据"
          type="csv"
          btn-type="success"
          button-text="导出 CSV"
        ></ExcelExport>
      </div>
      <p class="tip">点击后按钮进入 loading 并显示进度，导出为纯前端 Blob 下载，无需后端配合。</p>
    </el-card>

    <el-card style="margin-top: 16px;">
      <div slot="header">数据预览（前 5 行）</div>
      <el-table :data="tableData.slice(0, 5)" size="small" border>
        <el-table-column prop="id" label="编号" width="80"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="type" label="类型"></el-table-column>
        <el-table-column prop="amount" label="数量"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
/**
 * ExcelExport 组件演示
 * wjs created by 2023-11-22
 */
import ExcelExport from '@/components/ExcelExport/index.vue'

export default {
  name: 'ExcelExportDemo',
  components: { ExcelExport },
  data() {
    const types = ['示例类型A', '示例类型B', '示例类型C']
    const tableData = []
    for (let i = 1; i <= 5000; i++) {
      tableData.push({
        id: i,
        name: '示例记录_' + i,
        type: types[i % 3],
        amount: Math.round(Math.random() * 1000)
      })
    }
    return {
      tableData,
      columns: [
        { prop: 'id', label: '编号' },
        { prop: 'name', label: '名称' },
        { prop: 'type', label: '类型' },
        { prop: 'amount', label: '数量' }
      ]
    }
  },
  methods: {
    onSuccess(fileName) {
      // eslint-disable-next-line no-console
      console.log('[ExcelExport] 导出完成：', fileName)
    }
  }
}
</script>

<style lang="scss" scoped>
.excel-export-demo {
  .btns {
    display: flex;
    gap: 16px;
    align-items: center;
    flex-wrap: wrap;
  }
  .tip {
    color: #909399;
    font-size: 12px;
    margin-top: 12px;
  }
}
</style>
