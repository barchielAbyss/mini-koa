const context = {}

const defineGetter = (target: string, key: string) => {
  Object.defineProperty(context, key, {
    get() {
      return this[target][key]
    },
    set(value) {
      this[target][key] = value
    }
  })
}

defineGetter('request', 'url')
defineGetter('request', 'path')
defineGetter('request', 'query')
defineGetter('response', 'body')

export default context
