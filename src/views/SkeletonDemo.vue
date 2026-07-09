<!--
  ============================================================
  骨架屏 Skeleton 演示页
  
  wjs created by 2024-01-08
  ============================================================
-->
<template>
  <div class="skeleton-demo">
    <PageHeader title="骨架屏 Skeleton" content="基于 el-skeleton 封装，列表 / 详情加载占位，支持行数、头像、动画配置，缓解白屏焦虑">
    </PageHeader>

    <el-alert
      type="info"
      :closable="false"
      show-icon
      style="margin-bottom: 16px;"
      title="说明"
      description="loading 为 true 时展示骨架占位，加载完成后自动切换为真实内容。点击「模拟请求」可观察占位到内容的过渡。"
    />

    <el-row :gutter="20">
      <el-col :span="12">
        <el-card>
          <div slot="header" class="card-head">
            <span>列表占位（头像 + 3 行）</span>
            <el-button size="small" type="primary" @click="loadList">模拟请求</el-button>
          </div>
          <Skeleton :loading="listLoading" :avatar="true" :rows="3">
            <ul class="demo-list">
              <li v-for="item in list" :key="item.id">
                <el-avatar :size="40" icon="el-icon-user-solid"></el-avatar>
                <div class="demo-list__meta">
                  <div class="demo-list__title">{{ item.name }}</div>
                  <div class="demo-list__desc">{{ item.desc }}</div>
                </div>
              </li>
            </ul>
          </Skeleton>
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card>
          <div slot="header" class="card-head">
            <span>自定义模板（卡片骨架）</span>
            <el-switch v-model="customLoading" active-text="加载中" inactive-text="已加载" />
          </div>
          <Skeleton :loading="customLoading">
            <template slot="template">
              <div class="custom-skeleton">
                <el-skeleton-item variant="image" style="width: 100%; height: 120px;" />
                <div style="padding: 12px;">
                  <el-skeleton-item variant="h3" style="width: 50%;" />
                  <div style="margin-top: 12px;">
                    <el-skeleton-item variant="text" style="width: 100%;" />
                    <el-skeleton-item variant="text" style="width: 80%;" />
                  </div>
                </div>
              </div>
            </template>
            <div class="custom-real">
              <div class="custom-real__cover">示例封面</div>
              <h3>示例标题</h3>
              <p>这是加载完成后展示的真实内容，骨架屏仅在 loading 为 true 时出现。</p>
            </div>
          </Skeleton>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Skeleton from '@/components/Skeleton/index.vue'

export default {
  name: 'SkeletonDemo',
  components: { Skeleton },
  data() {
    return {
      listLoading: true,
      customLoading: true,
      list: []
    }
  },
  created() {
    this.loadList()
  },
  methods: {
    loadList() {
      this.listLoading = true
      // 模拟异步请求
      setTimeout(() => {
        this.list = [
          { id: 1, name: '示例用户一', desc: '这是一条用于演示的示例数据描述文本。' },
          { id: 2, name: '示例用户二', desc: '这是一条用于演示的示例数据描述文本。' },
          { id: 3, name: '示例用户三', desc: '这是一条用于演示的示例数据描述文本。' }
        ]
        this.listLoading = false
      }, 1500)
    }
  }
}
</script>

<style lang="scss" scoped>
.skeleton-demo {
  .card-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .demo-list {
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      display: flex;
      align-items: center;
      padding: 10px 0;
      border-bottom: 1px solid #f0f0f0;

      &:last-child {
        border-bottom: none;
      }
    }

    &__meta {
      margin-left: 12px;
    }

    &__title {
      font-weight: 600;
      color: #303133;
    }

    &__desc {
      font-size: 13px;
      color: #909399;
      margin-top: 4px;
    }
  }

  .custom-real {
    &__cover {
      height: 120px;
      border-radius: 4px;
      background: linear-gradient(135deg, #409eff, #67c23a);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
    }

    h3 {
      margin: 12px 0 6px;
    }

    p {
      color: #606266;
      font-size: 14px;
    }
  }
}
</style>
