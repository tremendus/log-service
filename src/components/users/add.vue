<script>
import { create } from 'restful-service'
import userForm from './form'

const vue = {
  name: 'UsersAdd',
  components: { userForm },
  data () {
    return {
      user: {}
    }
  },
  methods: {
    create () {
      create('user', this.user)
        .then(() => {
          this.$set('user', {})
        })
    }
  }
}

export default vue
</script>

<template lang="jade">
#users-add
  .container-fluid
    .row
      .col-xs-12
        h3 Add User
        .panel.panel-default
          .panel-body
            user-form(:user.sync='user')
          .panel-footer
            button.btn.btn-primary(@click.stop.prevent='create') Save
</template>
