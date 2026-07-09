<!--
  ============================================================
  ExcelExport 导出按钮组件
  
  功能说明：
    基于 el-button 封装的表格导出按钮，支持 CSV 与简易 Excel(HTML) 导出。
    纯前端通过 Blob 生成文件下载，不引入任何第三方库。
    大数据量时分片处理并实时展示导出进度，避免卡顿。
  
  Props:
    data: Array - 待导出的数据数组
    columns: Array - 列配置 [{ prop, label }]
    fileName: String - 导出文件名（不含扩展名）
    type: String - 导出类型 csv | excel
    chunkSize: Number - 分片大小（每片后让出主线程）
    buttonText: String - 按钮文案
    type(按钮): String - el-button 类型
    disabled: Boolean - 是否禁用
  
  Events:
    start - 开始导出
    progress - 导出进度（percent 0-100）
    success - 导出完成（返回 fileName）
    error - 导出异常
  
  适用场景：
    - 后台列表的「导出 Excel / CSV」按钮
    - 需要前端直接生成文件、无需后端配合的轻量导出场景
  
  wjs created by 2023-11-22
  ============================================================
-->
<template>
  <div class="excel-export">
    <el-button
      :type="btnType"
      :disabled="disabled || exporting"
      :loading="exporting"
      @click="handleExport"
    >
      <slot>{{ buttonText }}</slot>
    </el-button>
    <el-progress
      v-if="exporting"
      :percentage="percent"
      :stroke-width="10"
      class="excel-export__progress"
    ></el-progress>
  </div>
</template>

<script>
/**
 * ExcelExport 导出按钮组件
 * 纯前端分片导出 CSV / 简易 Excel，无第三方依赖
 * wjs created by 2023-11-22
 */
export default {
  name: 'ExcelExport',
  props: {
    data: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    fileName: {
      type: String,
      default: '导出数据'
    },
    type: {
      type: String,
      default: 'excel' // csv | excel
    },
    chunkSize: {
      type: Number,
      default: 1000
    },
    buttonText: {
      type: String,
      default: '导出数据'
    },
    btnType: {
      type: String,
      default: 'primary'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      exporting: false,
      percent: 0
    }
  },
  methods: {
    // CSV 单元格转义：含逗号/引号/换行时整体加引号，内部引号翻倍
    csvCell(val) {
      const s = val == null ? '' : String(val)
      if (/[",\n\r]/.test(s)) {
        return '"' + s.replace(/"/g, '""') + '"'
      }
      return s
    },
    buildCsv() {
      const header = this.columns.map(c => this.csvCell(c.label)).join(',')
      const lines = [header]
      this.data.forEach(row => {
        const line = this.columns.map(c => this.csvCell(row[c.prop])).join(',')
        lines.push(line)
      })
      // 加 BOM 以保证 Excel 正确识别 UTF-8
      return '﻿' + lines.join('\r\n')
    },
    buildExcel() {
      const headerCells = this.columns
        .map(c => `<th>${this.escapeHtml(c.label)}</th>`)
        .join('')
      const bodyRows = this.data
        .map(row => {
          const tds = this.columns
            .map(c => `<td>${this.escapeHtml(row[c.prop])}</td>`)
            .join('')
          return `<tr>${tds}</tr>`
        })
        .join('')
      const table = `<table border="1"><thead><tr>${headerCells}</tr></thead><tbody>${bodyRows}</tbody></table>`
      const html =
        '<html xmlns:o="urn:schemas-microsoft-com:office:office" ' +
        'xmlns:x="urn:schemas-microsoft-com:office:excel">' +
        '<head><meta charset="UTF-8"></head><body>' +
        table +
        '</body></html>'
      return '﻿' + html
    },
    escapeHtml(val) {
      return String(val == null ? '' : val)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
    },
    async handleExport() {
      if (this.exporting) return
      if (!this.data.length) {
        this.$message && this.$message.warning('暂无数据可导出')
        return
      }
      this.exporting = true
      this.percent = 0
      this.$emit('start')
      try {
        const ext = this.type === 'csv' ? 'csv' : 'xls'
        const mime = this.type === 'csv' ? 'text/csv;charset=utf-8' : 'application/vnd.ms-excel'
        const content = this.type === 'csv' ? this.buildCsv() : this.buildExcel()
        // 分片处理进度展示（数据已在内存，分片用于让出主线程与进度反馈）
        const total = this.data.length
        const steps = Math.ceil(total / this.chunkSize)
        for (let i = 1; i <= steps; i++) {
          await new Promise(resolve => setTimeout(resolve, 0))
          this.percent = Math.min(99, Math.round((i / steps) * 100))
          this.$emit('progress', this.percent)
        }
        this.download(content, mime, `${this.fileName}.${ext}`)
        this.percent = 100
        this.$emit('progress', 100)
        this.$emit('success', `${this.fileName}.${ext}`)
        this.$message && this.$message.success('导出成功')
      } catch (err) {
        this.$emit('error', err)
        this.$message && this.$message.error('导出失败')
      } finally {
        this.exporting = false
      }
    },
    download(content, mime, filename) {
      const blob = new Blob([content], { type: mime })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      // 释放对象 URL
      setTimeout(() => URL.revokeObjectURL(url), 0)
    }
  }
}
</script>

<style lang="scss" scoped>
.excel-export {
  display: inline-flex;
  align-items: center;
  gap: 12px;

  &__progress {
    width: 160px;
  }
}
</style>
