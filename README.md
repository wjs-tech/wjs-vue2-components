# wjs-vue2-components

> Vue2 开发积累 · ElementUI 业务组件二次封装笔记

[![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Vue2](https://img.shields.io/badge/Vue-2.6.x-4FC08D?logo=vue.js&logoColor=white)](https://v2.vuejs.org/)
[![ElementUI](https://img.shields.io/badge/ElementUI-2.15.x-409EFF?logo=element&logoColor=white)](https://element.eleme.cn/)
[![Maintenance](https://img.shields.io/badge/Maintained-2018--2024-blue.svg)](https://github.com/wjs-tech/wjs-vue2-components)

将 2018~2024 年 Vue2 + ElementUI 项目中积累的业务组件二次封装笔记进行开源，涵盖表单、表格、上传、选择器、反馈、展示等 29 个常用业务组件。ElementUI 最后版本停在 2.15.14。

[📖 在线演示 & 组件预览](https://wjs-tech.github.io/wjs-vue2-components/)

---

## ✨ 特性

- **基于 ElementUI** - 在 ElementUI 2.15.x 基础上二次封装，遵循原组件 API 风格
- **业务场景化** - 针对真实业务需求封装，而非简单的样式包裹
- **配置化驱动** - 表格、表单等组件支持 columns / items 配置化渲染
- **完整 Demo** - 每个组件都有对应的演示页面，含多种使用场景
- **脱敏处理** - 所有业务数据均已脱敏，不含任何真实信息
- **详细注释** - 每个组件都有完整的功能说明、Props、Events 和适用场景
- **时间线清晰** - 按年份记录组件演进，从 2018 到 2024 共 7 个年头

---

## 📦 组件清单

共 **29** 个业务组件，按功能分为六大类。

### 📝 表单组件

| 组件 | 说明 | 封装年份 |
|------|------|----------|
| SearchForm | 搜索表单，响应式栅格 + 折叠展开 + 重置 | 2018 |
| FilterBar | 可折叠的高级筛选条件栏 | 2020 |
| DictSelect | 联动后端字典接口的 el-select | 2019 |
| TagSelect | 标签化多选录入，回车添加 | 2022 |
| TagInput | 回车生成标签的输入框，去重 + 上限 | 2024 |
| StepsForm | 多步骤表单分步校验与提交 | 2019 |
| FormDrawer | el-drawer 承载表单，底部固定操作栏 | 2018 |
| FormDialog | 弹窗表单封装，支持校验与提交 loading | 2018 |

### 📊 表格组件

| 组件 | 说明 | 封装年份 |
|------|------|----------|
| TablePro | 分页/排序/列配置/工具栏一体化表格 | 2019 |
| CrudTable | 内置新增/编辑弹窗的 CRUD 表格 | 2020 |
| PaginationPro | el-pagination 封装，page/size 双向同步 | 2020 |
| TableSelect | el-select + el-table 下拉选择器 | 2023 |

### 🖼️ 业务组件

| 组件 | 说明 | 封装年份 |
|------|------|----------|
| UploadImage | 单/多图上传 + 裁剪 + 回显进度 | 2021 |
| AvatarUpload | 圆形头像裁剪上传 | 2022 |
| ImagePreview | 缩略图网格 + 大图预览 | 2019 |
| RegionCascader | 行政区划省市区联动 | 2023 |
| CascaderPanel | el-cascader 面板化多选 | 2021 |
| TreeSelect | el-tree + el-popover 树形下拉 | 2024 |
| ExcelExport | 带进度反馈的表格导出按钮 | 2023 |
| RichTextEditor | 富文本编辑器 v-model 封装 | 2024 |

### 💬 反馈组件

| 组件 | 说明 | 封装年份 |
|------|------|----------|
| ConfirmDialog | Promise 化确认弹窗 | 2022 |
| ResultPage | 成功/失败/警告结果页 | 2018 |
| LoadingMask | 区域级 loading 遮罩 | 2023 |
| Skeleton | 列表/详情加载占位骨架 | 2024 |
| EmptyState | 统一缺省页插画与文案 | 2023 |

### 🎯 展示与通用

| 组件 | 说明 | 封装年份 |
|------|------|----------|
| PageHeader | 标题 + 面包屑 + 操作位页头 | 2019 |
| CopyText | 一键复制文本带成功反馈 | 2022 |
| BackTop | 滚动监听回到顶部按钮 | 2021 |
| AuthButton | 带权限判断 + 防重复点击按钮 | 2022 |
| v-permission | 权限指令（自定义指令） | 2021 |

---

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发预览

```bash
npm run dev
```

访问 http://localhost:8080 查看组件演示。

### 构建生产版本

```bash
npm run build
```

### 打包组件库（umd）

```bash
npm run build:lib
```

### 组件使用示例

```vue
<template>
  <div>
    <!-- 高级表格 -->
    <TablePro
      :columns="columns"
      :data="tableData"
      :total="total"
      :page="page"
      :page-size="pageSize"
      selection
      index
      @page-change="handlePageChange"
      @action="handleAction"
    />
  </div>
</template>

<script>
import TablePro from '@/components/TablePro/index.vue'

export default {
  components: { TablePro },
  data() {
    return {
      columns: [
        { prop: 'name', label: '姓名', width: 100 },
        { prop: 'status', label: '状态', type: 'tag', dict: [...] },
        { prop: 'action', label: '操作', type: 'action', actions: [...] }
      ],
      tableData: [],
      total: 0,
      page: 1,
      pageSize: 10
    }
  }
}
</script>
```

---

## 📂 目录结构

```
wjs-vue2-components/
├── build/                    # webpack 配置
│   ├── webpack.base.conf.js
│   ├── webpack.dev.conf.js
│   ├── webpack.prod.conf.js
│   └── webpack.lib.conf.js   # 组件库打包配置
├── public/                   # 静态资源
│   └── index.html
├── src/
│   ├── components/           # 业务组件（29 个）
│   │   ├── SearchForm/
│   │   ├── TablePro/
│   │   ├── UploadImage/
│   │   ├── DictSelect/
│   │   ├── FormDrawer/
│   │   ├── ...
│   │   └── index.js          # 统一出口
│   ├── views/                # 演示页面
│   │   ├── Home.vue          # 首页（组件总览）
│   │   ├── TableProDemo.vue
│   │   ├── UploadImageDemo.vue
│   │   └── ...
│   ├── directives/           # 自定义指令
│   │   └── permission.js
│   ├── router/               # 路由配置
│   ├── styles/               # 全局样式
│   ├── App.vue
│   └── main.js
├── design-preview.html       # 静态预览页
├── package.json
└── README.md
```

---

## 🌐 浏览器兼容性

| Chrome | Edge | Firefox | Safari | IE |
|--------|------|---------|--------|-----|
| ✅ 全版本 | ✅ 全版本 | ✅ 全版本 | ✅ 全版本 | ⚠️ 11 |

> 基于 Vue2 + ElementUI，浏览器兼容范围与 ElementUI 2.x 一致。

---

## 📄 License

[MIT](LICENSE) © wjs (王金盛) 2018-2024
