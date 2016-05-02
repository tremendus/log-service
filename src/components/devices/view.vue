<script>
import { readOne } from 'restful-service'

const vue = {
  name: 'DevicesView',
  data () {
    return {
      model: []
    }
  },
  route: {
    data () {
      return {
        model: readOne('device', this.$route.params.deviceId)
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
        h3 {{model.label}}
        debug(:debug='model')
</template>
