<!--
  ============================================================
  DictSelect 字典选择器组件
  
  功能说明：
    基于ElementUI el-select封装的字典选择器
    支持从字典配置中获取选项列表
    支持远程加载字典数据
    支持多选、搜索等功能
  
  Props:
    value: String|Array - 选中值（v-model）
    dict: String - 字典类型（字典key）
    options: Array - 直接传入选项（优先级高于dict）
    multiple: Boolean - 是否多选
    clearable: Boolean - 是否可清空
    placeholder: String - 占位文字
  
  Events:
    input - 值变化
    change - 值变化事件
  
  适用场景：
    - 状态下拉选择
    - 类型下拉选择
    - 各种字典数据的选择
  
  wjs created by 2019-09-12
  ============================================================
-->
<template>
  <el-select
    :value="value"
    :multiple="multiple"
    :clearable="clearable"
    :placeholder="placeholder"
    :size="size"
    :disabled="disabled"
    :filterable="filterable"
    :collapse-tags="collapseTags"
    :collapse-tags-tooltip="collapseTagsTooltip"
    style="width: 100%"
    @input="handleInput"
    @change="handleChange"
  >
    <el-option
      v-for="item in optionList"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      :disabled="item.disabled"
    >
      <span v-if="showTag" class="dict-option">
        <el-tag v-if="item.type" :type="item.type" size="mini">{{ item.label }}</el-tag>
        <span v-else>{{ item.label }}</span>
      </span>
    </el-option>
  </el-select>
</template>

<script>
/**
 * DictSelect 字典选择器组件
 * 
 * 基于el-select封装，支持字典数据、直接传选项
 * 
 * @property {String|Array} value - 选中值
 * @property {String} dict - 字典类型（从全局字典获取）
 * @property {Array} options - 直接传选项
 * @property {Boolean} multiple - 是否多选
 * @property {Boolean} clearable - 是否可清空
 * @property {Boolean} disabled - 是否禁用
 * @property {Boolean} filterable - 是否可搜索
 * @property {String} placeholder - 占位文字
 * @property {String} size - 尺寸
 * @property {Boolean} showTag - 是否显示标签样式
 * @property {Boolean} collapseTags - 多选时是否折叠标签
 * @property {Boolean} collapseTagsTooltip - 折叠标签是否显示 tooltip
 * 
 * @event input - 值变化（用于v-model）
 * @event change - 值变化
 * 
 * wjs created by 2019-09-12
 */
export default {
  name: 'DictSelect',
  props: {
    value: {
      type: [String, Number, Array],
      default: ''
    },
    dict: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    },
    multiple: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    filterable: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    size: {
      type: String,
      default: 'small'
    },
    showTag: {
      type: Boolean,
      default: false
    },
    collapseTags: {
      type: Boolean,
      default: false
    },
    collapseTagsTooltip: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dictList: []
    }
  },
  computed: {
    optionList() {
      // 如果传入了options，优先使用options
      if (this.options && this.options.length > 0) {
        return this.options
      }
      // 否则从全局字典获取
      return this.dictList
    }
  },
  created() {
    this.loadDict()
  },
  methods: {
    // 加载字典数据
    loadDict() {
      if (!this.dict) return
      
      // 尝试从全局字典获取，如果项目中有安装则使用
      if (this.$dict && this.$dict[this.dict]) {
        this.dictList = this.$dict[this.dict]
        return
      }
      
      // 也可以通过Vuex等方式获取
      // 这里预留接口，实际项目中根据实际情况实现
      // 示例字典（模拟数据）
      const mockDicts = {
        status: [
          { value: '0', label: '禁用', type: 'danger' },
          { value: '1', label: '启用', type: 'success' }
        ],
        sex: [
          { value: '1', label: '男' },
          { value: '2', label: '女' }
        ]
      }
      
      if (mockDicts[this.dict]) {
        this.dictList = mockDicts[this.dict]
      }
    },
    
    handleInput(val) {
      this.$emit('input', val)
    },
    
    handleChange(val) {
      this.$emit('change', val)
    },
    
    // 获取标签文字（提供外部调用
    getLabel(val) {
      const item = this.optionList.find(o => o.value === val)
      return item ? item.label : val
    }
  }
}
</script>

<style lang="scss" scoped>
.dict-option {
  display: flex;
  align-items: center;
}
</style>
