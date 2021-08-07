import { isValid } from '@nily/utils'
import { ClassComponent } from './Decorator'
import { List, Pagination } from './List'
import { RefreshControlOptions } from './RefreshControl'

@ClassComponent
export class RefreshList extends List {
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

  /**
   * 用户上拉触底后加载下一页数据
   *
   * - [onReachBottom](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html#onReachBottom)
   */
  onReachBottom(): any {
    if (!this.refreshing) {
      this.$request()
    }
  }

  override async $request(options?: RefreshControlOptions) {
    // 重置请求参数
    if (options?.pullDownRefresh) {
      this.pending = false
      this.isEndReached = false
      this.page = 1
    }

    if (this.pending || this.isEndReached || this.refreshing) {
      return
    }

    this.pending = true
    this.refreshing = !!options?.pullDownRefresh
    await this.$beforeRequest()

    try {
      const pagination = await this.$fetcher(options)

      if (isValid(pagination)) {
        // 所有数据加载完成
        if (pagination.page >= pagination.totalPages) {
          this.isEndReached = true
        }

        // 下一页页标自增 1
        this.page = pagination.page + 1
      }

      this.$afterRequest()
    } catch (err) {
      this.$afterRequest(err)
    }

    this.pending = false
    this.refreshing = false
  }

  // 请求函数
  // @ts-ignore
  override async $fetcher(options?: RefreshControlOptions): Promise<Pagination> {
    return {} as Pagination
  }
}
