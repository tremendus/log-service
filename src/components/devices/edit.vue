<script>
import { readOne, update } from 'restful-service'
import DevicesForm from './form'

const vue = {
  name: 'DevicesEdit',
  components: [DevicesForm],
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
      update('devices', this.device)
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
        devices-form(:device='device', @action='update')
</template>
