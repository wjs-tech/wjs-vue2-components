<!--
  ============================================================
  SearchForm 搜索表单组件
  
  功能说明：
    基于ElementUI封装的搜索表单组件
    支持输入框、下拉选择、日期选择、日期范围等常见搜索项
    支持展开/收起（多条件时默认显示部分）
    自动处理搜索、重置事件
  
  Props:
    fields: Array - 搜索字段配置
    value: Object - 搜索值（v-model）
    defaultFields: Number - 默认显示的字段数，默认3
    showToggle: Boolean - 是否显示展开/收起按钮
  
  Events:
    search - 点击搜索按钮
    reset - 点击重置按钮
    input - 值变化（用于v-model）
  
  适用场景：
    - 列表页顶部搜索区
    - 带多条件筛选的表单
    - 需要展开/收起的搜索面板
  
  wjs created by 2019-05-20
  ============================================================
-->
<template>
  <div class="search-form">
    <el-form
      ref="searchForm"
      :model="formData"
      :inline="true"
      label-width="labelWidth + 'px'"
      size="small"
    >
      <el-form-item
        v-for="(field, index) in displayFields"
        :key="field.prop"
        :label="field.label"
        :prop="field.prop"
      >
        <!-- 输入框 -->
        <el-input
          v-if="field.type === 'input' || !field.type"
          v-model="formData[field.prop]"
          :placeholder="field.placeholder || '请输入' + field.label"
          :clearable="field.clearable !== false"
          style="width: 180px;"
          @keyup.enter.native="handleSearch"
        />
        
        <!-- 下拉选择 -->
        <el-select
          v-else-if="field.type === 'select'"
          v-model="formData[field.prop]"
          :placeholder="field.placeholder || '请选择' + field.label"
          :clearable="field.clearable !== false"
          style="width: 180px;"
        >
          <el-option
            v-for="opt in field.options"
            :key="opt.value"
            :label="opt.label"
            :value="opt.value"
          />
        </el-select>
        
        <!-- 日期选择 -->
        <el-date-picker
          v-else-if="field.type === 'date'"
          v-model="formData[field.prop]"
          type="date"
          :placeholder="field.placeholder || '请选择日期'"
          style="width: 180px;"
          value-format="yyyy-MM-dd"
        />
        
        <!-- 日期范围 -->
        <el-date-picker
          v-else-if="field.type === 'daterange'"
          v-model="formData[field.prop]"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          style="width: 380px;"
          value-format="yyyy-MM-dd"
        />
        
        <!-- 时间选择 -->
        <el-time-select
          v-else-if="field.type === 'time'"
          v-model="formData[field.prop]"
          :placeholder="field.placeholder || '请选择时间'"
          style="width: 180px;"
        />
        
        <!-- 数字输入框 -->
        <el-input-number
          v-else-if="field.type === 'number'"
          v-model="formData[field.prop]"
          :min="field.min !== undefined ? field.min : undefined"
          :max="field.max !== undefined ? field.max : undefined"
          style="width: 180px;"
        />
        
        <!-- 级联选择 -->
        <el-cascader
          v-else-if="field.type === 'cascader'"
          v-model="formData[field.prop]"
          :options="field.options"
          :placeholder="field.placeholder || '请选择'"
          style="width: 220px;"
          :props="field.props || {}"
          clearable
        />
        
        <!-- 自定义插槽 -->
        <slot v-else :name="'field-' + field.prop" :field="field" :value="formData[field.prop]">
        </slot>
      </el-form-item>
      
      <!-- 操作按钮 -->
      <el-form-item class="search-actions">
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
        <el-button icon="el-icon-refresh" @click="handleReset">重置</el-button>
        <el-button
          v-if="showToggle && fields.length > defaultFields"
          type="text"
          @click="toggleExpand"
        >
          {{ isExpanded ? '收起' : '展开' }}
          <i :class="isExpanded ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></i>
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
/**
 * SearchForm 搜索表单组件
 * 
 * 基于ElementUI el-form封装，支持多条件搜索、展开收起
 * 
 * @property {Array} fields - 字段配置数组
 * @property {Object} value - 表单值（v-model）
 * @property {Number} labelWidth - 标签宽度，默认80
 * @property {Number} defaultFields - 默认显示字段数，默认3
 * @property {Boolean} showToggle - 是否显示展开/收起按钮
 * 
 * @event search - 搜索
 * @event reset - 重置
 * 
 * wjs created by 2019-05-20
 */
export default {
  name: 'SearchForm',
  props: {
    fields: {
      type: Array,
      default: () => []
    },
    value: {
      type: Object,
      default: () => ({})
    },
    labelWidth: {
      type: Number,
      default: 80
    },
    defaultFields: {
      type: Number,
      default: 3
    },
    showToggle: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isExpanded: false,
      formData: {}
    }
  },
  computed: {
    displayFields() {
      if (!this.isExpanded && this.showToggle && this.fields.length > this.defaultFields) {
        return this.fields.slice(0, this.defaultFields)
      }
      return this.fields
    }
  },
  watch: {
    value: {
      handler(val) {
        this.formData = Object.assign({}, val)
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    handleSearch() {
      this.$emit('search', this.formData)
    },
    handleReset() {
      // 重置为默认值
      const resetData = {}
      this.fields.forEach(field => {
        resetData[field.prop] = field.defaultValue !== undefined ? field.defaultValue : ''
      })
      this.formData = resetData
      this.$emit('reset', resetData)
      this.$emit('input', resetData)
    },
    toggleExpand() {
      this.isExpanded = !this.isExpanded
      this.$emit('toggle', this.isExpanded)
    }
  }
}
</script>

<style lang="scss" scoped>
.search-form {
  background: #fff;
  padding: 16px 20px 0;
  border-radius: 4px;
  margin-bottom: 20px;
  
  ::v-deep(.el-form-item) {
    margin-bottom: 16px;
  }
  
  .search-actions {
    margin-left: 0 !important;
    
    .el-button {
      margin-right: 10px;
    }
  }
}
</style>
