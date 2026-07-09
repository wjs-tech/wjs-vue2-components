<!--
  ============================================================
  StepsForm 分步表单组件演示页
  
  wjs created by 2019-11-20
  ============================================================
-->
<template>
  <div class="steps-form-demo">
    <el-card>
      <div slot="header">StepsForm 分步表单组件演示</div>
      <p class="intro">
        分步表单把较长的录入拆成多步，每步独立校验，只有当前步通过才能进入下一步。
        下面演示一个三步走「示例入驻」流程：基础信息 → 扩展配置 → 确认提交。
        注意：每个步骤的 el-form 需按约定设置 <code>ref="stepForm_步索引"</code>，组件据此做分步校验。
      </p>

      <StepsForm
        :steps="steps"
        :active.sync="active"
        :loading="loading"
        @submit="handleSubmit"
        @change="handleChange"
      >
        <template slot="step-0">
          <el-form ref="stepForm_0" :model="form1" :rules="rules1" label-width="90px">
            <el-form-item label="名称" prop="name">
              <el-input v-model="form1.name" placeholder="请输入示例名称" />
            </el-form-item>
            <el-form-item label="分类" prop="category">
              <el-select v-model="form1.category" placeholder="请选择" style="width: 100%;">
                <el-option label="示例分类A" value="A" />
                <el-option label="示例分类B" value="B" />
              </el-select>
            </el-form-item>
          </el-form>
        </template>

        <template slot="step-1">
          <el-form ref="stepForm_1" :model="form2" :rules="rules2" label-width="90px">
            <el-form-item label="联系人" prop="contact">
              <el-input v-model="form2.contact" placeholder="请输入联系人" />
            </el-form-item>
            <el-form-item label="联系电话" prop="phone">
              <el-input v-model="form2.phone" placeholder="请输入联系电话" />
            </el-form-item>
          </el-form>
        </template>

        <template slot="step-2">
          <el-alert type="info" :closable="false" title="请确认以下示例信息">
            <p>名称：{{ form1.name }}</p>
            <p>分类：{{ form1.category }}</p>
            <p>联系人：{{ form2.contact }}</p>
            <p>联系电话：{{ form2.phone }}</p>
          </el-alert>
        </template>
      </StepsForm>
    </el-card>
  </div>
</template>

<script>
/**
 * StepsForm 演示
 * wjs created by 2019-11-20
 */
import StepsForm from '@/components/StepsForm/index.vue'

export default {
  name: 'StepsFormDemo',
  components: { StepsForm },
  data() {
    return {
      steps: ['基础信息', '扩展配置', '确认提交'],
      active: 0,
      loading: false,
      form1: { name: '', category: '' },
      form2: { contact: '', phone: '' },
      rules1: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        category: [{ required: true, message: '请选择分类', trigger: 'change' }]
      },
      rules2: {
        contact: [{ required: true, message: '请输入联系人', trigger: 'blur' }],
        phone: [
          { required: true, message: '请输入联系电话', trigger: 'blur' },
          { pattern: /^1\d{10}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleChange(index) {
      this.$message.info('切换到第 ' + (index + 1) + ' 步')
    },
    handleSubmit() {
      this.loading = true
      setTimeout(() => {
        this.loading = false
        this.$message.success('示例提交成功')
      }, 800)
    }
  }
}
</script>

<style lang="scss" scoped>
.steps-form-demo {
  .intro {
    color: #606266;
    font-size: 14px;
    line-height: 1.7;
    margin: 0 0 20px;

    code {
      background: #f5f7fa;
      padding: 1px 6px;
      border-radius: 3px;
      color: #e6a23c;
    }
  }
}
</style>
