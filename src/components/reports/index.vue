<script>
import { readMany } from 'restful-service'

const vue = {
  name: 'ReportsIndex',
  data () {
    return {
      collection: []
    }
  },
  route: {
    data () {
      return {
        collection: readMany('report')
      }
    }
  }
}

export default vue
</script>

<template lang="jade">
#reports-index
  .container-fluid
    .row
      .col-xs-12(v-if='!$loadingRouteData')
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
                a(v-link='{ name: "reports/view", params: { reportId: model.id } }', v-text='model.label')
</template>
