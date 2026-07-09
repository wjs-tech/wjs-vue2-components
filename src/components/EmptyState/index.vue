<!--
  ============================================================
  空状态 EmptyState 组件
  
  功能说明：
    基于 el-empty 封装的缺省页组件，统一项目的无数据插画与文案风格
    通过 type 快速切换「无数据 / 无权限 / 加载失败 / 搜索无结果 / 网络异常」等场景
    支持自定义插画、文案与底部操作区插槽，集中治理空页面体验
  
  Props:
    type: String - 场景类型 no-data|no-permission|error|search|network，默认 no-data
    description: String - 描述文案，不传则使用类型默认值
    imageSize: Number - 插画尺寸(px)，默认 100
    image: String - 自定义插画地址，传入后优先于内置插画
  
  Events:
    无
  
  适用场景：
    - 列表 / 表格无数据
    - 搜索无结果
    - 接口报错 / 无权限 / 断网兜底
  
  wjs created by 2023-04-22
  ============================================================
-->
<template>
  <el-empty
    class="wjs-empty"
    :image-size="imageSize"
    :description="finalDescription"
  >
    <!-- 自定义插画：优先使用传入 image，否则渲染类型内置 SVG -->
    <template v-if="!image" slot="image">
      <div class="wjs-empty__svg" v-html="svgOfType"></div>
    </template>
    <img v-else :src="image" :style="{ width: imageSize + 'px' }" />

    <!-- 底部操作区 -->
    <slot />
  </el-empty>
</template>

<script>
/**
 * EmptyState 空状态组件
 *
 * 封装 el-empty，内置多种场景插画，统一缺省页风格。
 *
 * @property {String} type - 场景类型
 * @property {String} description - 描述文案
 * @property {Number} imageSize - 插画尺寸
 * @property {String} image - 自定义插画地址
 *
 * wjs created by 2023-04-22
 */
export default {
  name: 'EmptyState',
  props: {
    type: {
      type: String,
      default: 'no-data'
    },
    description: {
      type: String,
      default: ''
    },
    imageSize: {
      type: Number,
      default: 100
    },
    image: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // 各场景默认文案
      descMap: {
        'no-data': '暂无数据',
        'no-permission': '暂无访问权限',
        error: '加载失败，请稍后重试',
        search: '未找到相关内容',
        network: '网络连接异常'
      },
      // 各场景内置 SVG 插画（静态、内部使用，安全）
      svgMap: {
        'no-data':
          '<svg viewBox="0 0 64 41" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><path d="M62 40H2V8h16v8h12V8h16v8h16v24zM14 14H6v4h8v-4zm36 0h-8v4h8v-4z" fill="#C0C4CC"/></svg>',
        'no-permission':
          '<svg viewBox="0 0 64 64" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><path d="M32 4a28 28 0 1 0 0 56 28 28 0 0 0 0-56zm0 8a8 8 0 0 1 8 8v6H24v-6a8 8 0 0 1 8-8zm0 28a6 6 0 0 1-6-6h12a6 6 0 0 1-6 6z" fill="#E6A23C"/></svg>',
        error:
          '<svg viewBox="0 0 64 64" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><path d="M32 4a28 28 0 1 0 0 56 28 28 0 0 0 0-56zm-4 16h8v16h-8V20zm0 20h8v8h-8v-8z" fill="#F56C6C"/></svg>',
        search:
          '<svg viewBox="0 0 64 64" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><path d="M44 40a18 18 0 1 0-4.2 11.4l12.4 12.4 4.2-4.2L44 47.2A18 18 0 0 0 44 40zm-18 0a10 10 0 1 1 0-20 10 10 0 0 1 0 20z" fill="#909399"/></svg>',
        network:
          '<svg viewBox="0 0 64 64" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><path d="M32 6a26 26 0 0 0-26 26h10a16 16 0 0 1 32 0h10A26 26 0 0 0 32 6zm-6 44h12v10H26V50z" fill="#909399"/></svg>'
      }
    }
  },
  computed: {
    finalDescription() {
      return this.description || this.descMap[this.type] || this.descMap['no-data']
    },
    svgOfType() {
      return this.svgMap[this.type] || this.svgMap['no-data']
    }
  }
}
</script>

<style lang="scss" scoped>
.wjs-empty {
  padding: 28px 0;

  &__svg {
    width: 100%;
    height: 100%;
  }
}
</style>
