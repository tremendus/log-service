<script>
import theme from '../../configuration/theme'
import navigation from '../../configuration/navigation'

const vue = {
  name: 'UiNavigation',
  computed: {
    navigation () {
      return navigation[theme.default.navigation]
    }
  },
  methods: {
    logout (event) {
      this.$root.$broadcast('session:logout')
    }
  }
}

export default vue
</script>

<template lang="jade">
#ui-navigation
  .sidebar
    ul.menu-root
      li(v-for='nav in navigation')
        a(v-if='nav.route', v-link='nav.route') {{ nav.label }}
        span(v-else) {{ nav.label }}
        ul.menu-sub(v-if='nav.links')
          li(v-for='link in nav.links')
            a(v-link='link.route') {{ link.label }}
      //- todo: this might be top horizontal nav
      li.divider
      li
        a(href='javascript:;', @click='logout') Logout
</template>

<style lang="stylus">
#ui-navigation
  position fixed
  top 0
  bottom 0
  left 0
  width 200px
  padding 1rem
  overflow-x none
  overflow-y auto
.sidebar
  padding: 1rem
  .menu-root
    padding-left 0
  ul
    list-style-type none
    margin 0
    line-height 1.8em
    padding-left 1em
    .menu-sub
      font-size 0.9em
  .divider
    margin-top 0.35rem
    margin-bottom 0.35rem
    border-bottom 1px solid rgba(0, 0, 0, 0.15)
</style>
