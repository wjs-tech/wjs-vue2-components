<!--
  ============================================================
  TablePro 高级表格组件演示页
  
  wjs created by 2019-08-01
  ============================================================
-->
<template>
  <div class="table-pro-demo">
    <PageHeader title="高级表格 TablePro" content="基于el-table封装，支持列配置、分页、格式化、自定义插槽">
      <el-button type="primary" icon="el-icon-plus">新增</el-button>
    </PageHeader>
    
    <el-card>
      <div slot="header">
        <span>基础用法</span>
      </div>
      
      <TablePro
        ref="table"
        :columns="columns"
        :data="tableData"
        :total="total"
        :page="page"
        :page-size="pageSize"
        :selection="true"
        :index="true"
        :loading="loading"
        @page-change="handlePageChange"
        @size-change="handleSizeChange"
        @selection-change="handleSelectionChange"
        @action="handleAction"
      >
        <!-- 自定义列插槽 -->
        <template slot="avatar" slot-scope="{ row }">
          <el-avatar :size="36" :src="row.avatar">{{ row.name.charAt(0) }}</el-avatar>
        </template>
      </TablePro>
    </el-card>
  </div>
</template>

<script>
/**
 * TablePro 组件演示
 * wjs created by 2019-08-01
 */
export default {
  name: 'TableProDemo',
  data() {
    return {
      loading: false,
      page: 1,
      pageSize: 10,
      total: 36,
      columns: [
        { prop: 'avatar', label: '头像', width: 80, slot: 'avatar', align: 'center' },
        { prop: 'name', label: '姓名', width: 100 },
        { prop: 'age', label: '年龄', width: 80, align: 'center' },
        { 
          prop: 'sex', 
          label: '性别', 
          width: 80, 
          align: 'center',
          type: 'tag',
          dict: [
            { value: '男', label: '男', type: '' },
            { value: '女', label: '女', type: 'danger' }
          ]
        },
        { prop: 'department', label: '部门', minWidth: 120 },
        { 
          prop: 'status', 
          label: '状态', 
          width: 100,
          align: 'center',
          type: 'status',
          dict: [
            { value: 1, label: '在职', type: 'success' },
            { value: 0, label: '离职', type: 'danger' },
            { value: 2, label: '休假', type: 'warning' }
          ]
        },
        { 
          prop: 'salary', 
          label: '薪资', 
          width: 120,
          align: 'right',
          type: 'money'
        },
        { 
          prop: 'createTime', 
          label: '入职时间', 
          width: 120,
          type: 'date',
          dateFormat: 'yyyy-MM-dd'
        },
        {
          prop: 'action',
          label: '操作',
          width: 180,
          fixed: 'right',
          align: 'center',
          type: 'action',
          actions: [
            { key: 'view', label: '查看' },
            { key: 'edit', label: '编辑' },
            { key: 'delete', label: '删除' }
          ]
        }
      ],
      tableData: []
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    loadData() {
      this.loading = true
      
      // 模拟数据
      setTimeout(() => {
        const data = []
        const names = ['张三', '李四', '王五', '赵六', '钱七', '孙八', '周九', '吴十', '郑十一', '冯十二']
        const departments = ['技术部', '产品部', '设计部', '运营部', '市场部']
        const statuses = [1, 0, 2]
        
        for (let i = 0; i < 10; i++) {
          data.push({
            id: i + 1,
            avatar: '',
            name: names[i % names.length],
            age: 22 + Math.floor(Math.random() * 20),
            sex: i % 2 === 0 ? '男' : '女',
            department: departments[i % departments.length],
            status: statuses[i % statuses.length],
            salary: 8000 + Math.floor(Math.random() * 10000),
            createTime: new Date(2020 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).getTime()
          })
        }
        
        this.tableData = data
        this.loading = false
      }, 500)
    },
    handlePageChange(page) {
      this.page = page
      this.loadData()
    },
    handleSizeChange(size) {
      this.pageSize = size
      this.page = 1
      this.loadData()
    },
    handleSelectionChange(selection) {
      console.log('选中：', selection)
    },
    handleAction(key, row) {
      this.$message.info(`点击了${key}，用户：${row.name}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.table-pro-demo {
}
</style>
