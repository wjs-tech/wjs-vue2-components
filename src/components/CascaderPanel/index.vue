<!--
  ============================================================
  CascaderPanel 级联面板组件
  
  功能说明：
    基于 el-cascader-panel 封装的级联选择器面板，可直接嵌入页面作为「树形数据选择区」使用，
    区别于 el-cascader 的下拉形态。支持单选/多选、是否可勾选叶子、是否显示完整路径，
    并对外暴露当前选中值与选中节点，省去业务侧自行维护 cascader-panel 与绑定值的样板。
  
  Props:
    options: Array - 级联树形数据 [{ value, label, children }]
    model: [Array, String, Number] - 选中值（支持 .sync）
    multiple: Boolean - 是否多选，默认 false
    checkStrictly: Boolean - 是否可选择任意层级，默认 false
    expandTrigger: String - 次级菜单展开方式 hover/click，默认 click
    showAllLevels: Boolean - 多选回显是否显示完整路径，默认 true
  
  Events:
    update:model - 选中值变化（配合 .sync）
    change - 选中变化，参数为 (value, selectedNodes)
  
  适用场景：
    - 类目 / 地区等多级树形选择（面板内嵌，非下拉）
    - 后台配置中的层级勾选
    - 需要直观展示层级结构的选择器
  
  wjs created by 2021-08-30
  ============================================================
-->
<template>
  <div class="cascader-panel">
    <el-cascader-panel
      ref="panel"
      :options="options"
      :props="panelProps"
      :value="innerValue"
      @change="handleChange"
    />
  </div>
</template>

<script>
/**
 * CascaderPanel 级联面板组件
 * wjs created by 2021-08-30
 */
export default {
  name: 'CascaderPanel',
  props: {
    options: { type: Array, default: () => [] },
    model: { type: [Array, String, Number], default: () => [] },
    multiple: { type: Boolean, default: false },
    checkStrictly: { type: Boolean, default: false },
    expandTrigger: { type: String, default: 'click' },
    showAllLevels: { type: Boolean, default: true }
  },
  computed: {
    innerValue: {
      get() {
        return this.model
      },
      set(val) {
        this.$emit('update:model', val)
      }
    },
    panelProps() {
      return {
        multiple: this.multiple,
        checkStrictly: this.checkStrictly,
        expandTrigger: this.expandTrigger,
        emitPath: this.showAllLevels
      }
    }
  },
  methods: {
    handleChange(value) {
      this.innerValue = value
      // 取选中节点（cascader-panel 的 getCheckedNodes 返回节点数组）
      let nodes = []
      if (this.$refs.panel && typeof this.$refs.panel.getCheckedNodes === 'function') {
        nodes = this.$refs.panel.getCheckedNodes() || []
      }
      this.$emit('change', value, nodes)
    }
  }
}
</script>

<style lang="scss" scoped>
.cascader-panel {
  display: inline-block;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  padding: 4px;
  background: #fff;
}
</style>
