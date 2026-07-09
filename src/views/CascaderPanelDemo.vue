<!--
  ============================================================
  CascaderPanel 级联面板组件演示页
  
  wjs created by 2021-09-12
  ============================================================
-->
<template>
  <div class="cascader-panel-demo">
    <el-card>
      <div slot="header">CascaderPanel 级联面板组件演示</div>
      <p class="intro">
        CascaderPanel 是 el-cascader-panel 的封装，以「面板」形态内嵌于页面，适合地区/类目等多级树形选择。
        下方演示单选（完整路径）与多选（可勾选任意层级）两种模式，选中结果实时回显（示例数据）。
      </p>

      <el-form :inline="true" class="opt-bar">
        <el-form-item label="模式">
          <el-radio-group v-model="mode">
            <el-radio-button label="single">单选</el-radio-button>
            <el-radio-button label="multiple">多选</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>

      <el-row :gutter="20">
        <el-col :span="12">
          <CascaderPanel
            :options="options"
            :model.sync="value"
            :multiple="mode === 'multiple'"
            :check-strictly="mode === 'multiple'"
            :show-all-levels="true"
            @change="handleChange"
          />
        </el-col>
        <el-col :span="12">
          <el-card shadow="never">
            <div slot="header">选中结果（实时）</div>
            <pre class="result-json">{{ JSON.stringify(value, null, 2) }}</pre>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
/**
 * CascaderPanel 演示
 * wjs created by 2021-09-12
 */
import CascaderPanel from '@/components/CascaderPanel/index.vue'

// 示例地区数据（脱敏）
const regionOptions = [
  {
    value: 'east',
    label: '示例东区',
    children: [
      { value: 'east-a', label: '示例A市' },
      { value: 'east-b', label: '示例B市' }
    ]
  },
  {
    value: 'south',
    label: '示例南区',
    children: [
      { value: 'south-a', label: '示例C市' },
      { value: 'south-b', label: '示例D市', children: [
        { value: 'south-b-1', label: '示例D1区' },
        { value: 'south-b-2', label: '示例D2区' }
      ] }
    ]
  }
]

export default {
  name: 'CascaderPanelDemo',
  components: { CascaderPanel },
  data() {
    return {
      mode: 'single',
      value: [],
      options: regionOptions
    }
  },
  watch: {
    mode() {
      this.value = []
    }
  },
  methods: {
    handleChange(value, nodes) {
      this.$message.info(
        (this.mode === 'multiple' ? '多选' : '单选') + '变更，共选中 ' + nodes.length + ' 项（示例）'
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.cascader-panel-demo {
  .intro {
    color: #606266;
    font-size: 14px;
    line-height: 1.7;
    margin: 0 0 16px;
  }

  .opt-bar {
    margin-bottom: 10px;
  }

  .result-json {
    background: #f5f7fa;
    padding: 12px;
    border-radius: 4px;
    font-size: 13px;
    color: #303133;
    margin: 0;
    max-height: 240px;
    overflow: auto;
  }
}
</style>
