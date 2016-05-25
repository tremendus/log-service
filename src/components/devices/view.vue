<script>
import { readOne } from 'restful-service'

const vue = {
  name: 'DevicesView',
  data () {
    return {
      query: {
        related: ['device_model.device_definition']
      },
      model: []
    }
  },
  computed: {
    params () {
      return this.model.device_model.device_definition.meta.params || []
    },
    sortedParams () {
      const params = this.params
      const sorted = params.sort((a, b) => {
        if (a.label < b.label) return -1
        if (a.label > b.label) return 1
        return 0
      })
      return sorted
    }
  },
  route: {
    data () {
      return {
        model: readOne('devices', this.$route.params.deviceId, this.query)
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
        .panel.panel-default
          .panel-heading
            h4.panel-title Device Readings
          table.table.table-striped
            thead
              tr
                th Parameter
                th.text-center Status
                th Reading
            tbody
              tr(v-for='param in params')
                td {{ param.label }}
                td.text-center Ok
                td {{ param.value }}{{ param.units }}


</template>
