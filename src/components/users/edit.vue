<script>
import * as store from 'restful-service'
import userForm from './form'

const vue = {
  name: 'UsersView',
  components: { userForm },
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
  },
  methods: {
    update () {
      store.update('users', this.user[0])
    }
  }
}
export default vue
</script>

<template lang="jade">
#users-edit
  .container-fluid(v-if='!$loadingRouteData')
    .row
      .col-xs-12
        h3 Edit User : {{ user[0].name }}
        .panel.panel-default
          .panel-body
            user-form(:user.sync='user[0]')
          .panel-footer
            button.btn.btn-primary(@click.stop.prevent='update') Save
</template>
