<!--
  ============================================================
  TableSelect 下拉表格选择组件演示页
  
  wjs created by 2023-03-15
  ============================================================
-->
<template>
  <div class="table-select-demo">
    <PageHeader title="下拉表格选择 TableSelect" content="下拉内嵌表格，支持搜索、分页与行选中回填"></PageHeader>

    <el-card>
      <div slot="header">从示例用户中挑选</div>
      <el-form label-width="100px" style="max-width: 520px;">
        <el-form-item label="选择用户">
          <TableSelect
            v-model="selectedUser"
            :data="userList"
            :columns="columns"
            :filter-keys="['name', 'dept', 'email']"
            placeholder="点击选择用户"
            style="width: 100%;"
          ></TableSelect>
        </el-form-item>
        <el-form-item label="选中结果">
          <pre class="result">{{ selectedUser ? JSON.stringify(selectedUser, null, 2) : '（未选择）' }}</pre>
        </el-form-item>
      </el-form>
      <p class="tip">下拉面板内可输入关键字搜索、翻页；点击任意行即回填整行对象。</p>
    </el-card>
  </div>
</template>

<script>
/**
 * TableSelect 组件演示
 * wjs created by 2023-03-15
 */
import TableSelect from '@/components/TableSelect/index.vue'

export default {
  name: 'TableSelectDemo',
  components: { TableSelect },
  data() {
    return {
      selectedUser: null,
      columns: [
        { prop: 'id', label: '编号', width: 70 },
        { prop: 'name', label: '姓名', width: 100 },
        { prop: 'dept', label: '部门', width: 120 },
        { prop: 'email', label: '邮箱' }
      ],
      // 脱敏示例数据
      userList: [
        { id: 1, name: '示例用户一', dept: '示例部门A', email: 'user1@example.com' },
        { id: 2, name: '示例用户二', dept: '示例部门B', email: 'user2@example.com' },
        { id: 3, name: '示例用户三', dept: '示例部门A', email: 'user3@example.com' },
        { id: 4, name: '示例用户四', dept: '示例部门C', email: 'user4@example.com' },
        { id: 5, name: '示例用户五', dept: '示例部门B', email: 'user5@example.com' },
        { id: 6, name: '示例用户六', dept: '示例部门C', email: 'user6@example.com' },
        { id: 7, name: '示例用户七', dept: '示例部门A', email: 'user7@example.com' },
        { id: 8, name: '示例用户八', dept: '示例部门B', email: 'user8@example.com' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.table-select-demo {
  .result {
    background: #f5f7fa;
    border-radius: 4px;
    padding: 10px;
    font-size: 12px;
    margin: 0;
  }
  .tip {
    color: #909399;
    font-size: 12px;
    margin-top: 12px;
  }
}
</style>
