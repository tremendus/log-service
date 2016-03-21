<script>
import * as store from '../../services/store'

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
  .container-fluid
    .row
      .col-xs-12(v-if='!$loadingRouteData')
        h3 {{user[0].name}}
        debug(:debug='user[0]')
</template>
