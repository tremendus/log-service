<script>
import LogService from 'log-service'
import session from '../../services/session'

const logger = new LogService({ label: 'login/index', silent: 0 })
logger.log('sesssion', session)

const vue = {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        email: 'andrea@tremendusapps.com',
        _password: 'function'
      },
      isLoggingIn: false
    }
  },
  computed: {
    auth () {
      return session.state
    }
  },
  methods: {
    login () {
      logger.log('login()', this.user)
      // this.isLoggingIn = true
      session.authenticate({ user: this.user })
    }
  }
}

module.exports = vue
</script>

<template lang="jade">
#login-index
  .container(v-cloak)
    .row
      .col-xs-8.col-xs-offset-2.col-sm-6.col-sm-offset-3.col-md-4.col-md-offset-3
        div
          .form-group.text-center(v-else)
            h5 Sign in to continue
          .form-group
            label Email
            input.form-control(type='text', v-model='user.email', placeholder='Email', required='', autofocus='', autocomplete='off')
          .form-group
            label Password
            input.form-control(type='password', v-model='user._password', v-on:keyup.enter='login', placeholder='Password', required='', autocomplete='off')
          .form-group(v-if='!isLoggingIn')
            a.btn.btn-lg.btn-primary.btn-block(v-on:click.stop.prevent='login') Sign in
          .form-group(v-else)
            spinner.spinner-tight
          debug(:debug='auth')
</template>

<style lang="stylus">
#login-index
  margin-top 20px
</style>
