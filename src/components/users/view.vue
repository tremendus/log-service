<script>
import * as store from 'restful-service'

const vue = {
  name: 'UsersView',
  data () {
    return {
      user: []
    }
  },
  route: {
    data () {
      return {
        user: store.readOne('users', this.$route.params.userId)
      }
    }
  }
}
export default vue
</script>

<template lang="jade">
#users-view
  .container-fluid(v-if='!$loadingRouteData')
    .row
      .col-xs-12
        h3 {{user[0].name}}
        debug(:debug='user[0]')
        a.btn.btn-warning(v-link='{ name: "users/edit", params: { userId: user[0].id } }') Edit
</template>
