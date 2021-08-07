import { ClassComponent } from './Decorator'
import { Fetch } from './Fetch'

export interface RefreshControlOptions {
  pullDownRefresh: boolean
}

@ClassComponent
export class RefreshControl extends Fetch {
  refreshing = false

  /**
   * 监听用户下拉刷新事件
   *
   * - [onPullDownRefresh](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html#onPullDownRefresh)
   */
  onPullDownRefresh(): any {
    this.$request({
      pullDownRefresh: true
    })
  }

  override async $request(options?: RefreshControlOptions): Promise<any> {
    // 重置请求参数
    if (options?.pullDownRefresh) {
      this.pending = false
    }

    if (this.pending || this.refreshing) {
      return
    }

    this.pending = true
    this.refreshing = !!options?.pullDownRefresh
    await this.$beforeRequest()

    try {
      await this.$fetcher(options)
      this.$afterRequest()
    } catch (err) {
      this.$afterRequest(err)
    }

    this.pending = false
    this.refreshing = false
  }

  // 请求函数
  // @ts-ignore
  override async $fetcher(options?: RefreshControlOptions): Promise<any> {
    // function here
  }
}
