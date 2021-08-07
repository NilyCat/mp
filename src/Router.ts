import { qs } from '@nily/utils'

function routerQuery(url: string, query?: Record<string, any>): string {
  if (query) {
    url += '?' + qs.stringify(query)
  }
  return url
}

export class Router {
  /**
   * 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页。
   *
   * - [Router.switchTab(url: string, query?: Object, options?: Object)](https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.switchTab.html)
   */
  static switchTab(
    url: string,
    query?: Record<string, any>,
    options?: Omit<WechatMiniprogram.SwitchTabOption, 'url'>
  ): void {
    wx.switchTab({
      url: routerQuery(url, query),
      ...options
    })
  }

  /**
   * 保留当前页面，跳转到应用内的某个页面。但是不能跳到 tabbar 页面。
   *
   * - [Router.push(url: string, query?: Object, options?: Object)](https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.navigateTo.html)
   */
  static push(
    url: string,
    query?: Record<string, any>,
    options?: Omit<WechatMiniprogram.NavigateToOption, 'url'>
  ): void {
    wx.navigateTo({
      url: routerQuery(url, query),
      ...options
    })
  }

  /**
   * 关闭当前页面，跳转到应用内的某个页面。但是不允许跳转到 tabbar 页面。
   *
   * - [Router.replace(url: string, query?: Object, options?: Object)](https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.redirectTo.html)
   */
  static replace(
    url: string,
    query?: Record<string, any>,
    options?: Omit<WechatMiniprogram.RedirectToOption, 'url'>
  ): void {
    wx.redirectTo({
      url: routerQuery(url, query),
      ...options
    })
  }

  /**
   * 关闭当前页面，返回上一页面或多级页面。
   *
   * - [Router.back(delta?: number, options?: Object)](https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.navigateBack.html)
   */
  static back(delta?: number, options?: Omit<WechatMiniprogram.NavigateBackOption, 'delta'>): void {
    wx.navigateBack({
      delta,
      ...options
    } as any)
  }
}
