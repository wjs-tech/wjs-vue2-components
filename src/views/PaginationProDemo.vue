<!--
  ============================================================
  PaginationPro 分页增强组件演示页
  
  wjs created by 2020-08-19
  ============================================================
-->
<template>
  <div class="pagination-pro-demo">
    <PageHeader title="分页增强 PaginationPro" content="基于 el-pagination，支持 .sync 双向绑定与统一 change 事件"></PageHeader>

    <el-card>
      <div slot="header">示例：分页加载示例列表</div>
      <el-table :data="pageData" size="small" border>
        <el-table-column prop="id" label="编号" width="80"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="type" label="类型"></el-table-column>
      </el-table>

      <PaginationPro
        :total="total"
        :page.sync="page"
        :size.sync="size"
        :auto-hidden="autoHidden"
        @change="loadData"
        style="margin-top: 12px;"
      ></PaginationPro>
    </el-card>

    <el-card style="margin-top: 16px;">
      <div slot="header">配置</div>
      <el-form label-width="120px" style="max-width: 480px;">
        <el-form-item label="单页自动隐藏">
          <el-switch v-model="autoHidden"></el-switch>
          <span class="tip">（总条数 ≤ 每页条数时自动隐藏分页条）</span>
        </el-form-item>
        <el-form-item label="当前页 / 每页">
          <span class="value">第 {{ page }} 页 / 每页 {{ size }} 条</span>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
/**
 * PaginationPro 组件演示
 * wjs created by 2020-08-19
 */
import PaginationPro from '@/components/PaginationPro/index.vue'

export default {
  name: 'PaginationProDemo',
  components: { PaginationPro },
  data() {
    const allData = []
    const types = ['示例类型A', '示例类型B', '示例类型C']
    for (let i = 1; i <= 87; i++) {
      allData.push({
        id: i,
        name: '示例记录_' + i,
        type: types[i % 3]
      })
    }
    return {
      allData,
      total: 87,
      page: 1,
      size: 10,
      autoHidden: false,
      pageData: []
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    loadData() {
      const start = (this.page - 1) * this.size
      // 模拟根据分页切片（真实场景此处为接口请求）
      this.pageData = this.allData.slice(start, start + this.size)
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination-pro-demo {
  .tip {
    color: #909399;
    font-size: 12px;
    margin-left: 8px;
  }
  .value {
    color: #409eff;
    font-size: 13px;
  }
}
</style>
