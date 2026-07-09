<!--
  ============================================================
  RegionCascader 省市区联动组件
  
  功能说明：
    基于 el-cascader 封装的行政区划级联选择组件。
    内置一份精简的示例省/市/区数据（已脱敏，非真实区划库）。
    支持外部覆盖 options、清空、禁用等常规配置透传。
  
  Props:
    value: Array - 选中路径数组（v-model）
    options: Array - 自定义数据（不传则使用内置示例数据）
    placeholder: String - 占位符
    disabled: Boolean - 是否禁用
    clearable: Boolean - 是否可清空
    size: String - 尺寸
    expandTrigger: String - 次级展开方式 hover | click
  
  Events:
    change - 选中路径变化时触发（value, selectedNodes）
    input - 同 change（v-model）
  
  适用场景：
    - 收货地址、门店归属地等行政区划选择
    - 需要三级联动但无需引入完整区划库的中后台表单
  
  wjs created by 2023-07-04
  ============================================================
-->
<template>
  <el-cascader
    :value="value"
    :options="regionOptions"
    :placeholder="placeholder"
    :disabled="disabled"
    :clearable="clearable"
    :size="size"
    :props="cascaderProps"
    class="region-cascader"
    @change="handleChange"
  ></el-cascader>
</template>

<script>
/**
 * RegionCascader 省市区联动组件
 * 基于 el-cascader，内置精简示例数据（脱敏）
 * wjs created by 2023-07-04
 */
export default {
  name: 'RegionCascader',
  props: {
    value: {
      type: Array,
      default: () => []
    },
    options: {
      type: Array,
      default: () => []
    },
    placeholder: {
      type: String,
      default: '请选择省 / 市 / 区'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: ''
    },
    expandTrigger: {
      type: String,
      default: 'click'
    }
  },
  data() {
    return {
      // 内置示例数据（已脱敏，仅用于演示，非真实区划）
      builtinData: [
        {
          value: 'prov-a',
          label: '示例省一',
          children: [
            {
              value: 'city-a1',
              label: '示例市一',
              children: [
                { value: 'area-a1-1', label: '示例区一' },
                { value: 'area-a1-2', label: '示例区二' }
              ]
            },
            {
              value: 'city-a2',
              label: '示例市二',
              children: [
                { value: 'area-a2-1', label: '示例区三' },
                { value: 'area-a2-2', label: '示例区四' }
              ]
            }
          ]
        },
        {
          value: 'prov-b',
          label: '示例省二',
          children: [
            {
              value: 'city-b1',
              label: '示例市三',
              children: [
                { value: 'area-b1-1', label: '示例区五' },
                { value: 'area-b1-2', label: '示例区六' }
              ]
            },
            {
              value: 'city-b2',
              label: '示例市四',
              children: [
                { value: 'area-b2-1', label: '示例区七' },
                { value: 'area-b2-2', label: '示例区八' }
              ]
            }
          ]
        },
        {
          value: 'prov-c',
          label: '示例省三',
          children: [
            {
              value: 'city-c1',
              label: '示例市五',
              children: [
                { value: 'area-c1-1', label: '示例区九' },
                { value: 'area-c1-2', label: '示例区十' }
              ]
            }
          ]
        }
      ]
    }
  },
  computed: {
    regionOptions() {
      return this.options && this.options.length ? this.options : this.builtinData
    },
    cascaderProps() {
      return { expandTrigger: this.expandTrigger, emitPath: true }
    }
  },
  methods: {
    handleChange(val) {
      this.$emit('input', val)
      this.$emit('change', val)
    }
  }
}
</script>

<style lang="scss" scoped>
.region-cascader {
  width: 100%;
}
</style>
