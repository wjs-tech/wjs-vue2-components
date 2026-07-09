<!--
  ============================================================
  TagSelect 标签多选组件演示页
  
  wjs created by 2022-09-26
  ============================================================
-->
<template>
  <div class="tag-select-demo">
    <PageHeader title="标签多选 TagSelect" content="回车即添加、可删除、可去重的标签录入"></PageHeader>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-card>
          <div slot="header">基础用法（回车添加）</div>
          <TagSelect
            v-model="tags1"
            placeholder="输入标签后回车，如：测试、示例"
          ></TagSelect>
          <p class="tip">当前值：{{ JSON.stringify(tags1) }}</p>
          <p class="tip">支持粘贴多值（逗号 / 空格 / 换行自动拆分）。</p>
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card>
          <div slot="header">限制数量（最多 3 个）</div>
          <TagSelect
            v-model="tags2"
            :max="3"
            type="success"
            placeholder="最多添加 3 个"
          ></TagSelect>
          <p class="tip">达到上限后再添加会提示，已选：{{ tags2.length }} / 3</p>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
/**
 * TagSelect 组件演示
 * wjs created by 2022-09-26
 */
import TagSelect from '@/components/TagSelect/index.vue'

export default {
  name: 'TagSelectDemo',
  components: { TagSelect },
  data() {
    return {
      tags1: ['示例标签', '测试'],
      tags2: ['Vue', 'React']
    }
  }
}
</script>

<style lang="scss" scoped>
.tag-select-demo {
  .tip {
    color: #909399;
    font-size: 12px;
    margin-top: 10px;
  }
}
</style>
