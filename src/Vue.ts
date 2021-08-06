import { qs } from '@nily/utils'
import { Component, Vue as VueClass } from 'vue-property-decorator'

function routerQuery(url: string, query?: Record<string, any>): string {
  if (query) {
    url += '?' + qs.stringify(query)
  }
  return url
}

@Component
export class Vue extends VueClass {
  // 显示 toast 提示
  $toast(title: string): void {
    uni.showToast({
      title,
      icon: 'none'
    })
  }

  // 隐藏 toast 提示
  $hideToast(): void {
    uni.hideToast()
  }

  // 显示 loading 提示框
  $showLoading(title?: string, mask = false): void {
    uni.showLoading({
      title,
      mask
    })
  }

  // 隐藏 loading 提示框
  $hideLoading(): void {
    uni.hideLoading()
  }

  // 开始下拉刷新
  $startPullDownRefresh(options: UniApp.StartPullDownRefreshOptions): void {
    uni.startPullDownRefresh(options)
  }

  // 停止当前页面下拉刷新
  $stopPullDownRefresh(): void {
    uni.stopPullDownRefresh()
  }

  /**
   * 切换 Tab
   *
   * @param url - 页面地址
   * @param query - 页面参数
   * @param options - 路由配置
   */
  $switchTab(url: string, query?: Record<string, any>, options?: UniApp.SwitchTabOptions): void {
    uni.switchTab({
      url: routerQuery(url, query),
      ...options
    })
  }

  /**
   * 前往下一页
   *
   * @param url - 页面地址
   * @param query - 页面参数
   * @param options - 路由配置
   */
  $push(url: string, query?: Record<string, any>, options?: UniApp.NavigateToOptions): void {
    uni.navigateTo({
      url: routerQuery(url, query),
      ...options
    })
  }

  /**
   * 页面替换
   *
   * @param url - 页面地址
   * @param query - 页面参数
   * @param options - 路由配置
   */
  $replace(url: string, query?: Record<string, any>, options?: UniApp.RedirectToOptions): void {
    uni.redirectTo({
      url: routerQuery(url, query),
      ...options
    })
  }

  /**
   * 页面返回
   *
   * @param delta - 层级
   * @param options - 路由配置
   */
  $back(delta?: number, options?: UniApp.NavigateBackOptions): void {
    uni.navigateBack({
      delta,
      ...options
    } as any)
  }
}
