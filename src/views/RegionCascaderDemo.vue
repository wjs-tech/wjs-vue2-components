<!--
  ============================================================
  RegionCascader 省市区联动组件演示页
  
  wjs created by 2023-07-04
  ============================================================
-->
<template>
  <div class="region-cascader-demo">
    <PageHeader title="省市区联动 RegionCascader" content="基于 el-cascader 的行政区划级联选择（内置精简示例数据）"></PageHeader>

    <el-card>
      <div slot="header">基础用法</div>
      <el-form label-width="100px" style="max-width: 520px;">
        <el-form-item label="所在地区">
          <RegionCascader
            v-model="region"
            style="width: 100%;"
          ></RegionCascader>
        </el-form-item>
        <el-form-item label="选中路径">
          <span class="value">{{ region.length ? region.join(' / ') : '（未选择）' }}</span>
        </el-form-item>
        <el-form-item label="禁用示例">
          <RegionCascader
            :value="['prov-a', 'city-a1', 'area-a1-1']"
            disabled
            style="width: 100%;"
          ></RegionCascader>
        </el-form-item>
      </el-form>
      <p class="tip">内置数据为脱敏示例（示例省/市/区），如需真实区划可传入 options 覆盖。</p>
    </el-card>
  </div>
</template>

<script>
/**
 * RegionCascader 组件演示
 * wjs created by 2023-07-04
 */
import RegionCascader from '@/components/RegionCascader/index.vue'

export default {
  name: 'RegionCascaderDemo',
  components: { RegionCascader },
  data() {
    return {
      region: []
    }
  }
}
</script>

<style lang="scss" scoped>
.region-cascader-demo {
  .value {
    color: #409eff;
    font-size: 13px;
  }
  .tip {
    color: #909399;
    font-size: 12px;
    margin-top: 12px;
  }
}
</style>
