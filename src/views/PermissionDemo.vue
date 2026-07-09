<!--
  ============================================================
  Permission 权限指令演示页
  
  wjs created by 2021-02-28
  ============================================================
-->
<template>
  <div class="permission-demo">
    <el-card>
      <div slot="header">Permission 权限指令演示</div>
      <p class="intro">
        v-permission 指令根据当前用户权限码控制元素显隐：无权限时元素被移除。
        下方模拟不同角色登录，切换后观察按钮的显示差异（示例：admin 可见「删除」，editor 仅可见「编辑」）。
      </p>

      <el-form :inline="true" class="role-bar">
        <el-form-item label="模拟当前角色">
          <el-radio-group v-model="role" @change="handleRoleChange">
            <el-radio-button label="admin">管理员 (admin)</el-radio-button>
            <el-radio-button label="editor">编辑 (editor)</el-radio-button>
            <el-radio-button label="guest">访客 (guest)</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>

      <el-alert
        :closable="false"
        :type="role === 'admin' ? 'success' : 'info'"
        :title="'当前权限码：[' + currentPermissions.join(', ') + ']'"
        style="margin-bottom: 16px;"
      />

      <!-- 通过 :key 强制重挂载按钮组，使 v-permission 指令重新判定 -->
      <div class="btn-group" :key="rerenderKey">
        <el-button type="primary">查看（公开）</el-button>
        <el-button v-permission="['editor', 'admin']" type="warning">编辑</el-button>
        <el-button v-permission="['admin']" type="danger">删除</el-button>
        <el-button v-permission="['admin']" type="success">导出</el-button>
        <el-button v-permission="['super']" type="info">超管操作</el-button>
      </div>

      <el-card style="margin-top: 16px;" shadow="never">
        <div slot="header">说明</div>
        <p class="tip">
          无权限的按钮（如访客角色的「编辑」「删除」）在 DOM 中被直接移除；
          <code>super</code> 权限任何角色都没有，因此「超管操作」始终不显示（示例）。
        </p>
      </el-card>
    </el-card>
  </div>
</template>

<script>
/**
 * Permission 指令演示
 * wjs created by 2021-02-28
 */
import permission, { setPermissions } from '@/directives/permission'

const roleMap = {
  admin: ['admin', 'editor', 'view'],
  editor: ['editor', 'view'],
  guest: ['view']
}

export default {
  name: 'PermissionDemo',
  directives: { permission },
  data() {
    return {
      role: 'admin',
      currentPermissions: roleMap.admin,
      rerenderKey: 0
    }
  },
  created() {
    setPermissions(this.currentPermissions)
  },
  methods: {
    handleRoleChange(role) {
      this.currentPermissions = roleMap[role] || []
      setPermissions(this.currentPermissions)
      this.rerenderKey += 1
      this.$message.info('已切换为 ' + role + ' 角色，按钮组已重新渲染')
    }
  }
}
</script>

<style lang="scss" scoped>
.permission-demo {
  .intro {
    color: #606266;
    font-size: 14px;
    line-height: 1.7;
    margin: 0 0 16px;

    code {
      background: #f5f7fa;
      padding: 1px 6px;
      border-radius: 3px;
      color: #e6a23c;
    }
  }

  .role-bar {
    margin-bottom: 8px;
  }

  .btn-group {
    .el-button {
      margin: 0 8px 8px 0;
    }
  }

  .tip {
    color: #606266;
    font-size: 13px;
    line-height: 1.7;
    margin: 0;
  }
}
</style>
