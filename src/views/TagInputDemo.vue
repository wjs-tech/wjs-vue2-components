<!--
  ============================================================
  标签输入 TagInput 演示页
  
  wjs created by 2024-06-10
  ============================================================
-->
<template>
  <div class="tag-input-demo">
    <PageHeader title="标签输入 TagInput" content="回车生成标签，自动去重并支持数量上限与单标签长度限制，常用于关键词录入">
    </PageHeader>

    <el-alert
      type="info"
      :closable="false"
      show-icon
      style="margin-bottom: 16px;"
      title="说明"
      description="输入文本后按回车 / 逗号 / 分号 / 空格 即可生成标签；已存在的标签会自动去重；达到 max 上限后停止生成。"
    />

    <el-row :gutter="20">
      <el-col :span="12">
        <el-card>
          <div slot="header">基础用法</div>
          <el-form label-width="90px">
            <el-form-item label="关键词">
              <TagInput v-model="tags" placeholder="输入关键词后回车" />
            </el-form-item>
            <el-form-item label="当前值">
              <code class="value-box">{{ JSON.stringify(tags) }}</code>
            </el-form-item>
            <el-form-item>
              <el-button size="small" @click="tags = []">清空</el-button>
              <el-button size="small" @click="addSample">添加示例</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card>
          <div slot="header">数量上限（max=5）与单标签长度限制（maxlength=6）</div>
          <el-form label-width="90px">
            <el-form-item label="标签">
              <TagInput v-model="tags2" :max="5" :maxlength="6" placeholder="最多 5 个，每标签≤6字" />
            </el-form-item>
            <el-form-item label="当前值">
              <code class="value-box">{{ JSON.stringify(tags2) }}</code>
            </el-form-item>
          </el-form>
          <el-alert
            v-if="exceedTip"
            type="warning"
            :closable="false"
            title="已达到数量上限，无法继续添加"
            style="margin-top: 8px;"
          />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import TagInput from '@/components/TagInput/index.vue'

export default {
  name: 'TagInputDemo',
  components: { TagInput },
  data() {
    return {
      tags: ['示例标签', '测试'],
      tags2: [],
      exceedTip: false
    }
  },
  methods: {
    addSample() {
      this.tags = ['前端', 'Vue', 'ElementUI', '组件库']
    }
  },
  watch: {
    tags2(val) {
      this.exceedTip = this.tags2.length >= 5
    }
  }
}
</script>

<style lang="scss" scoped>
.tag-input-demo {
  .value-box {
    display: inline-block;
    padding: 4px 8px;
    background: #f5f7fa;
    border-radius: 4px;
    font-size: 12px;
    color: #606266;
    word-break: break-all;
  }
}
</style>
