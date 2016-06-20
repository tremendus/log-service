<script>
import events from '../../services/events'
import { update } from '../../services/store'

const vue = {
  name: 'SettingsPasswords',
  data () {
    return {
      users: [{
        id: 1,
        name: 'Admin',
        password: null,
        _password: null
      }, {
        id: 2,
        name: 'User',
        password: null,
        _password: null
      }],
      selected: 0,
      input: 'text'
    }
  },
  computed: {
    user () {
      return this.users[this.selected]
    }
  },
  methods: {
    toggle () {
      let input = this.input
      this.input = input === 'text' ? 'password' : 'text'
    },
    validates () {
      const user = this.user
      if (!user.password || !user._password || user.password !== user._password) {
        events('notification:error').broadcast('You must enter a new password and your confirmation must match')
        return false
      }
      return true
    },
    save () {
      if (!this.validates()) {
        return
      }

      const model = Object.assign({}, this.user)
      delete model._password

      update('users', model)
        .then(() => {
          events('notification:success').broadcast('Password updated')
        })
    }
  },
  watch: {
    selected () {
      const user = this.user
      user.password = user._password = null
    }
  }
}

export default vue
</script>

<template lang="jade">
#settings-passwords
  .container-fluid
    .row
      .col-xs-12
        h3 Passwords
        .alert.alert-warning
          p Note changing the password you are logged into require you to re-login
          p If you forget your new password, you will need to do a full system reset
        ul.nav.nav-pills
          li(v-for='(i, user) in users', :class='{ "active" : selected === i }', @click='selected = i')
            a(href='javascript:;') {{ user.name }}
        form.form
          h4 Changing password for {{ users[selected].name }} level account
          p
            a(href='javascript:;', @click.stop.prevent='toggle')
              span(v-if='input === "password"')
                i.glyphicon.glyphicon-eye-open
                | Show passwords
              span(v-if='input === "text"')
                i.glyphicon.glyphicon-eye-close
                | Hide passwords
          .form-group
            label.control-label
              | Password
            input.form-control(:type='input', v-model='user.password')
          .form-group
            label.control-label Confirm Password
            input.form-control(:type='input', v-model='user._password')
          .form-group
            button.btn.btn-primary(@click.stop.prevent='save') Save
</template>

<style lang="stylus">
#settings-passwords
  .glyphicon-eye-open,
  .glyphicon-eye-close
    margin-right 0.5em
</style>
