<!--
  ============================================================
  DictSelect 字典选择器演示页
  
  wjs created by 2019-10-08
  ============================================================
-->
<template>
  <div class="dict-select-demo">
    <PageHeader title="字典选择器 DictSelect" content="基于el-select封装，支持字典数据、标签样式">
    </PageHeader>
    
    <el-card>
      <div slot="header">基础用法</div>
      
      <el-form label-width="120px" style="max-width: 700px;">
        <el-form-item label="状态">
          <DictSelect v-model="status" dict="status" placeholder="请选择状态" style="width: 200px;" />
          <span style="margin-left: 20px; color: #909399;">选中值：{{ status }}</span>
        </el-form-item>
        
        <el-form-item label="性别">
          <DictSelect v-model="sex" dict="sex" placeholder="请选择性别" style="width: 200px;" />
          <span style="margin-left: 20px; color: #909399;">选中值：{{ sex }}</span>
        </el-form-item>
        
        <el-form-item label="自定义选项">
          <DictSelect
            v-model="custom"
            :options="customOptions"
            placeholder="请选择"
            style="width: 200px;"
          />
          <span style="margin-left: 20px; color: #909399;">选中值：{{ custom }}</span>
        </el-form-item>
        
        <el-form-item label="显示标签">
          <DictSelect
            v-model="tagValue"
            :options="tagOptions"
            show-tag
            placeholder="请选择"
            style="width: 200px;"
          />
          <span style="margin-left: 20px; color: #909399;">选中值：{{ tagValue }}</span>
        </el-form-item>
        
        <el-form-item label="可搜索">
          <DictSelect
            v-model="filterValue"
            :options="filterOptions"
            filterable
            placeholder="请搜索选择"
            style="width: 200px;"
          />
        </el-form-item>
        
        <el-form-item label="多选">
          <DictSelect
            v-model="multipleValue"
            :options="multipleOptions"
            multiple
            collapse-tags
            collapse-tags-tooltip
            placeholder="请选择（多选）"
            style="width: 200px;"
          />
          <span class="inline-tip">选中值：{{ multipleValue.length > 0 ? multipleValue.join(', ') : '无' }}</span>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import DictSelect from '@/components/DictSelect/index.vue'

/**
 * DictSelect 组件演示
 * wjs created by 2019-10-08
 */
export default {
  name: 'DictSelectDemo',
  components: { DictSelect },
  data() {
    return {
      status: '',
      sex: '',
      custom: '',
      customOptions: [
        { value: '1', label: '选项一' },
        { value: '2', label: '选项二' },
        { value: '3', label: '选项三' }
      ],
      tagValue: '',
      tagOptions: [
        { value: 'success', label: '成功', type: 'success' },
        { value: 'warning', label: '警告', type: 'warning' },
        { value: 'danger', label: '危险', type: 'danger' },
        { value: 'info', label: '信息', type: 'info' }
      ],
      filterValue: '',
      filterOptions: [
        { value: 'bj', label: '北京' },
        { value: 'sh', label: '上海' },
        { value: 'gz', label: '广州' },
        { value: 'sz', label: '深圳' },
        { value: 'dl', label: '大连' },
        { value: 'sy', label: '沈阳' }
      ],
      multipleValue: [],
      multipleOptions: [
        { value: 'vue', label: 'Vue' },
        { value: 'react', label: 'React' },
        { value: 'angular', label: 'Angular' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.dict-select-demo {
  .inline-tip {
    margin-left: 20px;
    color: #909399;
    font-size: 13px;
    flex-shrink: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 240px;
  }
}
</style>
