<!--
  ============================================================
  加载遮罩 LoadingMask 演示页
  
  wjs created by 2023-08-17
  ============================================================
-->
<template>
  <div class="loading-mask-demo">
    <PageHeader title="加载遮罩 LoadingMask" content="区域级 / 全屏级 loading 封装，基于 v-loading 指令与 Loading 服务，局部刷新更优雅">
    </PageHeader>

    <el-alert
      type="info"
      :closable="false"
      show-icon
      style="margin-bottom: 16px;"
      title="说明"
      description="默认覆盖插槽内容形成局部遮罩；设置 fullscreen 后调用 Loading 服务覆盖整屏。常用于局部刷新与整页初始化。"
    />

    <el-row :gutter="20">
      <el-col :span="12">
        <el-card>
          <div slot="header" class="card-head">
            <span>区域级遮罩（局部刷新）</span>
            <el-button size="small" type="primary" :loading="localLoading" @click="refreshLocal">
              局部刷新
            </el-button>
          </div>
          <LoadingMask :loading="localLoading" text="正在刷新示例数据…">
            <div class="panel">
              <p>这是被遮罩包裹的示例内容区域。</p>
              <p>点击「局部刷新」后，该区域会显示加载遮罩，2 秒后恢复。</p>
              <el-tag type="info">更新时间：{{ localTime }}</el-tag>
            </div>
          </LoadingMask>
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card>
          <div slot="header">全屏遮罩</div>
          <p>点击下方按钮后，组件会以 fullscreen + loading 触发整屏 Loading 遮罩，2 秒后自动关闭。</p>
          <el-button type="warning" @click="showFullscreen">显示全屏遮罩</el-button>
          <LoadingMask :loading="fsLoading" :fullscreen="true" text="整屏加载中…" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import LoadingMask from '@/components/LoadingMask/index.vue'

function formatTime(d) {
  const p = (n) => String(n).padStart(2, '0')
  return `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`
}

export default {
  name: 'LoadingMaskDemo',
  components: { LoadingMask },
  data() {
    return {
      localLoading: false,
      localTime: formatTime(new Date()),
      fsLoading: false
    }
  },
  methods: {
    refreshLocal() {
      this.localLoading = true
      setTimeout(() => {
        this.localLoading = false
        this.localTime = formatTime(new Date())
      }, 2000)
    },
    showFullscreen() {
      this.fsLoading = true
      setTimeout(() => {
        this.fsLoading = false
      }, 2000)
    }
  }
}
</script>

<style lang="scss" scoped>
.loading-mask-demo {
  .card-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .panel {
    min-height: 120px;
    line-height: 1.8;
    color: #606266;
  }
}
</style>
