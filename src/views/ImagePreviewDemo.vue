<!--
  ============================================================
  ImagePreview 图片预览组件演示页
  
  wjs created by 2019-05-02
  ============================================================
-->
<template>
  <div class="image-preview-demo">
    <el-card>
      <div slot="header">ImagePreview 图片预览组件演示</div>
      <p class="intro">
        图片预览组件接收图片数组，自动渲染缩略图网格，点击任意缩略图即可用 el-image 预览大图，
        并在预览器中支持左右切换。支持配置每行数量、缩略图尺寸、圆角等。
      </p>

      <el-form :inline="true" class="opt-bar">
        <el-form-item label="每行数量">
          <el-select v-model="column" style="width: 100px;">
            <el-option :value="3" label="3" />
            <el-option :value="4" label="4" />
            <el-option :value="6" label="6" />
          </el-select>
        </el-form-item>
        <el-form-item label="隐藏控制按钮">
          <el-switch v-model="hideControls" />
        </el-form-item>
      </el-form>

      <ImagePreview
        :images="images"
        :column="column"
        :size="100"
        :hide-controls="hideControls"
      />
    </el-card>
  </div>
</template>

<script>
/**
 * ImagePreview 演示
 * wjs created by 2019-05-02
 */
import ImagePreview from '@/components/ImagePreview/index.vue'

export default {
  name: 'ImagePreviewDemo',
  components: { ImagePreview },
  data() {
    return {
      column: 4,
      hideControls: false,
      images: [
        { url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><defs><linearGradient id="g1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="%2366a6ff"/><stop offset="1" stop-color="%2389f7fe"/></linearGradient></defs><rect width="200" height="200" fill="url(%23g1)"/><text x="100" y="105" font-size="20" fill="%23fff" text-anchor="middle" font-family="sans-serif">示例图 1</text></svg>', name: '示例图1' },
        { url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><defs><linearGradient id="g2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="%23f093fb"/><stop offset="1" stop-color="%23f5576c"/></linearGradient></defs><rect width="200" height="200" fill="url(%23g2)"/><text x="100" y="105" font-size="20" fill="%23fff" text-anchor="middle" font-family="sans-serif">示例图 2</text></svg>', name: '示例图2' },
        { url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><defs><linearGradient id="g3" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="%2343e97b"/><stop offset="1" stop-color="%2338f9d7"/></linearGradient></defs><rect width="200" height="200" fill="url(%23g3)"/><text x="100" y="105" font-size="20" fill="%23fff" text-anchor="middle" font-family="sans-serif">示例图 3</text></svg>', name: '示例图3' },
        { url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><defs><linearGradient id="g4" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="%23fa709a"/><stop offset="1" stop-color="%23fee140"/></linearGradient></defs><rect width="200" height="200" fill="url(%23g4)"/><text x="100" y="105" font-size="20" fill="%23fff" text-anchor="middle" font-family="sans-serif">示例图 4</text></svg>', name: '示例图4' },
        { url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><defs><linearGradient id="g5" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="%233086ff"/><stop offset="1" stop-color="%23304300"/></linearGradient></defs><rect width="200" height="200" fill="url(%23g5)"/><text x="100" y="105" font-size="20" fill="%23fff" text-anchor="middle" font-family="sans-serif">示例图 5</text></svg>', name: '示例图5' },
        { url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><defs><linearGradient id="g6" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="%23ee9ca7"/><stop offset="1" stop-color="%23ffdde1"/></linearGradient></defs><rect width="200" height="200" fill="url(%23g6)"/><text x="100" y="105" font-size="20" fill="%23fff" text-anchor="middle" font-family="sans-serif">示例图 6</text></svg>', name: '示例图6' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.image-preview-demo {
  .intro {
    color: #606266;
    font-size: 14px;
    line-height: 1.7;
    margin: 0 0 16px;
  }

  .opt-bar {
    margin-bottom: 10px;
  }
}
</style>
