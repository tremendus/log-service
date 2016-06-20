<script>
import CollectionMixin from '../../mixins/collection'

const vue = {
  name: 'DevicesIndex',
  resource: 'device_models',
  mixins: [CollectionMixin]
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
                a(v-link='{ name: "device-models/edit", params: { id: model.id } }', v-text='model.label')
</template>
