<script>
import { readMany } from 'restful-service'

const vue = {
  name: 'DeviceModelsIndex',
  data () {
    return {
      collection: []
    }
  },
  route: {
    data () {
      return {
        collection: readMany('device_models')
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
        h3
          a.btn.btn-primary.pull-right(v-link='{ name: "device-models/add" }') Add
          | Device Models
        table.table.table-bordered.table-striped
          thead
            tr
              th Device Model
          tbody
            tr(v-for='model in collection')
              td
                a(v-link='{ name: "device-models/view", params: { deviceModelId: model.id } }', v-text='model.label')
</template>
