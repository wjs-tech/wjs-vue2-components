<!--
  ============================================================
  TablePro 高级表格组件
  
  功能说明：
    基于ElementUI el-table封装的高级表格组件
    集成了分页、选择、自定义列、序号列、操作列等常用功能
    支持列配置化，通过columns配置列信息
  
  Props:
    columns: Array - 列配置
    data: Array - 表格数据
    total: Number - 总条数
    page: Number - 当前页码
    pageSize: Number - 每页条数
    selection: Boolean - 是否显示多选框
    index: Boolean - 是否显示序号列
    border: Boolean - 是否显示边框
    height: String|Number - 表格高度
  
  Events:
    selection-change - 选中项变化
    page-change - 页码变化
    size-change - 每页条数变化
  
  适用场景：
    - 后台管理系统列表页
    - 数据展示表格
    - 需要分页的表格
  
  wjs created by 2019-07-10
  ============================================================
-->
<template>
  <div class="table-pro">
    <el-table
      ref="table"
      :data="data"
      :height="height"
      :border="border"
      :stripe="stripe"
      style="width: 100%"
      v-loading="loading"
      @selection-change="handleSelectionChange"
      @sort-change="handleSortChange"
    >
      <!-- 多选框列 -->
      <el-table-column
        v-if="selection"
        type="selection"
        width="55"
        align="center"
      />
      
      <!-- 序号列 -->
      <el-table-column
        v-if="index"
        type="index"
        label="序号"
        width="60"
        align="center"
        :index="indexMethod"
      />
      
      <!-- 动态列 -->
      <el-table-column
        v-for="col in columns"
        :key="col.prop"
        :prop="col.prop"
        :label="col.label"
        :width="col.width"
        :min-width="col.minWidth"
        :fixed="col.fixed"
        :align="col.align || 'left'"
        :sortable="col.sortable"
        :show-overflow-tooltip="col.tooltip !== false"
      >
        <!-- 自定义表头 -->
        <template slot="header" slot-scope="scope">
          <slot v-if="col.headerSlot" :name="'header-' + col.prop" :column="col" :scope="scope">
            {{ col.label }}
          </slot>
          <span v-else>{{ col.label }}</span>
        </template>
        
        <!-- 自定义内容 -->
        <template slot-scope="scope">
          <!-- 自定义插槽 -->
          <slot v-if="col.slot" :name="col.slot" :row="scope.row" :index="scope.$index" :column="col">
          </slot>
          
          <!-- 标签类型 -->
          <el-tag
            v-else-if="col.type === 'tag'"
            :type="getTagType(scope.row[col.prop], col)"
            :size="col.tagSize || 'small'"
          >
            {{ getTagLabel(scope.row[col.prop], col) }}
          </el-tag>
          
          <!-- 状态类型 -->
          <span
            v-else-if="col.type === 'status'"
            :class="['status-dot', getStatusType(scope.row[col.prop], col)]"
          >
            {{ getTagLabel(scope.row[col.prop], col) }}
          </span>
          
          <!-- 图片类型 -->
          <el-image
            v-else-if="col.type === 'image'"
            :src="scope.row[col.prop]"
            :preview-src-list="col.preview !== false ? [scope.row[col.prop]] : []"
            :fit="col.fit || 'cover'"
            :style="{ width: col.imgWidth || '60px', height: col.imgHeight || '60px' }"
          />
          
          <!-- 日期格式化 -->
          <span v-else-if="col.type === 'date'">
            {{ formatDate(scope.row[col.prop], col.dateFormat || 'yyyy-MM-dd') }}
          </span>
          
          <!-- 金额格式化 -->
          <span v-else-if="col.type === 'money'" style="color: #f56c6c;">
            ¥{{ formatMoney(scope.row[col.prop]) }}
          </span>
          
          <!-- 操作列 -->
          <template v-else-if="col.type === 'action'">
            <el-button
              v-for="btn in col.actions"
              :key="btn.key"
              type="text"
              :size="btn.size || 'small'"
              :disabled="btn.disabled"
              @click="handleAction(btn, scope.row, scope.$index)"
            >
              {{ btn.label }}
            </el-button>
          </template>
          
          <!-- 默认显示 -->
          <span v-else>{{ scope.row[col.prop] }}</span>
        </template>
      </el-table-column>
    </el-table>
    
    <!-- 分页 -->
    <div v-if="showPagination" class="pagination-wrap">
      <div v-if="selection" class="selection-info">
        已选择 <span style="color: #409EFF; font-weight: bold;">{{ selectedRows.length }}</span> 项
        <el-button v-if="selectedRows.length > 0" type="text" size="small" @click="clearSelection">清空选择</el-button>
      </div>
      <el-pagination
        class="pagination"
        :current-page="page"
        :page-size="pageSize"
        :page-sizes="pageSizes"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
