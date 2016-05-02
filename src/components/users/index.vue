<script>
import { readMany } from 'restful-service'

const vue = {
  name: 'UsersIndex',
  data () {
    return {
      collection: []
    }
  },
  route: {
    data () {
      return {
        collection: readMany('user')
      }
    }
  }
}
export default vue
</script>

<template lang="jade">
#users-index
  .container-fluid
    .row
      .col-xs-12(v-if='!$loadingRouteData')
        h3 Users
        table.table.table-bordered.table-striped
          thead
            tr
              th Name
              th Email
              th Level
          tbody
            tr(v-for='model in collection')
              td
                a(v-link='{ name: "users/view", params: { userId: model.id } }', v-text='model.name')
              td {{ model.email }}
              td {{ model.is_admin ? 'Admin' : 'User' }}
        a.btn.btn-primary(v-link='{ name: "users/add" }') Add User
</template>
