import { Component } from 'vue-property-decorator'
import { Vue } from './Vue'

@Component
export class Fetch extends Vue {
  pending = false

  mounted() {
    this.$request()
  }

  // 请求前拦截
  async $beforeRequest(): Promise<any> {
    // function here
  }

  // 页面加载之后立即执行此函数
  async $request(): Promise<any> {
    if (this.pending) {
      return
    }

    this.pending = true
    await this.$beforeRequest()

    try {
      await this.$fetcher()
      this.$afterRequest()
    } catch (err) {
      this.$afterRequest(err)
    }

    this.pending = false
  }

  // 请求函数
  async $fetcher(): Promise<any> {
    // function here
  }

  /**
   * 请求后拦截
   *
   * @param err - 请求错误
   */
  $afterRequest(err?: Error): any {
    if (err) {
      this.$toast(err!.message)
    }
  }
}
