<script>
import { readMany } from 'restful-service'

const vue = {
  name: 'DevicesIndex',
  data () {
    return {
      collection: []
    }
  },
  route: {
    data () {
      return {
        collection: readMany('device')
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
            tr(v-for='model in collection')
              td
                a(v-link='{ name: "devices/view", params: { deviceId: model.id } }', v-text='model.label')
</template>
