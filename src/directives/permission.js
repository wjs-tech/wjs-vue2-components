/**
 * ============================================================
 * Permission 权限指令
 *
 * 基于 Vue 自定义指令实现的权限控制：根据传入的权限码数组，
 * 判断当前用户是否拥有其中任一权限，无权限则移除（或隐藏）元素。
 *
 * 用法：
 *   import permission from '@/directives/permission'
 *   export default { directives: { permission } }
 *   <el-button v-permission="['admin']">删除</el-button>
 *
 * 说明：
 *   - 绑定值支持字符串（单权限）或数组（多权限，满足任一即可）
 *   - 全局权限集合通过 window.__APP_PERMISSIONS 或指令的 setPermissions 注入
 *
 * wjs created by 2021-02-14
 * ============================================================
 */

// 当前用户拥有的权限码集合（由业务在登录后注入）
let permissions = []

/**
 * 设置当前用户权限码
 * @param {Array<string>} codes 权限码数组
 */
export function setPermissions(codes) {
  permissions = Array.isArray(codes) ? codes : []
}

/**
 * 判断是否拥有某个权限
 * @param {string|Array<string>} required 需要的权限码或权限码数组
 * @returns {boolean}
 */
export function hasPermission(required) {
  if (!required) return true
  const list = Array.isArray(required) ? required : [required]
  if (!list.length) return true
  return list.some((code) => permissions.includes(code))
}

const permission = {
  inserted(el, binding) {
    if (!hasPermission(binding.value)) {
      // 无权限：从 DOM 中移除元素（也可改为隐藏 el.style.display = 'none'）
      if (el.parentNode) {
        el.parentNode.removeChild(el)
      } else {
        el.style.display = 'none'
      }
    }
  },
  // 支持动态权限变更时重新判断
  update(el, binding) {
    if (!hasPermission(binding.value)) {
      if (el.parentNode) {
        el.parentNode.removeChild(el)
      } else {
        el.style.display = 'none'
      }
    }
  }
}

export default permission
