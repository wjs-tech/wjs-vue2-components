<!--
  ============================================================
  ImagePreview 图片预览组件
  
  功能说明：
    基于 el-image 封装的「缩略图列表 + 大图预览」组件，解决多图场景下逐个配置 preview-src-list 的重复工作。
    支持缩略图网格布局、点击任意图预览大图、预览器内多图左右切换（zoom/z-index 控制），
    并可隐藏预览控制按钮（hide-on-click-modal 等），缩略图大小、列数可配置。
  
  Props:
    images: Array - 图片数组，元素可为字符串 url 或 { url, name }
    column: Number - 每行缩略图数量，默认 4
    size: [String, Number] - 缩略图尺寸，默认 100
    radius: [String, Number] - 缩略图圆角，默认 4
    fit: String - 缩略图填充方式，默认 cover
    hideControls: Boolean - 是否隐藏预览控制按钮，默认 false
  
  Events:
    无
  
  适用场景：
    - 商品 / 证件 / 附件等图片集合展示
    - 详情页多图查看
    - 需要统一缩略图样式的图片墙
  
  wjs created by 2019-04-18
  ============================================================
-->
<template>
  <div class="image-preview" :style="gridStyle">
    <div
      v-for="(item, index) in normalized"
      :key="index"
      class="image-preview-item"
      :style="{ width: sizeWithUnit, height: sizeWithUnit, borderRadius: radiusWithUnit }"
    >
      <el-image
        :src="item.url"
        :preview-src-list="srcList"
        :z-index="3000"
        :initial-index="index"
        :fit="fit"
        :hide-on-click-modal="hideControls"
        style="width: 100%; height: 100%;"
      >
        <div slot="error" class="image-preview-error">
          <i class="el-icon-picture-outline"></i>
        </div>
      </el-image>
      <span v-if="item.name" class="image-preview-name" :title="item.name">{{ item.name }}</span>
    </div>
    <div v-if="!normalized.length" class="image-preview-empty">暂无图片（示例）</div>
  </div>
</template>

<script>
/**
 * ImagePreview 图片预览组件
 * wjs created by 2019-04-18
 */
export default {
  name: 'ImagePreview',
  props: {
    images: {
      type: Array,
      default: () => []
    },
    column: {
      type: Number,
      default: 4
    },
    size: {
      type: [String, Number],
      default: 100
    },
    radius: {
      type: [String, Number],
      default: 4
    },
    fit: {
      type: String,
      default: 'cover'
    },
    hideControls: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    normalized() {
      return (this.images || []).map((it) => {
        if (typeof it === 'string') return { url: it, name: '' }
        return { url: it.url, name: it.name || '' }
      })
    },
    srcList() {
      return this.normalized.map((it) => it.url)
    },
    sizeWithUnit() {
      return typeof this.size === 'number' ? this.size + 'px' : this.size
    },
    radiusWithUnit() {
      return typeof this.radius === 'number' ? this.radius + 'px' : this.radius
    },
    gridStyle() {
      return {
        gridTemplateColumns: `repeat(${this.column}, ${this.sizeWithUnit})`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.image-preview {
  display: grid;
  gap: 10px;

  .image-preview-item {
    position: relative;
    overflow: hidden;
    border: 1px solid #ebeef5;
    box-sizing: border-box;
    cursor: pointer;

    .image-preview-error {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f5f7fa;
      color: #c0c4cc;
      font-size: 24px;
    }

    .image-preview-name {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 2px 4px;
      font-size: 12px;
      color: #fff;
      background: rgba(0, 0, 0, 0.5);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .image-preview-empty {
    color: #909399;
    font-size: 13px;
    padding: 20px 0;
  }
}
</style>
