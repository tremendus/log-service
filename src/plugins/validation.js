const regIp = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]?|[0-9])$/

export function initialize (Vue) {
  Vue.validator('ip', (val) => {
    console.log('ip()', val)
    return regIp.test(val)
  })
}
