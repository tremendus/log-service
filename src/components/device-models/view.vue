<script>
import { readOne } from 'restful-service'

const vue = {
  name: 'DeviceModelsView',
  data () {
    return {
      query: {
        related: ['device_class', 'device_definition']
      },
      model: []
    }
  },
  route: {
    data () {
      return {
        model: readOne('device_models', this.$route.params.deviceModelId, this.query)
      }
    }
  }
}
export default vue
</script>

<template lang="jade">
#device-models-view
  .container-fluid
    .row
      .col-xs-12(v-if='!$loadingRouteData')
        h3 {{model.label}}
        debug(:debug='model')
</template>
