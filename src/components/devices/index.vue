<script>
import CollectionMixin from '../../mixins/collection'

const vue = {
  name: 'DevicesIndex',
  resource: 'devices',
  mixins: [CollectionMixin],
  data () {
    return {
      query: {
        related: ['device_model']
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
          a.btn.btn-primary.pull-right(v-link='{ name: "devices/add" }') Add
          | Devices
        table.table.table-bordered.table-striped
          thead
            tr
              th Device Label
              th Device Model
          tbody
            tr(v-for='model in collection')
              td
                a(v-link='{ name: "devices/view", params: { id: model.id } }', v-text='model.label')
              td {{ model.device_model.label }}
</template>
