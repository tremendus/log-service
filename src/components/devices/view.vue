<script>
import * as store from '../../services/store'

const vue = {
  name: 'DevicesView',
  data () {
    return {
      device: []
    }
  },
  route: {
    data () {
      return {
        device: store.readOne('meters', this.$route.params.deviceId)
      }
    }
  }
}
export default vue
</script>

<template lang="jade">
#devices-view
  .container-fluid
    .row
      .col-xs-12(v-if='!$loadingRouteData')
        h3 {{device[0].label}}
        debug(:debug='device[0]')
</template>
