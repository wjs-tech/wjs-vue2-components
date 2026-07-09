<!--
  ============================================================
  返回顶部 BackTop 演示页
  
  wjs created by 2021-06-09
  ============================================================
-->
<template>
  <div class="back-top-demo">
    <PageHeader title="返回顶部 BackTop" content="基于 el-backtop 封装，监听滚动并在超过阈值后浮现，可指定容器、触发高度与文案">
    </PageHeader>

    <el-alert
      type="info"
      :closable="false"
      show-icon
      style="margin-bottom: 16px;"
      title="说明"
      description="target 留空时监听 window 滚动；传入滚动容器选择器（如本例的 #backtop-target）则监听该容器。滚动超过 visibilityHeight 后按钮浮现，点击平滑回到顶部。"
    />

    <el-card>
      <div slot="header" class="card-head">
        <span>容器内返回顶部（target 指定滚动容器）</span>
        <span style="color: #909399; font-size: 13px;">向下滚动查看右下角按钮</span>
      </div>
      <div id="backtop-target" class="scroll-box">
        <p v-for="n in 40" :key="n" class="scroll-line">示例内容第 {{ n }} 行 —— 用于演示滚动触发返回顶部按钮。</p>
        <BackTop target="#backtop-target" :visibility-height="120" text="顶部" />
      </div>
    </el-card>

    <el-card style="margin-top: 16px;">
      <div slot="header">仅图标（不显示文案）</div>
      <div id="backtop-target-2" class="scroll-box scroll-box--sm">
        <p v-for="n in 20" :key="n" class="scroll-line">另一容器的示例内容第 {{ n }} 行。</p>
        <BackTop target="#backtop-target-2" :visibility-height="80" />
      </div>
    </el-card>
  </div>
</template>

<script>
import BackTop from '@/components/BackTop/index.vue'

export default {
  name: 'BackTopDemo',
  components: { BackTop }
}
</script>

<style lang="scss" scoped>
.back-top-demo {
  .card-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .scroll-box {
    height: 320px;
    overflow-y: auto;
    padding: 12px 16px;
    border: 1px solid #ebeef5;
    border-radius: 4px;
    background: #fafafa;

    &--sm {
      height: 220px;
    }

    .scroll-line {
      margin: 0;
      padding: 10px 0;
      border-bottom: 1px dashed #eee;
      color: #606266;
    }
  }
}
</style>
