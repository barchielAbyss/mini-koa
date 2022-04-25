import {parse} from 'url';

export default {
  get url() {
    const { url } = this.req || {}
    return url
  },
  get path() {
    const { url = '' } = this.req || {}
    return parse(url, false)?.pathname || ''
  },
  get query() {
    const { url = '' } = this.req || {}
    return parse(url, true)?.query || ''
  },
}
