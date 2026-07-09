<!--
  ============================================================
  首页 - 组件总览（玻璃态设计）
  
  功能说明：
    组件库入口总览页
    支持搜索与年份筛选，点击卡片跳转对应 Demo
  
  wjs created by 2018-06-01
  ============================================================
-->
<template>
  <div class="overview">
    <div class="blob b1"></div>
    <div class="blob b2"></div>
    <div class="blob b3"></div>

    <section class="hero">
      <span class="eyebrow">VUE2 · ELEMENTUI 二次封装沉淀</span>
      <h1><span class="grad">2018</span> ~ <span class="grad">2024</span><br/>Vue2 业务组件二次封装笔记</h1>
      <p>基于Element UI库，针对不同业务需求的二次封装笔记，每个组件都已脱敏，点击任意卡片进入对应Demo。</p>
      <div class="ver-range">📦 ElementUI 版本演进：<b>2.0</b> → <b>2.15.14</b></div>

      <div class="search">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input v-model="kw" type="text" placeholder="搜索组件名称 / 英文 / 描述…" aria-label="搜索组件" />
      </div>
    </section>

    <div class="filters">
      <span
        v-for="y in years"
        :key="y"
        :class="['chip', { active: activeYear === y }]"
        :style="y !== 'all' ? { color: YEAR_COLOR[y] } : {}"
        @click="activeYear = y"
      >{{ y === 'all' ? '全部' : y }}</span>
    </div>

    <div class="grid">
      <div
        v-for="c in filtered"
        :key="c.en"
        class="card"
        :style="{ '--yc': YEAR_COLOR[c.year] }"
        tabindex="0"
        role="button"
        :aria-label="c.name + ' ' + c.en"
        @click="go(c.path)"
        @keydown.enter="go(c.path)"
      >
        <div class="head">
          <div class="year-badge">{{ c.year }}</div>
          <div class="icon-box" v-html="svg(I[c.icon])"></div>
        </div>
        <h3>{{ c.name }}</h3>
        <div class="en">{{ c.en }}</div>
        <div class="desc">{{ c.desc }}</div>
        <div class="ver" v-html="VER + '基于 ElementUI ' + c.ver"></div>
      </div>
      <div v-if="!filtered.length" class="empty">没有匹配的组件，换个关键词试试～</div>
    </div>

    <div class="foot">
      <b>WJS Vue2 Components</b> · 2018–2024 沉淀<br/>
      本地开发预览，最终确认后再推送 GitHub 开源 · wjs created by 2018–2024
    </div>
  </div>
</template>

<script>
/**
 * 组件总览首页
 * wjs created by 2018-06-01
 */
