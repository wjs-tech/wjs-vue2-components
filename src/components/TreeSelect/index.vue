<!--
  ============================================================
  树形选择 TreeSelect 组件
  
  功能说明：
    基于 el-popover + el-tree 封装的树形下拉选择器
    点击输入框弹出树，选择节点后回填标签并关闭弹层，支持清空与搜索过滤
    通过 v-model 双向绑定选中节点的 key，常用于部门 / 分类 / 区域等层级数据选择
  
  Props:
    value: [String, Number] - 选中节点 key（v-model）
    options: Array - 树形数据
    placeholder: String - 占位提示，默认「请选择」
    clearable: Boolean - 是否可清空，默认 true
    disabled: Boolean - 是否禁用，默认 false
    nodeKey: String - 节点唯一字段名，默认 id
    props: Object - 配置 { label, children }，默认 { label:'label', children:'children' }
    filterable: Boolean - 是否可搜索过滤，默认 false
    popoverWidth: Number - 弹层宽度，默认 240
  
  Events:
    input - 选中 key 变化（用于 v-model）
    change - 选中节点对象变化
  
  适用场景：
    - 部门 / 组织树选择
    - 商品分类选择
    - 地区 / 行政区划选择
  
  wjs created by 2024-07-13
  ============================================================
-->
<template>
  <div class="wjs-tree-select" :class="{ 'is-disabled': disabled }">
    <el-popover
      v-model="visible"
      placement="bottom-start"
      trigger="click"
      :disabled="disabled"
      :width="popoverWidth"
      popper-class="wjs-tree-select-popover"
    >
      <el-input
        slot="reference"
        :value="selectedLabel"
        :placeholder="placeholder"
        :clearable="clearable"
        :disabled="disabled"
        readonly
        @clear="clear"
      >
        <i v-if="!selectedLabel" slot="prefix" class="el-icon-arrow-down"></i>
      </el-input>

      <div class="wjs-tree-select__panel">
        <el-input
          v-if="filterable"
          v-model="filterText"
          size="mini"
          clearable
          placeholder="输入关键字过滤"
          class="wjs-tree-select__filter"
        />
        <el-tree
          ref="tree"
          class="wjs-tree-select__tree"
          :data="options"
          :node-key="nodeKey"
          :props="treeProps"
          :expand-on-click-node="false"
          :filter-node-method="filterNode"
          highlight-current
          @node-click="handleNodeClick"
        />
      </div>
    </el-popover>
  </div>
</template>

<script>
/**
 * TreeSelect 树形选择组件
 *
 * el-popover + el-tree 组合实现树形下拉选择，单选回填节点 key。
 *
 * @property {String|Number} value - 选中 key（v-model）
 * @property {Array} options - 树数据
 * @property {String} placeholder - 占位提示
 * @property {Boolean} clearable - 可清空
 * @property {Boolean} disabled - 禁用
 * @property {String} nodeKey - 节点唯一字段
 * @property {Object} props - { label, children }
 * @property {Boolean} filterable - 可搜索
 * @property {Number} popoverWidth - 弹层宽度
 *
 * @event input - 选中 key 变化
 * @event change - 选中节点对象变化
 *
 * wjs created by 2024-07-13
 */
export default {
  name: 'TreeSelect',
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    clearable: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    nodeKey: {
      type: String,
      default: 'id'
    },
    props: {
      type: Object,
      default: () => ({ label: 'label', children: 'children' })
    },
    filterable: {
      type: Boolean,
      default: false
    },
    popoverWidth: {
      type: Number,
      default: 240
    }
  },
  data() {
    return {
      visible: false,
      filterText: '',
      selectedLabel: ''
    }
  },
  computed: {
    treeProps() {
      return Object.assign({ label: 'label', children: 'children' }, this.props)
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.resolveLabel(val)
      }
    },
    filterText(val) {
      this.$refs.tree && this.$refs.tree.filter(val)
    }
  },
  methods: {
    // 根据选中 key 反查标签，并高亮树节点
    resolveLabel(key) {
      if (key === '' || key === null || key === undefined) {
        this.selectedLabel = ''
        this.$nextTick(() => {
          this.$refs.tree && this.$refs.tree.setCurrentKey(null)
        })
        return
      }
      const node = this.findNode(this.options, key)
      this.selectedLabel = node ? node[this.treeProps.label] : ''
      this.$nextTick(() => {
        this.$refs.tree && this.$refs.tree.setCurrentKey(key)
      })
    },
    // 递归查找节点
    findNode(list, key) {
      if (!list) return null
      for (const item of list) {
        if (item[this.nodeKey] === key) return item
        if (item[this.treeProps.children] && item[this.treeProps.children].length) {
          const found = this.findNode(item[this.treeProps.children], key)
          if (found) return found
        }
      }
      return null
    },
    handleNodeClick(node) {
      this.selectedLabel = node[this.treeProps.label]
      this.$emit('input', node[this.nodeKey])
      this.$emit('change', node)
      this.visible = false
    },
    clear() {
      this.selectedLabel = ''
      this.$emit('input', '')
      this.$emit('change', null)
      this.$nextTick(() => {
        this.$refs.tree && this.$refs.tree.setCurrentKey(null)
      })
    },
    filterNode(value, data) {
      if (!value) return true
      return data[this.treeProps.label].indexOf(value) !== -1
    }
  }
}
</script>

<style lang="scss" scoped>
.wjs-tree-select {
  width: 100%;

  &.is-disabled {
    cursor: not-allowed;
  }

  &__panel {
    max-height: 280px;
    overflow: auto;
  }

  &__filter {
    margin-bottom: 8px;
  }

  &__tree {
    border: none;
  }
}
</style>
