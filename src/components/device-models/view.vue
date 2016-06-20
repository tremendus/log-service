<script>
import ModelMixin from '../../mixins/model'

const vue = {
  name: 'DeviceModelsView',
  resource: 'device_models',
  mixins: [ModelMixin],
  data () {
    return {
      query: {
        related: ['device_class', 'device_definition']
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
