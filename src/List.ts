import { isValid } from '@nily/utils'
import { ClassComponent } from './Decorator'
import { Fetch } from './Fetch'

export interface Pagination {
  page: number
  totalPages: number
  totalCount?: number
}

@ClassComponent
export class List extends Fetch {
  // 页数
  page = 1
  // 每一页数量
  limit = 10
  // 是否全部加载完成
  isEndReached = false

  /**
   * 用户上拉触底后加载下一页数据
   *
   * - [onReachBottom](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html#onReachBottom)
   */
  onReachBottom() {
    this.$request()
  }

  override async $request(): Promise<any> {
    if (this.pending || this.isEndReached) {
      return
    }

    this.pending = true
    await this.$beforeRequest()

    try {
      const pagination = await this.$fetcher()

      if (isValid(pagination)) {
        if (pagination.page >= pagination.totalPages) {
          this.isEndReached = true
        }

        this.page = pagination.page + 1
      }

      this.$afterRequest()
    } catch (err) {
      this.$afterRequest(err)
    }

    this.pending = false
  }

  // 请求函数
  override async $fetcher(): Promise<Pagination> {
    return {} as Pagination
  }
}
