<!--
  ============================================================
  树形选择 TreeSelect 演示页
  
  wjs created by 2024-07-13
  ============================================================
-->
<template>
  <div class="tree-select-demo">
    <PageHeader title="树形选择 TreeSelect" content="基于 el-popover + el-tree 的树形下拉选择，v-model 绑定节点 key，支持清空与搜索">
    </PageHeader>

    <el-alert
      type="info"
      :closable="false"
      show-icon
      style="margin-bottom: 16px;"
      title="说明"
      description="点击输入框弹出树，选择节点后回填标签并关闭弹层；支持 value 反显、可清空与关键字过滤。常用于部门 / 分类 / 地区等层级数据。"
    />

    <el-row :gutter="20">
      <el-col :span="12">
        <el-card>
          <div slot="header">基础用法</div>
          <el-form label-width="90px">
            <el-form-item label="所属部门">
              <TreeSelect v-model="dept" :options="deptData" placeholder="请选择部门" />
            </el-form-item>
            <el-form-item label="选中值">
              <code class="val">{{ dept }}</code>
            </el-form-item>
            <el-form-item>
              <el-button size="small" @click="dept = 12">赋值为「后端组」</el-button>
              <el-button size="small" @click="dept = ''">清空</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card>
          <div slot="header">可搜索 + 清空</div>
          <el-form label-width="90px">
            <el-form-item label="商品分类">
              <TreeSelect
                v-model="category"
                :options="categoryData"
                filterable
                clearable
                placeholder="输入关键字过滤"
              />
            </el-form-item>
            <el-form-item label="选中值">
              <code class="val">{{ category }}</code>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import TreeSelect from '@/components/TreeSelect/index.vue'

export default {
  name: 'TreeSelectDemo',
  components: { TreeSelect },
  data() {
    return {
      dept: 11,
      category: '',
      // 示例：部门树（脱敏）
      deptData: [
        {
          id: 1,
          label: '技术中心',
          children: [
            { id: 11, label: '前端组' },
            { id: 12, label: '后端组' },
            { id: 13, label: '测试组' }
          ]
        },
        {
          id: 2,
          label: '产品中心',
          children: [
            { id: 21, label: '产品设计组' },
            { id: 22, label: '用户研究组' }
          ]
        }
      ],
      // 示例：商品分类树（脱敏）
      categoryData: [
        {
          id: 100,
          label: '数码电器',
          children: [
            { id: 101, label: '手机' },
            { id: 102, label: '笔记本' },
            { id: 103, label: '耳机' }
          ]
        },
        {
          id: 200,
          label: '家居生活',
          children: [
            { id: 201, label: '厨具' },
            { id: 202, label: '收纳' }
          ]
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.tree-select-demo {
  .val {
    display: inline-block;
    padding: 2px 8px;
    background: #f5f7fa;
    border-radius: 4px;
    font-size: 12px;
    color: #606266;
  }
}
</style>
