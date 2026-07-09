<!--
  ============================================================
  FilterBar 筛选栏组件
  
  功能说明：
    基于 el-form（横向 inline）封装的可折叠高级筛选栏，解决列表页筛选条件过多时的布局与展开/收起问题。
    通过 items 声明筛选字段（输入框、下拉、日期等），多余字段默认收起，点击「展开」可显示全部；
    内置查询 / 重置按钮，查询时回传所有字段值，重置时清空并触发查询。
  
  Props:
    items: Array - 筛选字段配置 [{ prop, label, type, options, span }]
    collapse: Boolean - 是否启用折叠，默认 true
    showCount: Number - 未展开时显示的基础字段数量，默认 3
    loading: Boolean - 查询按钮 loading
  
  Events:
    search - 点击查询时触发，参数为筛选条件对象
    reset - 点击重置时触发，参数为清空后的对象
  
  适用场景：
    - 列表页顶部的高级筛选条件区
    - 与 SearchForm（搜索表单）互补的复杂筛选场景
    - 字段较多、需要收起次要条件的页面
  
  wjs created by 2020-07-08
  ============================================================
-->
<template>
  <div class="filter-bar">
    <el-form :inline="true" :model="model" class="filter-bar-form" @submit.native.prevent>
      <template v-for="(item, index) in visibleItems">
        <el-form-item :key="item.prop" :label="item.label" :class="{ 'hide-item': false }">
          <el-select
            v-if="item.type === 'select'"
            v-model="model[item.prop]"
            :placeholder="'请选择' + item.label"
            clearable
            style="width: 160px;"
          >
            <el-option
              v-for="opt in item.options"
              :key="opt.value"
              :label="opt.label"
              :value="opt.value"
            />
          </el-select>
          <el-date-picker
            v-else-if="item.type === 'date'"
            v-model="model[item.prop]"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            style="width: 160px;"
          />
          <el-input
            v-else
            v-model="model[item.prop]"
            :placeholder="'请输入' + item.label"
            clearable
            style="width: 160px;"
          />
        </el-form-item>
      </template>

      <el-form-item class="filter-bar-actions">
        <el-button type="primary" :loading="loading" @click="handleSearch">查询</el-button>
        <el-button @click="handleReset">重置</el-button>
        <el-button
          v-if="collapse && items.length > showCount"
          type="text"
          @click="expanded = !expanded"
        >
          {{ expanded ? '收起' : '展开' }}
          <i :class="expanded ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></i>
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
/**
 * FilterBar 筛选栏组件
 * wjs created by 2020-07-08
 */
export default {
  name: 'FilterBar',
  props: {
    items: { type: Array, default: () => [] },
    collapse: { type: Boolean, default: true },
    showCount: { type: Number, default: 3 },
    loading: { type: Boolean, default: false }
  },
  data() {
    return {
      model: {},
      expanded: false
    }
  },
  computed: {
    visibleItems() {
      if (!this.collapse) return this.items
      return this.expanded ? this.items : this.items.slice(0, this.showCount)
    }
  },
  created() {
    this.initModel()
  },
  methods: {
    initModel() {
      const m = {}
      this.items.forEach((it) => { m[it.prop] = '' })
      this.model = m
    },
    handleSearch() {
      const params = { ...this.model }
      // 清空空字符串，避免传给后端冗余条件
      Object.keys(params).forEach((k) => {
        if (params[k] === '' || params[k] == null) delete params[k]
      })
      this.$emit('search', params)
    },
    handleReset() {
      this.initModel()
      this.$emit('reset', { ...this.model })
      this.$emit('search', {})
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-bar {
  background: #fff;
  padding: 16px 16px 0;
  border: 1px solid #ebeef5;
  border-radius: 4px;

  .filter-bar-form {
    .el-form-item {
      margin-bottom: 16px;
    }

    .filter-bar-actions {
      margin-left: auto;
    }
  }
}
</style>
