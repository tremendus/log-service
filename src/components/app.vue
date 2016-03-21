<script>
// todo: support multiple uis
import uiNotification from './interface/notification'

export default {
  name: 'App',
  components: {
    uiNotification
  },
  data () {
    return {}
  },
  computed: {
    uiClass () {
      return 'ui-default'
    }
  }
}
</script>

<template lang="jade">
#app(v-cloak)
  #app-wrapper(:class='uiClass')
    ui-notification
    router-view
</template>

<style lang='stylus'>
html, body, #app, #app-wrapper
  min-height 100%
  height 100%
</style>