/**
 * TablePro 高级表格组件
 * 
 * 基于ElementUI el-table封装，集成分页、列配置、格式化等功能
 * 
 * @property {Array} columns - 列配置
 * @property {Array} data - 表格数据
 * @property {Number} total - 总条数
 * @property {Number} page - 当前页
 * @property {Number} pageSize - 每页条数
 * @property {Array} pageSizes - 每页条数选项
 * @property {Boolean} selection - 是否显示选择列
 * @property {Boolean} index - 是否显示序号列
 * @property {Boolean} border - 是否显示边框
 * @property {Boolean} stripe - 是否斑马纹
 * @property {Boolean} showPagination - 是否显示分页
 * @property {Boolean} loading - 加载状态
 * @property {String|Number} height - 表格高度
 * 
 * wjs created by 2019-07-10
 */
export default {
  name: 'TablePro',
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    },
    total: {
      type: Number,
      default: 0
    },
    page: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    pageSizes: {
      type: Array,
      default: () => [10, 20, 50, 100]
    },
    selection: {
      type: Boolean,
      default: false
    },
    index: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: true
    },
    stripe: {
      type: Boolean,
      default: true
    },
    showPagination: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    height: {
      type: [String, Number],
      default: null
    }
  },
  data() {
    return {
      selectedRows: []
    }
  },
  methods: {
    // 序号计算（带分页）
    indexMethod(index) {
      return (this.page - 1) * this.pageSize + index + 1
    },
    
    // 选择变化
    handleSelectionChange(selection) {
      this.selectedRows = selection
      this.$emit('selection-change', selection)
    },
    
    // 清空选择
    clearSelection() {
      this.$refs.table.clearSelection()
    },
    
    // 排序变化
    handleSortChange({ prop, order }) {
      this.$emit('sort-change', { prop, order })
    },
    
    // 页码变化
    handleCurrentChange(page) {
      this.$emit('page-change', page)
      this.$emit('update:page', page)
    },
    
    // 每页条数变化
    handleSizeChange(size) {
      this.$emit('size-change', size)
      this.$emit('update:pageSize', size)
    },
    
    // 操作按钮点击
    handleAction(btn, row, index) {
      if (btn.handler && typeof btn.handler === 'function') {
        btn.handler(row, index)
      }
      this.$emit('action', btn.key, row, index)
    },
    
    // 获取标签类型
    getTagType(value, col) {
      if (col.tagType) return col.tagType
      if (col.dict) {
        const item = col.dict.find(d => d.value === value)
        return item ? item.type : 'info'
      }
      return 'info'
    },
    
    // 获取标签文字
    getTagLabel(value, col) {
      if (col.dict) {
        const item = col.dict.find(d => d.value === value)
        return item ? item.label : value
      }
      return value
    },
    
    // 获取状态类型
    getStatusType(value, col) {
      return this.getTagType(value, col)
    },
    
    // 日期格式化
    formatDate(date, format) {
      if (!date) return ''
      const d = new Date(date)
      if (isNaN(d.getTime())) return date
      
      const o = {
        'M+': d.getMonth() + 1,
        'd+': d.getDate(),
        'H+': d.getHours(),
        'm+': d.getMinutes(),
        's+': d.getSeconds()
      }
      
      let fmt = format
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (d.getFullYear() + '').substr(4 - RegExp.$1.length))
      }
      for (const k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
          fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
        }
      }
      return fmt
    },
    
    // 金额格式化
    formatMoney(num) {
      if (num === null || num === undefined || isNaN(num)) return '0.00'
      return Number(num).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    
    // 刷新表格
    refresh() {
      this.$refs.table.doLayout()
    },
    
    // 获取选中行
    getSelection() {
      return this.selectedRows
    }
  }
}
</script>

<style lang="scss" scoped>
.table-pro {
  background: #fff;
  border-radius: 4px;
  
  .pagination-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    border-top: 1px solid #ebeef5;
    
    .selection-info {
      font-size: 13px;
      color: #606266;
    }
    
    .pagination {
      text-align: right;
    }
  }
}

.status-dot {
  display: inline-flex;
  align-items: center;
  font-size: 12px;
  
  &::before {
    content: '';
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    margin-right: 5px;
  }
  
  &.success::before { background: #67c23a; }
  &.warning::before { background: #e6a23c; }
  &.danger::before { background: #f56c6c; }
  &.info::before { background: #909399; }
  &.primary::before { background: #409EFF; }
}
</style>
