<!--
  ============================================================
  FormDialog 表单弹窗组件演示页
  
  wjs created by 2020-03-12
  ============================================================
-->
<template>
  <div class="form-dialog-demo">
    <PageHeader title="表单弹窗 FormDialog" content="通用弹窗/确认框，内置确定/取消与提交 loading"></PageHeader>

    <el-alert
      type="info"
      :closable="false"
      title="说明"
      description="FormDialog 基于 el-dialog 封装：通过默认插槽放入内容，submit 事件在外部控制 submitLoading 实现防重复提交。"
      style="margin-bottom: 16px;"
    ></el-alert>

    <el-card>
      <div slot="header">示例一：删除确认</div>
      <el-button type="danger" @click="confirmVisible = true">删除示例数据</el-button>
      <FormDialog
        :visible.sync="confirmVisible"
        title="删除确认"
        submit-text="确认删除"
        submit-type="danger"
        :submit-loading="confirmLoading"
        @submit="handleConfirmDelete"
        @cancel="confirmVisible = false"
      >
        <p>确定要删除该条示例数据吗？此操作不可恢复。</p>
      </FormDialog>
    </el-card>

    <el-card style="margin-top: 16px;">
      <div slot="header">示例二：新增表单</div>
      <el-button type="primary" @click="formVisible = true">新增示例</el-button>
      <FormDialog
        :visible.sync="formVisible"
        title="新增示例"
        :submit-loading="formLoading"
        @submit="handleCreate"
        @cancel="formVisible = false"
      >
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="名称" required>
            <el-input v-model="form.name" placeholder="请输入名称"></el-input>
          </el-form-item>
          <el-form-item label="说明">
            <el-input v-model="form.desc" type="textarea" placeholder="请输入说明"></el-input>
          </el-form-item>
        </el-form>
      </FormDialog>
    </el-card>
  </div>
</template>

<script>
/**
 * FormDialog 组件演示
 * wjs created by 2020-03-12
 */
import FormDialog from '@/components/FormDialog/index.vue'

export default {
  name: 'FormDialogDemo',
  components: { FormDialog },
  data() {
    return {
      confirmVisible: false,
      confirmLoading: false,
      formVisible: false,
      formLoading: false,
      form: { name: '', desc: '' }
    }
  },
  methods: {
    handleConfirmDelete() {
      this.confirmLoading = true
      setTimeout(() => {
        this.confirmLoading = false
        this.confirmVisible = false
        this.$message.success('删除成功')
      }, 1200)
    },
    handleCreate() {
      if (!this.form.name) {
        this.$message.warning('请填写名称')
        return
      }
      this.formLoading = true
      setTimeout(() => {
        this.formLoading = false
        this.formVisible = false
        this.$message.success('新增成功')
        this.form = { name: '', desc: '' }
      }, 1200)
    }
  }
}
</script>

<style lang="scss" scoped>
.form-dialog-demo {
}
</style>
