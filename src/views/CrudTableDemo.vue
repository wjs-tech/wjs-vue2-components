<!--
  ============================================================
  CrudTable 增删改查表格组件演示页
  
  wjs created by 2020-04-10
  ============================================================
-->
<template>
  <div class="crud-table-demo">
    <el-card>
      <div slot="header">CrudTable 增删改查表格组件演示</div>
      <p class="intro">
        CrudTable 把「表格 + 搜索 + 分页 + 新增/编辑弹窗 + 删除」打包成一个组件。
        业务侧只需声明 columns（列）、formItems（弹窗字段），并提供 fetchList / submitForm / deleteRow 三个方法即可。
        下方为示例数据演示。
      </p>

      <CrudTable
        :columns="columns"
        :form-items="formItems"
        :fetch-list="fetchList"
        :submit-form="submitForm"
        :delete-row="deleteRow"
        title="示例记录"
        @saved="onSaved"
        @removed="onRemoved"
      />
    </el-card>
  </div>
</template>

<script>
/**
 * CrudTable 演示
 * wjs created by 2020-04-10
 */
import CrudTable from '@/components/CrudTable/index.vue'

// 示例内存数据（脱敏）
const mockData = []
for (let i = 1; i <= 23; i++) {
  mockData.push({
    id: i,
    name: '示例记录 ' + i,
    type: i % 2 === 0 ? 'A' : 'B',
    status: i % 3 === 0 ? '禁用' : '启用',
    createTime: '2024-01-' + String((i % 28) + 1).padStart(2, '0')
  })
}

export default {
  name: 'CrudTableDemo',
  components: { CrudTable },
  data() {
    return {
      columns: [
        { prop: 'name', label: '名称', width: '180' },
        { prop: 'type', label: '类型', width: '100',
          formatter: (r) => (r.type === 'A' ? '示例类型A' : '示例类型B') },
        { prop: 'status', label: '状态', width: '100' },
        { prop: 'createTime', label: '创建时间' }
      ],
      formItems: [
        { prop: 'name', label: '名称', required: true },
        { prop: 'type', label: '类型', type: 'select', required: true,
          options: [{ label: '示例类型A', value: 'A' }, { label: '示例类型B', value: 'B' }] },
        { prop: 'status', label: '状态', type: 'select',
          options: [{ label: '启用', value: '启用' }, { label: '禁用', value: '禁用' }] },
        { prop: 'remark', label: '备注', type: 'textarea' }
      ]
    }
  },
  methods: {
    fetchList({ page, size, keyword }) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const filtered = mockData.filter(
            (d) => !keyword || d.name.indexOf(keyword) > -1
          )
          const start = (page - 1) * size
          resolve({
            list: filtered.slice(start, start + size),
            total: filtered.length
          })
        }, 300)
      })
    },
    submitForm(payload) {
      return new Promise((resolve) => {
        setTimeout(() => {
          if (payload.id) {
            const idx = mockData.findIndex((d) => d.id === payload.id)
            if (idx > -1) mockData[idx] = { ...mockData[idx], ...payload }
          } else {
            mockData.unshift({
              id: mockData.length + 1,
              name: payload.name,
              type: payload.type,
              status: payload.status || '启用',
              createTime: '2024-01-01'
            })
          }
          resolve()
        }, 400)
      })
    },
    deleteRow(row) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const idx = mockData.findIndex((d) => d.id === row.id)
          if (idx > -1) mockData.splice(idx, 1)
          resolve()
        }, 300)
      })
    },
    onSaved() {},
    onRemoved() {}
  }
}
</script>

<style lang="scss" scoped>
.crud-table-demo {
  .intro {
    color: #606266;
    font-size: 14px;
    line-height: 1.7;
    margin: 0 0 20px;
  }
}
</style>
