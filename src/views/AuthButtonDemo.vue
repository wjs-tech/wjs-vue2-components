<!--
  ============================================================
  AuthButton 权限按钮组件演示页
  
  wjs created by 2022-01-20
  ============================================================
-->
<template>
  <div class="auth-button-demo">
    <PageHeader title="权限按钮 AuthButton" content="带权限判断与防重复点击的按钮组件"></PageHeader>

    <el-alert
      type="info"
      :closable="false"
      title="说明"
      description="当前权限已切换：开启时拥有 save / delete 权限；关闭时仅保留 save。删除按钮配置了无权限隐藏。"
      style="margin-bottom: 16px;"
    ></el-alert>

    <el-card>
      <div slot="header">
        <span>权限控制</span>
        <el-switch
          v-model="hasPermission"
          active-text="有全部权限"
          inactive-text="无删除权限"
          style="float: right;"
        ></el-switch>
      </div>

      <div class="demo-row">
        <AuthButton
          type="primary"
          auth="save"
          :permission-list="permissionList"
          :hide-when-no-auth="false"
          @click="handleSave"
        >保存示例数据</AuthButton>

        <AuthButton
          type="danger"
          auth="delete"
          :permission-list="permissionList"
          :hide-when-no-auth="true"
          @click="handleDelete"
        >删除示例数据</AuthButton>
      </div>
      <p class="tip">提示：保存按钮点击后会进入 loading 约 1.5s，期间重复点击被拦截。</p>
    </el-card>

    <el-card style="margin-top: 16px;">
      <div slot="header">操作日志</div>
      <pre class="log">{{ logText }}</pre>
    </el-card>
  </div>
</template>

<script>
/**
 * AuthButton 组件演示
 * wjs created by 2022-01-20
 */
import AuthButton from '@/components/AuthButton/index.vue'

export default {
  name: 'AuthButtonDemo',
  components: { AuthButton },
  data() {
    return {
      hasPermission: true,
      logs: []
    }
  },
  computed: {
    permissionList() {
      return this.hasPermission ? ['save', 'delete'] : ['save']
    },
    logText() {
      return this.logs.length ? this.logs.join('\n') : '（暂无操作）'
    }
  },
  methods: {
    // 返回 Promise 以演示防连点：loading 持续到 Promise 完成
    handleSave() {
      this.log('点击「保存示例数据」')
      return new Promise(resolve => {
        setTimeout(() => {
          this.log('保存成功（模拟接口 1.5s）')
          this.$message.success('保存成功')
          resolve()
        }, 1500)
      })
    },
    handleDelete() {
      this.log('点击「删除示例数据」')
      return new Promise(resolve => {
        setTimeout(() => {
          this.log('删除成功（模拟接口 1.5s）')
          this.$message.success('删除成功')
          resolve()
        }, 1500)
      })
    },
    log(text) {
      const time = new Date().toLocaleTimeString()
      this.logs.push(`[${time}] ${text}`)
      this.logs = this.logs.slice(-8)
    }
  }
}
</script>

<style lang="scss" scoped>
.auth-button-demo {
  .demo-row {
    display: flex;
    gap: 16px;
    align-items: center;
  }
  .tip {
    color: #909399;
    font-size: 12px;
    margin-top: 12px;
  }
  .log {
    background: #2d2d2d;
    color: #9cdcfe;
    padding: 12px;
    border-radius: 4px;
    font-size: 12px;
    min-height: 80px;
    margin: 0;
  }
}
</style>
