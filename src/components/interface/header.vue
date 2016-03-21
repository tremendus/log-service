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
    logout (event) {
      this.$root.$broadcast('session:logout')
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
        a.navbar-brand(v-link='"/home/index"')
          // todo: make logo dynamic based on theme
          img(src='../../assets/images/logo-accuenergy.png', height='100%')

      //- tablet and larger navigation
      .collapse.navbar-collapse
        ul.nav.navbar-nav.navbar-right.hidden-xs
          li(v-for='nav in navigation')
            a(v-link='nav.route') {{nav.label}}
          //- li
            //- a(v-link='"/home/index"') Dashboard
          //- li(v-for='sectionName in sections')
          //-   a.dropdown-toggle(href='javascript:;', data-toggle='dropdown', aria-haspopup='true', aria-expanded='false')
          //-     | {{menus[sectionName].label}}
          //-     span.caret
          //-   ul.dropdown-menu(role='menu')
          //-     li(v-for='item in menus[sectionName].options')
          //-       a(v-link='item.path', v-text='item.label')
          li
            a(href='javascript:;', @click='logout') Logout
</template>

<style lang="stylus">
#ui-header .navbar
  margin-bottom 0
  border-radius 0
  background-color #fff
</style>
