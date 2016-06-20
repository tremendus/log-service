<script>
import CollectionMixin from '../../mixins/collection'

const vue = {
  name: 'ReportsIndex',
  resource: 'reports',
  mixins: [CollectionMixin]
}

export default vue
</script>

<template lang="jade">
#reports-index
  .container-fluid
    .row
      .col-xs-12(v-if='!isRequesting')
        h3
          a.btn.btn-primary.pull-right(v-link='{ name: "reports/add" }') Add
          | Reports
        table.table.table-bordered.table-striped
          thead
            tr
              th Report Name
          tbody
            tr(v-for='model in collection')
              td
                a(v-link='{ name: "reports/view", params: { id: model.id } }', v-text='model.label')
</template>