export default {
  name: 'ComponentOverview',
  data() {
    return {
      kw: '',
      activeYear: 'all',
      // 年份色阶：2018 深靛蓝 → 2024 琥珀金，逐年变亮
      YEAR_COLOR: {
        2018: '#5b6ee8', 2019: '#4d8af0', 2020: '#2ba8e0', 2021: '#1fc4c9',
        2022: '#25c08a', 2023: '#7ac943', 2024: '#d4a13f'
      },
      // 统一描边 SVG 图标（Feather/Lucide 风格）
      I: {
        search: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
        check: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
        drawer: '<rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/>',
        layout: '<rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>',
        list: '<line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>',
        image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>',
        steps: '<line x1="10" y1="6" x2="21" y2="6"/><line x1="10" y1="12" x2="21" y2="12"/><line x1="10" y1="18" x2="21" y2="18"/><path d="M4 4h1v4"/><path d="M4 10h2"/>',
        grid: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>',
        db: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>',
        filter: '<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>',
        upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>',
        key: '<path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>',
        chevron: '<polyline points="6 9 12 15 18 9"/>',
        dialog: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
        shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
        user: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
        tag: '<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>',
        gridsel: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><polyline points="9 12 12 15 15 12" stroke-width="1.4"/>',
        pin: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
        download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
        edit: '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>',
        tree: '<rect x="3" y="3" width="6" height="6"/><rect x="15" y="15" width="6" height="6"/><path d="M9 6h6a3 3 0 0 1 3 3v6"/>',
        taginput: '<rect x="3" y="3" width="18" height="18" rx="2"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>',
        loader: '<line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/>',
        inbox: '<polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>',
        refresh: '<polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>',
        copy: '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
        top: '<line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>',
        pager: '<polyline points="9 6 15 12 9 18"/><polyline points="15 6 21 12 15 18"/>'
      },
      VER: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:12px;height:12px"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>',
      components: [
        { name: '搜索表单', en: 'WjsSearchForm', year: 2018, ver: '2.4.0', icon: 'search', desc: '基于 el-form 的查询条件区，响应式栅格 + 一键重置 + 折叠展开。', path: '/search-form' },
        { name: '页头', en: 'WjsPageHeader', year: 2019, ver: '2.8.0', icon: 'layout', desc: '标题 + 面包屑 + 右侧操作位的页面头部。', path: '/page-header' },
        { name: '字典选择器', en: 'WjsDictSelect', year: 2019, ver: '2.8.0', icon: 'list', desc: '联动后端字典接口的 el-select 二次封装。', path: '/dict-select' },
        { name: '增强表格', en: 'WjsTablePro', year: 2020, ver: '2.13.0', icon: 'grid', desc: '分页/排序/列配置/工具栏一体化表格。', path: '/table-pro' },
        { name: '图片上传', en: 'WjsUploadImage', year: 2021, ver: '2.15.0', icon: 'upload', desc: '单/多图上传 + 裁剪 + 回显进度。', path: '/upload-image' },
        { name: '确认弹窗', en: 'WjsConfirmDialog', year: 2022, ver: '2.15.8', icon: 'dialog', desc: 'Promise 化的确认弹窗封装，内置取消/确定与提交 loading。', path: '/confirm-dialog' },
        { name: '分页增强', en: 'WjsPaginationPro', year: 2020, ver: '2.13.0', icon: 'pager', desc: 'el-pagination 封装，page/size 双向同步、单页自动隐藏。', path: '/pagination-pro' },
        { name: '树形选择', en: 'WjsTreeSelect', year: 2024, ver: '2.15.14', icon: 'tree', desc: 'el-tree + el-popover 的树形下拉选择，支持搜索。', path: '/tree-select' },
        { name: '结果页', en: 'WjsResultPage', year: 2018, ver: '2.2.0', icon: 'check', desc: '成功/失败/警告等反馈结果页，含状态图标与操作区。', path: '/result-page' },
        { name: '表单抽屉', en: 'WjsFormDrawer', year: 2018, ver: '2.3.0', icon: 'drawer', desc: '用 el-drawer 承载表单，底部固定操作栏。', path: '/form-drawer' },
        { name: '图片预览', en: 'WjsImagePreview', year: 2019, ver: '2.7.0', icon: 'image', desc: '点击缩略图调 el-image 预览大图，支持多图切换。', path: '/image-preview' },
        { name: '分步表单', en: 'WjsStepsForm', year: 2019, ver: '2.9.0', icon: 'steps', desc: '多步骤 el-form 分步校验与步骤条联动提交。', path: '/steps-form' },
        { name: '增删改查表格', en: 'WjsCrudTable', year: 2020, ver: '2.13.0', icon: 'db', desc: '内置新增/编辑弹窗的 CRUD 表格，省去重复样板。', path: '/crud-table' },
        { name: '筛选栏', en: 'WjsFilterBar', year: 2020, ver: '2.12.0', icon: 'filter', desc: '可折叠的高级筛选条件栏，与搜索表单互补。', path: '/filter-bar' },
        { name: '权限指令', en: 'WjsPermission', year: 2021, ver: '2.15.1', icon: 'key', desc: 'v-permission 控制元素显隐的自定义指令。', path: '/permission-demo' },
        { name: '级联面板', en: 'WjsCascaderPanel', year: 2021, ver: '2.15.2', icon: 'chevron', desc: 'el-cascader 面板化多选封装，适配树形选择。', path: '/cascader-panel' },
        { name: '权限按钮', en: 'WjsAuthButton', year: 2022, ver: '2.15.8', icon: 'shield', desc: '带权限判断与防重复点击的按钮组件。', path: '/auth-button' },
        { name: '头像上传', en: 'WjsAvatarUpload', year: 2022, ver: '2.15.9', icon: 'user', desc: '圆形头像裁剪上传，实时预览与格式校验。', path: '/avatar-upload' },
        { name: '标签多选', en: 'WjsTagSelect', year: 2022, ver: '2.15.9', icon: 'tag', desc: '标签化多选录入，回车即添加、可删除。', path: '/tag-select' },
        { name: '复制文本', en: 'WjsCopyText', year: 2022, ver: '2.15.10', icon: 'copy', desc: '一键复制文本带成功反馈的轻量组件。', path: '/copy-text' },
        { name: '下拉表格选择', en: 'WjsTableSelect', year: 2023, ver: '2.15.13', icon: 'gridsel', desc: 'el-select + el-table 的下拉选择器，列表里挑数据。', path: '/table-select' },
        { name: '省市区联动', en: 'WjsRegionCascader', year: 2023, ver: '2.15.13', icon: 'pin', desc: '行政区划级联选择封装，内置示例数据适配。', path: '/region-cascader' },
        { name: '导出按钮', en: 'WjsExcelExport', year: 2023, ver: '2.15.13', icon: 'download', desc: '带进度与分片的表格导出按钮，纯前端不卡。', path: '/excel-export' },
        { name: '空状态', en: 'WjsEmptyState', year: 2023, ver: '2.15.13', icon: 'inbox', desc: '统一缺省页插画与文案，处理无数据场景。', path: '/empty-state' },
        { name: '加载遮罩', en: 'WjsLoadingMask', year: 2023, ver: '2.15.14', icon: 'refresh', desc: '区域级 loading 遮罩封装，局部刷新更优雅。', path: '/loading-mask' },
        { name: '富文本编辑器', en: 'WjsRichTextEditor', year: 2024, ver: '2.15.14', icon: 'edit', desc: '集成富文本能力封装，v-model 双向绑定。', path: '/rich-text-editor' },
        { name: '标签输入', en: 'WjsTagInput', year: 2024, ver: '2.15.14', icon: 'taginput', desc: '回车生成标签的输入框，去重与上限控制。', path: '/tag-input' },
        { name: '骨架屏', en: 'WjsSkeleton', year: 2024, ver: '2.15.14', icon: 'loader', desc: '列表/详情加载占位骨架，缓解白屏焦虑。', path: '/skeleton' },
        { name: '返回顶部', en: 'WjsBackTop', year: 2021, ver: '2.15.5', icon: 'top', desc: '滚动监听的回到顶部按钮，可自定义触发高度。', path: '/back-top' }
      ]
    }
  },
  computed: {
    years() {
      return ['all', ...Object.keys(this.YEAR_COLOR)]
    },
    filtered() {
      const kw = this.kw.trim().toLowerCase()
      return this.components.filter(c => {
        const okYear = this.activeYear === 'all' || String(c.year) === this.activeYear
        const okKw = !kw || (c.name + c.en + c.desc).toLowerCase().includes(kw)
        return okYear && okKw
      })
    }
  },
  methods: {
    svg(p) {
      return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="width:22px;height:22px">' + p + '</svg>'
    },
    go(path) {
      this.$router.push(path)
    }
  }
}
</script>

