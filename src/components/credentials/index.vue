<script>
import CollectionMixin from '../../mixins/collection'

const vue = {
  name: 'CredentialsIndex',
  resource: 'credentials',
  mixins: [CollectionMixin]
}

export default vue
</script>

<template lang="jade">
#credentials-index
  .container-fluid
    .row
      .col-xs-12(v-if='!$loadingRouteData')
        h3
          a.btn.btn-primary.pull-right(v-link='{ name: "credentials/add" }') Add
          | Export Profiles
        table.table.table-bordered.table-striped
          thead
            tr
              th Label
          tbody
            tr(v-for='model in collection')
              td
                a(v-link='{ name: "credentials/view", params: { id: model.id } }', v-text='model.label')
</template>
