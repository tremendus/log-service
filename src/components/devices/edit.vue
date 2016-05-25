<script>
import { readOne, update } from 'restful-service'
import FormComponent from './form'

const vue = {
  name: 'DevicesEdit',
  components: { FormComponent },
  data () {
    return {
      model: {}
    }
  },
  route: {
    data () {
      return {
        model: readOne('devices', this.$route.params.deviceId)
      }
    }
  },
  methods: {
    update () {
      update('devices', this.model)
        .then(() => {
          console.warn('No event handler on update')
          // this.reset('devices', 'devices')
          // this.device.label = ''
        })
    }
  }
}

export default vue
</script>

<template lang="jade">
#devices-add
  .container-fluid
    .row
      .col-xs-12(v-if='!$loadingRouteData')
        h3 Edit Device
        form-component(:model.sync='model', @action='update')
</template>