<style lang="scss" scoped>
.overview {
  position: relative;
  margin: -20px;
  padding: 40px 32px 60px;
  min-height: calc(100vh - 40px);
  background: linear-gradient(135deg, #eef2ff 0%, #f5f3ff 45%, #ecfeff 100%);
  overflow: hidden;
}

/* 浮动模糊色块，营造玻璃景深 */
.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.45;
  z-index: 0;
  pointer-events: none;
}
.blob.b1 { width: 420px; height: 420px; background: #a5b4fc; top: -120px; left: -80px; }
.blob.b2 { width: 380px; height: 380px; background: #7dd3fc; top: 30%; right: -120px; }
.blob.b3 { width: 360px; height: 360px; background: #c4b5fd; bottom: -140px; left: 20%; }

.hero, .filters, .grid, .foot { position: relative; z-index: 1; }

.hero { padding: 20px 4px 10px; text-align: center; }
.hero .eyebrow {
  display: inline-block;
  font-size: 12px; letter-spacing: 2px;
  color: #6366f1; font-weight: 600;
  padding: 5px 14px; border-radius: 999px;
  background: rgba(99, 102, 241, 0.10);
  margin-bottom: 16px;
}
.hero h1 { font-size: 38px; line-height: 1.2; font-weight: 800; letter-spacing: -0.5px; color: #1f2440; }
.hero h1 .grad {
  background: linear-gradient(120deg, #6366f1, #22d3ee, #34d399);
  -webkit-background-clip: text; background-clip: text; color: transparent;
}
.hero p { margin: 16px auto 0; max-width: 660px; color: #5b6178; font-size: 15px; line-height: 1.7; }
.hero .ver-range {
  display: inline-flex; align-items: center; gap: 8px;
  margin-top: 18px; font-family: "JetBrains Mono", "SF Mono", "Consolas", monospace; font-size: 13px;
  color: #1f2440; background: rgba(255, 255, 255, 0.78);
  border: 1px solid rgba(255, 255, 255, 0.75);
  padding: 8px 16px; border-radius: 999px;
}
.hero .ver-range b { color: #6366f1; }

.hero .search {
  position: relative;
  max-width: 360px;
  margin: 26px auto 0;
}
.hero .search input {
  width: 100%;
  padding: 11px 14px 11px 40px;
  border: 1px solid rgba(255, 255, 255, 0.75);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.78);
  font-size: 14px;
  color: #1f2440;
  outline: none;
  transition: border-color .2s, box-shadow .2s;
}
.hero .search input:focus {
  border-color: #818cf8;
  box-shadow: 0 0 0 4px rgba(129, 140, 248, 0.18);
}
.hero .search svg { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #8a90a8; }

.filters { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; margin: 24px 0 4px; }
.chip {
  border: 1px solid rgba(255, 255, 255, 0.75);
  background: rgba(255, 255, 255, 0.78);
  color: #5b6178;
  font-size: 13px; font-weight: 600;
  padding: 7px 15px; border-radius: 999px;
  cursor: pointer; transition: all .18s;
  user-select: none;
}
.chip:hover { color: #1f2440; transform: translateY(-1px); }
.chip.active { color: #fff; background: linear-gradient(135deg, #6366f1, #22d3ee); border-color: transparent; box-shadow: 0 6px 16px rgba(99,102,241,.3); }

.grid {
  margin-top: 28px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(264px, 1fr));
  gap: 20px;
  max-width: 1240px;
  margin-left: auto;
  margin-right: auto;
}

.card {
  position: relative;
  background: rgba(255, 255, 255, 0.55);
  -webkit-backdrop-filter: blur(14px);
  backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.75);
  border-radius: 18px;
  padding: 20px 20px 18px;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.10);
  cursor: pointer;
  overflow: hidden;
  transition: transform .28s cubic-bezier(.2,.8,.2,1), box-shadow .28s, border-color .28s;
  display: flex; flex-direction: column;
  min-height: 188px;
}
.card::before {
  content: "";
  position: absolute; left: 0; top: 0;
  width: 100%; height: 4px;
  background: var(--yc, #6366f1);
  opacity: .9;
}
.card:hover, .card:focus-visible {
  transform: translateY(-7px);
  box-shadow: 0 18px 48px rgba(31, 38, 135, 0.18);
  border-color: var(--yc, #818cf8);
  outline: none;
}
.card:focus-visible { outline: 3px solid var(--yc, #818cf8); outline-offset: 2px; }

.card .head { display: flex; align-items: center; justify-content: space-between; gap: 12px; }

.year-badge {
  width: 46px; height: 46px; border-radius: 50%;
  display: grid; place-items: center;
  color: #fff; font-weight: 700; font-size: 13px;
  background: var(--yc, #6366f1);
  box-shadow: 0 6px 16px color-mix(in srgb, var(--yc, #6366f1) 45%, transparent);
  flex: none;
  transition: transform .28s;
}
.card:hover .year-badge { transform: scale(1.08) rotate(-4deg); }

.icon-box {
  width: 42px; height: 42px; border-radius: 13px;
  display: grid; place-items: center;
  color: var(--yc, #6366f1);
  background: color-mix(in srgb, var(--yc, #6366f1) 12%, white);
  border: 1px solid color-mix(in srgb, var(--yc, #6366f1) 22%, transparent);
  flex: none;
}
.icon-box ::v-deep svg { width: 22px; height: 22px; }

.card h3 { margin-top: 16px; font-size: 17px; font-weight: 700; color: #1f2440; }
.card .en {
  font-family: "JetBrains Mono", "SF Mono", "Consolas", monospace; font-size: 12.5px; color: #8a90a8;
  margin-top: 3px; letter-spacing: .2px;
}
.card .desc { margin-top: 10px; font-size: 13px; color: #5b6178; line-height: 1.6; flex: 1; }

.card .ver {
  margin-top: 14px;
  display: inline-flex; align-items: center; gap: 6px; align-self: flex-start;
  font-family: "JetBrains Mono", "SF Mono", "Consolas", monospace; font-size: 11.5px;
  color: var(--yc, #6366f1);
  background: color-mix(in srgb, var(--yc, #6366f1) 10%, white);
  border: 1px solid color-mix(in srgb, var(--yc, #6366f1) 20%, transparent);
  padding: 4px 10px; border-radius: 999px;
}
.card .ver ::v-deep svg { width: 12px; height: 12px; }

.empty {
  grid-column: 1 / -1; text-align: center; color: #8a90a8;
  padding: 60px 0; font-size: 15px;
}

.foot {
  margin-top: 50px; text-align: center; color: #8a90a8;
  font-size: 12.5px; line-height: 1.8;
}
.foot b { color: #5b6178; }

@media (max-width: 640px) {
  .hero h1 { font-size: 28px; }
  .overview { padding: 24px 16px 50px; }
}
@media (prefers-reduced-motion: reduce) {
  .card, .year-badge, .chip { transition: none; }
}
</style>
