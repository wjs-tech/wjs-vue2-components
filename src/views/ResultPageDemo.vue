<!--
  ============================================================
  ResultPage 结果页组件演示页
  
  wjs created by 2018-06-01
  ============================================================
-->
<template>
  <div class="result-page-demo">
    <el-card>
      <div slot="header">ResultPage 结果页组件演示</div>
      <p class="intro">
        本组件用于操作完成后的统一反馈。支持 success / warning / error / info 四种状态，
        可自定义标题、描述、底部操作按钮，并通过具名插槽扩展内容。
      </p>

      <el-form :inline="true" class="switch-bar">
        <el-form-item label="切换结果类型">
          <el-radio-group v-model="currentType">
            <el-radio-button label="success">成功</el-radio-button>
            <el-radio-button label="warning">警告</el-radio-button>
            <el-radio-button label="error">失败</el-radio-button>
            <el-radio-button label="info">提示</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>

      <ResultPage
        :type="currentType"
        :title="titleMap[currentType]"
        :description="descMap[currentType]"
        :extra-text="'示例数据：本次操作耗时约 1.2 秒，记录编号 TEST-20240101-001'"
        confirm-text="返回列表"
        close-text="查看详情"
        @confirm="handleConfirm"
        @close="handleClose"
      >
        <template slot="extra">
          <el-link type="primary" @click="handleViewLog">查看操作日志示例</el-link>
        </template>
      </ResultPage>
    </el-card>
  </div>
</template>

<script>
/**
 * ResultPage 演示
 * wjs created by 2018-06-01
 */
import ResultPage from '@/components/ResultPage/index.vue'

export default {
  name: 'ResultPageDemo',
  components: { ResultPage },
  data() {
    return {
      currentType: 'success',
      titleMap: {
        success: '提交成功',
        warning: '提交成功但有警告',
        error: '提交失败',
        info: '处理中'
      },
      descMap: {
        success: '您的示例申请已提交，系统正在处理，请稍候。',
        warning: '申请已提交，但部分字段使用了默认值，请留意。',
        error: '提交失败，请检查网络连接后重试。',
        info: '任务已加入队列，稍后可在列表中查看进度。'
      }
    }
  },
  methods: {
    handleConfirm() {
      this.$message.success('点击了「返回列表」')
    },
    handleClose() {
      this.$message.info('点击了「查看详情」')
    },
    handleViewLog() {
      this.$message.info('查看操作日志（示例）')
    }
  }
}
</script>

<style lang="scss" scoped>
.result-page-demo {
  .intro {
    color: #606266;
    font-size: 14px;
    line-height: 1.7;
    margin: 0 0 20px;
  }

  .switch-bar {
    margin-bottom: 10px;
  }
}
</style>
