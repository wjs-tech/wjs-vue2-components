<!--
  ============================================================
  TableSelect 下拉表格选择组件
  
  功能说明：
    基于 el-table + el-popover 封装的下拉表格选择器。
    下拉面板内展示表格，支持行点击选中、关键字搜索与分页。
    选中后回填显示字段并对外抛出整行对象，适合在大量结构化数据中挑选。
  
  Props:
    value: [Object, String] - 选中值（v-model，默认返回整行对象）
    valueKey: String - 选中值字段名（用于回填与去重）
    labelKey: String - 下拉框展示的字段名
    data: Array - 全量数据
    columns: Array - 列配置 [{ prop, label, width }]
    placeholder: String - 占位符
    pageSize: Number - 每页条数
    filterKeys: Array - 参与搜索的字段
    disabled: Boolean - 是否禁用
    clearable: Boolean - 是否可清空
  
  Events:
    input - 选中行变化（v-model）
    change - 同 input
    clear - 清空时触发
  
  适用场景：
    - 从用户列表、商品列表、组织列表中挑选单条记录
    - 需要预览多字段信息再决策的选择场景
  
  wjs created by 2023-03-15
  ============================================================
-->
<template>
  <div class="table-select">
    <el-popover
      ref="popover"
      v-model="visible"
      placement="bottom-start"
      trigger="click"
      :disabled="disabled"
      popper-class="table-select-popper"
      @show="onShow"
    >
      <div class="table-select__panel" @click.stop>
        <div class="table-select__search">
          <el-input
            v-model="keyword"
            size="small"
            placeholder="输入关键字搜索"
            prefix-icon="el-icon-search"
            clearable
            @input="currentPage = 1"
          ></el-input>
        </div>
        <el-table
          :data="pagedData"
          size="small"
          highlight-current-row
          :current-row-key="currentRowKey"
          row-key="__rowKey"
          height="260"
          @row-click="onRowClick"
        >
          <el-table-column
            v-for="col in columns"
            :key="col.prop"
            :prop="col.prop"
            :label="col.label"
            :width="col.width"
            show-overflow-tooltip
          ></el-table-column>
          <template slot="empty">无匹配数据</template>
        </el-table>
        <div class="table-select__pager">
          <el-pagination
            layout="prev, pager, next"
            small
            :current-page="currentPage"
            :page-size="pageSize"
            :total="filteredData.length"
            @current-change="currentPage = $event"
          ></el-pagination>
        </div>
      </div>
      <el-input
        slot="reference"
        :value="displayLabel"
        :placeholder="placeholder"
        :disabled="disabled"
        readonly
        clearable
        class="table-select__input"
        @clear="clearValue"
      >
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
    </el-popover>
  </div>
</template>

<script>
/**
 * TableSelect 下拉表格选择组件
 * 下拉内嵌 el-table，支持搜索 / 分页 / 行选中回填
 * wjs created by 2023-03-15
 */
let rowSeq = 0
export default {
  name: 'TableSelect',
  props: {
    value: {
      type: [Object, String],
      default: null
    },
    valueKey: {
      type: String,
      default: 'id'
    },
    labelKey: {
      type: String,
      default: 'name'
    },
    data: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    pageSize: {
      type: Number,
      default: 5
    },
    filterKeys: {
      type: Array,
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      visible: false,
      keyword: '',
      currentPage: 1
    }
  },
  computed: {
    // 为每行补充稳定 key，供 el-table 高亮与去重用
    innerData() {
      return this.data.map(row => ({ ...row, __rowKey: row[this.valueKey] != null ? row[this.valueKey] : ++rowSeq }))
    },
    filteredData() {
      const kw = this.keyword.trim().toLowerCase()
      if (!kw) return this.innerData
      const keys = this.filterKeys.length ? this.filterKeys : Object.keys(this.innerData[0] || {})
      return this.innerData.filter(row =>
        keys.some(k => String(row[k] == null ? '' : row[k]).toLowerCase().indexOf(kw) > -1)
      )
    },
    pagedData() {
      const start = (this.currentPage - 1) * this.pageSize
      return this.filteredData.slice(start, start + this.pageSize)
    },
    currentRowKey() {
      return this.value && this.value[this.valueKey] != null ? this.value[this.valueKey] : null
    },
    displayLabel() {
      return this.value && this.value[this.labelKey] != null ? this.value[this.labelKey] : ''
    }
  },
  methods: {
    onShow() {
      this.keyword = ''
      this.currentPage = 1
    },
    onRowClick(row) {
      this.$emit('input', row)
      this.$emit('change', row)
      this.visible = false
    },
    clearValue() {
      this.$emit('input', null)
      this.$emit('change', null)
      this.$emit('clear')
    }
  }
}
</script>

<style lang="scss" scoped>
.table-select {
  display: inline-block;
  width: 100%;

  &__input {
    width: 100%;
  }

  &__panel {
    width: 360px;
  }

  &__search {
    margin-bottom: 8px;
  }

  &__pager {
    margin-top: 8px;
    text-align: right;
  }
}

// popover 内的表格宽度控制（popper 在 body 下，需用全局类名）
.table-select-popper {
  padding: 10px;
}
</style>
