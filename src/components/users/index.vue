<script>
import * as store from '../../services/store'

const vue = {
  name: 'UsersIndex',
  data () {
    return {
      users: []
    }
  },
  route: {
    data () {
      return {
        users: store.readMany('users')
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
            tr(v-for='user in users')
              td
                a(v-link='{ name: "users/view", params: { userId: user.id } }', v-text='user.name')
              td {{ user.email }}
              td {{ user.isAdmin ? 'Admin' : 'User' }}
</template>
