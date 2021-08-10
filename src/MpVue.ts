import { Vue } from 'vue-property-decorator'
import { ClassComponent } from './Decorator'
import { MpRouter } from './MpRouter'

@ClassComponent
export class MpVue extends Vue {
  // 路由控制
  $mpRouter!: typeof MpRouter

  /**
   * 显示消息提示
   *
   * - [vue.$showToast](https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.showToast.html) 应与 [vue.$hideToast](https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.hideToast.html) 配对使用
   */
  $showToast(title: string, options?: Omit<WechatMiniprogram.ShowToastOption, 'title'>): void {
    uni.showToast({
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
    uni.hideToast()
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
    uni.showLoading({
      title,
      mask,
      ...options
    })
  }

  // 隐藏 loading 提示框
  $hideLoading(): void {
    uni.hideLoading()
  }

  /**
   * 显示导航条加载动画
   *
   * - [vue.$showNavigationBarLoading(options?: Object)](https://developers.weixin.qq.com/miniprogram/dev/api/ui/navigation-bar/wx.showNavigationBarLoading.html)
   */
  $showNavigationBarLoading(options?: WechatMiniprogram.ShowNavigationBarLoadingOption): void {
    // @ts-ignore
    uni.showNavigationBarLoading(options)
  }

  /**
   * 隐藏导航条加载动画
   *
   * - [vue.$hideNavigationBarLoading(options?: Object)](https://developers.weixin.qq.com/miniprogram/dev/api/ui/navigation-bar/wx.hideNavigationBarLoading.html)
   */
  $hideNavigationBarLoading(options?: WechatMiniprogram.HideNavigationBarLoadingOption): void {
    // @ts-ignore
    uni.hideNavigationBarLoading(options)
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
    uni.setNavigationBarTitle({
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
    // @ts-ignore
    uni.setNavigationBarColor(options)
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
    // @ts-ignore
    return uni.showModal({
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
    // @ts-ignore
    return uni.showActionSheet({
      itemList,
      ...options
    })
  }

  // 开始下拉刷新。调用后触发下拉刷新动画，效果与用户手动下拉刷新一致
  $startPullDownRefresh(options: WechatMiniprogram.StartPullDownRefreshOption): void {
    uni.startPullDownRefresh(options)
  }

  // 停止当前页面下拉刷新
  $stopPullDownRefresh(): void {
    uni.stopPullDownRefresh()
  }
}

// 方法附加到实例
MpVue.prototype.$mpRouter = MpRouter
