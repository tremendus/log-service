<script>
import * as store from '../../services/store'

const vue = {
  name: 'DevicesIndex',
  data () {
    return {
      devices: []
    }
  },
  route: {
    data () {
      return {
        devices: store.readMany('meters')
      }
    }
  }
}

export default vue
</script>

<template lang="jade">
#devices-index
  .container-fluid
    .row
      .col-xs-12(v-if='!$loadingRouteData')
        h3 Devices
        table.table.table-bordered.table-striped
          thead
            tr
              th Device Label
          tbody
            tr(v-for='device in devices')
              td
                a(v-link='{ name: "devices/view", params: { deviceId: device.id } }', v-text='device.label')
</template>
