<!--
  ============================================================
  CrudTable 增删改查表格组件
  
  功能说明：
    基于 el-table + el-dialog 封装的「带新增/编辑弹窗」的 CRUD 表格容器，省去列表页重复的表格渲染、分页、弹窗表单样板。
    内置分页、搜索框、新增与编辑弹窗，通过 columns 声明列、通过表单 schema 声明弹窗字段，
    业务侧只需提供 fetch 列表方法与 submit 提交方法，即可获得完整增删改查能力。
  
  Props:
    columns: Array - 表格列配置 [{ prop, label, width, formatter }]
    formItems: Array - 弹窗表单字段 [{ prop, label, type, options, required }]
    fetchList: Function - 列表查询函数，入参 { page, size, keyword }，需返回 { list, total }
    submitForm: Function - 提交函数，入参为表单数据，返回 Promise
    deleteRow: Function - 删除函数，入参为行数据，返回 Promise
    title: String - 弹窗标题前缀，默认「记录」
    pageSize: Number - 每页条数，默认 10
  
  Events:
    saved - 新增/编辑保存成功后触发
    removed - 删除成功后触发
  
  适用场景：
    - 后台管理中的各类「列表 + 新增 + 编辑 + 删除」页面
    - 配置项、示例数据管理等标准 CRUD 场景
  
  wjs created by 2020-03-25
  ============================================================
-->
<template>
  <div class="crud-table">
    <div class="crud-table-toolbar">
      <el-input
        v-model="keyword"
        placeholder="搜索示例数据"
        style="width: 240px;"
        clearable
        @keyup.enter.native="handleSearch"
        @clear="handleSearch"
      >
        <el-button slot="append" icon="el-icon-search" @click="handleSearch" />
      </el-input>
      <el-button type="primary" icon="el-icon-plus" @click="handleAdd">新增</el-button>
    </div>

    <el-table :data="list" v-loading="loading" border stripe style="width: 100%;">
      <el-table-column type="index" label="#" width="50" />
      <el-table-column
        v-for="col in columns"
        :key="col.prop"
        :prop="col.prop"
        :label="col.label"
        :width="col.width"
        :formatter="col.formatter"
      />
      <el-table-column label="操作" width="160" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="text" class="danger-link" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="crud-table-pagination">
      <el-pagination
        :current-page="page"
        :page-size="pageSize"
        :total="total"
        layout="total, prev, pager, next, jumper"
        @current-change="handlePageChange"
      />
    </div>

    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="480px"
      @closed="resetForm"
    >
      <el-form ref="dialogForm" :model="form" :rules="formRules" label-width="90px">
        <el-form-item
          v-for="item in formItems"
          :key="item.prop"
          :label="item.label"
          :prop="item.prop"
        >
          <el-select
            v-if="item.type === 'select'"
            v-model="form[item.prop]"
            placeholder="请选择"
            style="width: 100%;"
          >
            <el-option
              v-for="opt in item.options"
              :key="opt.value"
              :label="opt.label"
              :value="opt.value"
            />
          </el-select>
          <el-input
            v-else-if="item.type === 'textarea'"
            v-model="form[item.prop]"
            type="textarea"
            :rows="3"
          />
          <el-input v-else v-model="form[item.prop]" :placeholder="'请输入' + item.label" />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" :loading="submitting" @click="handleSave">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
/**
 * CrudTable 增删改查表格组件
 * wjs created by 2020-03-25
 */
export default {
  name: 'CrudTable',
  props: {
    columns: { type: Array, default: () => [] },
    formItems: { type: Array, default: () => [] },
    fetchList: { type: Function, required: true },
    submitForm: { type: Function, required: true },
    deleteRow: { type: Function, default: null },
    title: { type: String, default: '记录' },
    pageSize: { type: Number, default: 10 }
  },
  data() {
    return {
      list: [],
      total: 0,
      page: 1,
      keyword: '',
      loading: false,
      dialogVisible: false,
      submitting: false,
      isEdit: false,
      editingId: '',
      form: {}
    }
  },
  computed: {
    dialogTitle() {
      return (this.isEdit ? '编辑' : '新增') + this.title
    },
    formRules() {
      const rules = {}
      this.formItems.forEach((it) => {
        if (it.required) {
          rules[it.prop] = [{ required: true, message: '请输入' + it.label, trigger: 'blur' }]
        }
      })
      return rules
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    async loadData() {
      if (typeof this.fetchList !== 'function') return
      this.loading = true
      try {
        const res = await this.fetchList({
          page: this.page,
          size: this.pageSize,
          keyword: this.keyword
        })
        this.list = res.list || []
        this.total = res.total || 0
      } finally {
        this.loading = false
      }
    },
    handleSearch() {
      this.page = 1
      this.loadData()
    },
    handlePageChange(p) {
      this.page = p
      this.loadData()
    },
    buildEmptyForm() {
      const f = {}
      this.formItems.forEach((it) => { f[it.prop] = it.type === 'select' ? '' : '' })
      return f
    },
    handleAdd() {
      this.isEdit = false
      this.editingId = ''
      this.form = this.buildEmptyForm()
      this.dialogVisible = true
    },
    handleEdit(row) {
      this.isEdit = true
      this.editingId = row.id
      this.form = { ...this.buildEmptyForm(), ...row }
      this.dialogVisible = true
    },
    resetForm() {
      this.$refs.dialogForm && this.$refs.dialogForm.resetFields()
    },
    handleSave() {
      this.$refs.dialogForm.validate((valid) => {
        if (!valid) return
        this.submitting = true
        const payload = { ...this.form }
        if (this.isEdit) payload.id = this.editingId
        this.submitForm(payload)
          .then(() => {
            this.$message.success('保存成功（示例）')
            this.dialogVisible = false
            this.loadData()
            this.$emit('saved', payload)
          })
          .finally(() => { this.submitting = false })
      })
    },
    handleDelete(row) {
      if (!this.deleteRow) {
        this.$message.warning('未配置删除方法')
        return
      }
      this.$confirm('确定删除该示例记录吗？', '提示', { type: 'warning' })
        .then(() => this.deleteRow(row))
        .then(() => {
          this.$message.success('删除成功（示例）')
          this.loadData()
          this.$emit('removed', row)
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
.crud-table {
  .crud-table-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }

  .crud-table-pagination {
    margin-top: 16px;
    text-align: right;
  }

  .danger-link {
    color: #f56c6c;
  }
}
</style>
