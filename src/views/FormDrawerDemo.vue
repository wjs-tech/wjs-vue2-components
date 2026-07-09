<!--
  ============================================================
  FormDrawer 表单抽屉组件演示页
  
  wjs created by 2018-09-25
  ============================================================
-->
<template>
  <div class="form-drawer-demo">
    <el-card>
      <div slot="header">FormDrawer 表单抽屉组件演示</div>
      <p class="intro">
        表单抽屉在列表页「新增/编辑」场景下非常常见。FormDrawer 预置了底部固定的取消/提交操作栏，
        支持提交 loading、关闭前拦截（有未保存内容提示），业务侧只需通过默认插槽放入表单即可。
      </p>

      <el-button type="primary" @click="drawer = true">打开新增表单</el-button>

      <FormDrawer
        :visible.sync="drawer"
        :title="isEdit ? '编辑示例记录' : '新增示例记录'"
        :loading="loading"
        :before-close="handleBeforeClose"
        width="460px"
        @submit="handleSubmit"
        @cancel="drawer = false"
      >
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-form-item label="名称" prop="name">
            <el-input v-model="form.name" placeholder="请输入示例名称" />
          </el-form-item>
          <el-form-item label="类型" prop="type">
            <el-select v-model="form.type" placeholder="请选择" style="width: 100%;">
              <el-option label="示例类型A" value="A" />
              <el-option label="示例类型B" value="B" />
            </el-select>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="form.remark" type="textarea" :rows="3" placeholder="示例备注" />
          </el-form-item>
        </el-form>
      </FormDrawer>
    </el-card>
  </div>
</template>

<script>
/**
 * FormDrawer 演示
 * wjs created by 2018-09-25
 */
import FormDrawer from '@/components/FormDrawer/index.vue'

export default {
  name: 'FormDrawerDemo',
  components: { FormDrawer },
  data() {
    return {
      drawer: false,
      loading: false,
      isEdit: false,
      form: { name: '', type: '', remark: '' },
      rules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        type: [{ required: true, message: '请选择类型', trigger: 'change' }]
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (!valid) return
        this.loading = true
        // 模拟提交
        setTimeout(() => {
          this.loading = false
          this.drawer = false
          this.$message.success('提交成功（示例）')
        }, 800)
      })
    },
    handleBeforeClose() {
      if (this.form.name || this.form.type) {
        return this.$confirm('有未保存的内容，确定关闭吗？', '提示', {
          type: 'warning'
        }).then(() => true).catch(() => false)
      }
      return true
    }
  }
}
</script>

<style lang="scss" scoped>
.form-drawer-demo {
  .intro {
    color: #606266;
    font-size: 14px;
    line-height: 1.7;
    margin: 0 0 20px;
  }
}
</style>
