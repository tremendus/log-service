<script>
import session from '../../services/session'

const vue = {
  name: 'LoginIndex',
  data () {
    return {
      auth: {
        email: 'darren@tremendusapps.com',
        password: 'password'
      },
      isLoggingIn: false
    }
  },
  computed: {
    state () {
      return session.state
    }
  },
  methods: {
    login () {
      this.isLoggingIn = true
      console.log('login()', this.auth)
      session.authenticate(this.auth)
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
          .form-group.text-center
            h5 Sign in to continue
          .form-group
            label.control-label Email
            input.form-control(type='text', v-model='auth.email', placeholder='Email', required='', autofocus='', autocomplete='off')
          .form-group
            label.control-label Password
            input.form-control(type='password', v-model='auth.password', v-on:keyup.enter='login', placeholder='Password', required='', autocomplete='off')
          .form-group(v-if='!isLoggingIn')
            a.btn.btn-lg.btn-primary.btn-block(v-on:click.stop.prevent='login') Sign in
          //- .form-group
          //-   spinner.spinner-tight
          //- debug(:debug='auth')
</template>

<style lang="stylus">
#login-index
  margin-top 20px
</style>
