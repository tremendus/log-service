<script>
import theme from '../../configuration/theme'
import navigation from '../../configuration/navigation'

export default {
  name: 'UiHeader',
  computed: {
    navigation () {
      // todo: make navigation dynamic using shared theme config in session
      return navigation[theme.default.navigation]
    }
  },
  methods: {
    toggle (event) {
      this.$root.$broadcast('navigation:toggle')
    }
  }
}
</script>

<template lang="jade">
#ui-header
  nav.navbar.navbar-default(role='navigation')
    .container-fluid

      // brand
      .navbar-header
        button.navbar-toggle.pull-left(@click='toggle')
          span.icon-bar
          span.icon-bar
          span.icon-bar
        a.navbar-brand.pull-right(v-link='"/home/index"')
          // todo: make logo dynamic based on theme
          img(src='../../assets/images/logo-accuenergy.png', height='100%')


</template>

<style lang="stylus">
#ui-header
  .navbar
    margin-bottom 0
    border-radius 0
    background-color #fff
    .navbar-toggle
      margin-left 1em
    border-top transparent
    border-right transparent
    border-left transparent
</style>
