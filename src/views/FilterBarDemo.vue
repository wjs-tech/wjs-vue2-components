<!--
  ============================================================
  FilterBar 筛选栏组件演示页
  
  wjs created by 2020-07-22
  ============================================================
-->
<template>
  <div class="filter-bar-demo">
    <el-card>
      <div slot="header">FilterBar 筛选栏组件演示</div>
      <p class="intro">
        FilterBar 是列表页顶部的可折叠筛选栏。字段过多时默认只显示前几个，点击「展开」显示全部；
        点击「查询」回传筛选条件对象，点击「重置」清空并触发查询。下方为示例字段演示。
      </p>

      <FilterBar
        :items="items"
        :loading="loading"
        :collapse="true"
        :show-count="3"
        @search="handleSearch"
        @reset="handleReset"
      />

      <el-card style="margin-top: 16px;" shadow="never">
        <div slot="header">查询条件（实时回传）</div>
        <pre class="result-json">{{ JSON.stringify(lastQuery, null, 2) }}</pre>
      </el-card>
    </el-card>
  </div>
</template>

<script>
/**
 * FilterBar 演示
 * wjs created by 2020-07-22
 */
import FilterBar from '@/components/FilterBar/index.vue'

export default {
  name: 'FilterBarDemo',
  components: { FilterBar },
  data() {
    return {
      loading: false,
      lastQuery: {},
      items: [
        { prop: 'name', label: '名称' },
        { prop: 'type', label: '类型', type: 'select',
          options: [{ label: '示例类型A', value: 'A' }, { label: '示例类型B', value: 'B' }] },
        { prop: 'status', label: '状态', type: 'select',
          options: [{ label: '启用', value: '启用' }, { label: '禁用', value: '禁用' }] },
        { prop: 'creator', label: '创建人' },
        { prop: 'startDate', label: '开始日期', type: 'date' },
        { prop: 'endDate', label: '结束日期', type: 'date' }
      ]
    }
  },
  methods: {
    handleSearch(query) {
      this.loading = true
      this.lastQuery = query
      setTimeout(() => {
        this.loading = false
        this.$message.success('已触发查询（示例），回传条件见下方')
      }, 400)
    },
    handleReset() {
      this.lastQuery = {}
      this.$message.info('已重置筛选条件')
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-bar-demo {
  .intro {
    color: #606266;
    font-size: 14px;
    line-height: 1.7;
    margin: 0 0 16px;
  }

  .result-json {
    background: #f5f7fa;
    padding: 12px;
    border-radius: 4px;
    font-size: 13px;
    color: #303133;
    margin: 0;
  }
}
</style>
