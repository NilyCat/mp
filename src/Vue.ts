import { qs } from '@nily/utils'
import { Component, Vue as VueClass } from 'vue-property-decorator'

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

@Component
export class Vue extends VueClass {
  // 将 wx 附加在 vue 实例
  $wx: WechatMiniprogram.Wx = wx

  // 路由控制
  $router: Router = Router

  /**
   * 显示消息提示
   *
   * - [vue.$showToast](https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.showToast.html) 应与 [vue.$hideToast](https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.hideToast.html) 配对使用
   */
  $showToast(title: string, options?: Omit<WechatMiniprogram.ShowToastOption, 'title'>): void {
    wx.showToast({
      title,
      icon: 'none',
      ...options
    })
  }

  /**
   * 隐藏消息提示
   *
   * - [vue.$toast](https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.showToast.html) 应与 [vue.$hideToast](https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.hideToast.html) 配对使用
   */
  $hideToast(): void {
    wx.hideToast()
  }

  /**
   * 显示 loading 提示框。需主动调用 vue.$hideLoading 才能关闭提示框
   *
   * - [vue.$showLoading](https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.showLoading.html) 和 [vue.$showToast](https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.showToast.html) 同时只能显示一个
   * - [vue.$showLoading](https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.showLoading.html) 应与 [vue.$hideLoading](https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.hideLoading.html) 配对使用
   */
  $showLoading(
    title: string,
    mask?: boolean,
    options?: Omit<WechatMiniprogram.ShowLoadingOption, 'title' | 'mask'>
  ): void {
    wx.showLoading({
      title,
      mask,
      ...options
    })
  }

  // 隐藏 loading 提示框
  $hideLoading(): void {
    wx.hideLoading()
  }

  /**
   * 显示导航条加载动画
   *
   * - [vue.$showNavigationBarLoading(options?: Object)](https://developers.weixin.qq.com/miniprogram/dev/api/ui/navigation-bar/wx.showNavigationBarLoading.html)
   */
  $showNavigationBarLoading(options?: WechatMiniprogram.ShowNavigationBarLoadingOption): void {
    wx.showNavigationBarLoading(options)
  }

  /**
   * 隐藏导航条加载动画
   *
   * - [vue.$hideNavigationBarLoading(options?: Object)](https://developers.weixin.qq.com/miniprogram/dev/api/ui/navigation-bar/wx.hideNavigationBarLoading.html)
   */
  $hideNavigationBarLoading(options?: WechatMiniprogram.HideNavigationBarLoadingOption): void {
    wx.hideNavigationBarLoading(options)
  }

  /**
   * 动态设置当前页面的标题
   *
   * - [vue.$setNavigationBarTitle(title: string, options?: Object)](https://developers.weixin.qq.com/miniprogram/dev/api/ui/navigation-bar/wx.setNavigationBarTitle.html)
   */
  $setNavigationBarTitle(
    title: string,
    options?: Omit<WechatMiniprogram.SetNavigationBarTitleOption, 'title'>
  ): void {
    wx.setNavigationBarTitle({
      title,
      ...options
    })
  }

  /**
   * 设置页面导航条颜色
   *
   * - [vue.$setNavigationBarColor(options: Object)](https://developers.weixin.qq.com/miniprogram/dev/api/ui/navigation-bar/wx.setNavigationBarColor.html)
   */
  $setNavigationBarColor(options: WechatMiniprogram.SetNavigationBarColorOption): void {
    wx.setNavigationBarColor(options)
  }

  /**
   * 显示模态对话框
   *
   * - [vue.$showModal(title: string, content?: string, options?: Object)](https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.showModal.html)
   */
  $showModal(
    title: string,
    content?: string,
    options?: Omit<WechatMiniprogram.ShowModalOption, 'title' | 'content'>
  ): Promise<WechatMiniprogram.ShowModalSuccessCallbackResult> {
    return wx.showModal({
      title,
      content,
      ...options
    })
  }

  /**
   * 显示操作菜单
   *
   * - [vue.$showActionSheet(itemList: string[], options?: Object)](https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.showActionSheet.html)
   */
  $showActionSheet(
    itemList: string[],
    options?: Omit<WechatMiniprogram.ShowActionSheetOption, 'itemList'>
  ): Promise<WechatMiniprogram.ShowActionSheetSuccessCallbackResult> {
    return wx.showActionSheet({
      itemList,
      ...options
    })
  }

  // 开始下拉刷新。调用后触发下拉刷新动画，效果与用户手动下拉刷新一致
  $startPullDownRefresh(options: WechatMiniprogram.StartPullDownRefreshOption): void {
    wx.startPullDownRefresh(options)
  }

  // 停止当前页面下拉刷新
  $stopPullDownRefresh(): void {
    wx.stopPullDownRefresh()
  }
}
