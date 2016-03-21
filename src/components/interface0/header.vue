<script>
/**
 * HeaderInterface
 * Header
 * type: interface
 */

//- todos
// empty
/////////////////////////////////////////////////

//- imports
var LogService = require('../../services/log')

var session = require('../../services/session')
var menus = require('../../fixtures/menus')
/////////////////////////////////////////////////

//- define
var logger = new LogService({ silent: 1 })
/////////////////////////////////////////////////

//- instantiate
var header = {
  name: "HeaderInterface",
  data: function () {
    return {
      menus: menus,
      sections: ['readings', 'status', 'settings']
    }
  },
  components: {
    uiMenu: require('./dropdown.vue')
  },
  mixins: {},
  route: {},
  methods: {}
}
/////////////////////////////////////////////////

//- build
header.methods.toggleNavigation = function () {
}

header.methods.logout = function (event) {
  this.$root.$broadcast('session:logout')
}
/////////////////////////////////////////////////

//- events
// empty
/////////////////////////////////////////////////

//- exports
module.exports = header
/////////////////////////////////////////////////

//- debug
// empty
/////////////////////////////////////////////////
</script>

<template lang="jade">
#vue-header-interface
  //- div: code interface/header.vue
  nav.navbar.navbar-default(role='navigation')
    .container-fluid

      // brand
      .navbar-header
        a.navbar-brand(v-link='"/home/index"')
          img(src='../../../assets/images/logo-accuenergy.png', height='100%')

      //- tablet and larger navigation
      .collapse.navbar-collapse
        ul.nav.navbar-nav.navbar-right.hidden-xs
          li
            a(v-link='"/home/index"') Dashboard
          li(v-for='sectionName in sections')
            a.dropdown-toggle(href='javascript:;', data-toggle='dropdown', aria-haspopup='true', aria-expanded='false')
              | {{menus[sectionName].label}}
              span.caret
            ul.dropdown-menu(role='menu')
              li(v-for='item in menus[sectionName].options')
                a(v-link='item.path', v-text='item.label')
          li
            a(href='javascript:;', v-on:click='logout') Logout
</template>

<style lang="stylus">
#vue-wrapper:not(.ui-eaton)
  #vue-header-interface .navbar
    margin-bottom 0
    border-radius 0
    background-color #fff
  #vue-header-interface .navbar-brand
    // padding-top 8px
    // padding-bottom 8px
    // img max-height 20px
</style>
