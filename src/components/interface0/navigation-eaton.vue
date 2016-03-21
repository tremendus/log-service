<script>
/**
 * NavigationInterface
 * Navigation
 * type: interface
 */

//- todos
// empty
/////////////////////////////////////////////////

//- imports
var LogService = require('../../services/log')

var MenuMixin = require('../../mixins/menus')
/////////////////////////////////////////////////

//- define
var logger = new LogService({ silent: 1 })
/////////////////////////////////////////////////

//- instantiate
var header = {
  name: "NavigationInterface",
  components: {
    eatonIcon: require('./eaton/icons.vue'),
    eatonIconStatus: require('./eaton/icon-status.vue')
  },
  methods: {
    logout: function (event) {
      this.$root.$dispatch('session:logout')
    }
  },
  mixins: [MenuMixin]
}
/////////////////////////////////////////////////

//- build
//
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
#vue-navigation-interface
  //- div: code interface/navigation-eaton.vue
  nav.navbar.navbar-inverse.collapse.navbar-collapse(role='navigation')
    ul.nav.navbar-nav(v-if='section.label !== "Settings"')
      //- ul.nav.navbar-nav
      li(:class='{ "active" : section.label === "Dashboard" }')
        a(v-link='menus.home.path')
          | {{menus.home.label}}

      li.dropdown(:class='{ "active" : section.label === "Metering" }')
        a.dropdown-toggle(href='javascript:;', data-toggle='dropdown', aria-haspopup='true', aria-expanded='false')
          eaton-icon(:icon='"data"')
          | Data &nbsp;
          span.caret
        ul.dropdown-menu(role='menu')
          li(v-for='item in menus.readings.options')
            a(v-link='item.path', v-text='item.label')

      li.dropdown(:class='{ "active" : section.label === "Status" }')
        a.dropdown-toggle(href='javascript:;', data-toggle='dropdown', aria-haspopup='true', aria-expanded='false')
          eaton-icon-status
          span.caret
        ul.dropdown-menu(role='menu')
          li(v-for='item in menus.status.options')
            a(v-link='item.path', v-text='item.label')

    ul.nav.navbar-nav(v-else)
      li(v-for='(index, item) in menus.settings.options', :class='{ "active" : screen.label === item.label }')
        a(v-link='item.path')
          | {{item.label}}
</template>

<style lang="stylus">
.tab-icon
  height 20px !important
  width 20px !important
  display inline-block !important
  margin 0 .3em -.3em 0 !important
div.ui-eaton #vue-navigation-interface .navbar
  // height 70px
  border none
  border-radius 0
  background #187bc6
  background-image linear-gradient(to bottom, #187bc6, #0561a8)
  box-shadow none
  margin-bottom 0

div.ui-eaton #vue-navigation-interface .navbar .navbar-nav>li
  /* todo responsive heights/widths */
  // height 70px
  vertical-align middle
  text-align center
  min-width 10em

  &.active svg path
    color #187bc6
    fill #187bc6

div.ui-eaton #vue-navigation-interface .navbar .navbar-nav>li>a
  height 100%
  line-height 40px
  font-size 14px
  color #fff

div.ui-eaton #vue-navigation-interface .navbar .navbar-nav>li.active>a
div.ui-eaton #vue-navigation-interface .navbar .navbar-nav>li.active.open>a
  background-color #fff
  color rgb(24, 123, 198)

// div.ui-eaton #vue-navigation-interface
//   .navbar-inverse .navbar-nav>.open>a,
//   .navbar-inverse .navbar-nav>.open>a:focus,
//   .navbar-inverse .navbar-nav>.open>a:hover

div.ui-eaton #vue-navigation-interface .navbar .navbar-nav>li>a hover
  border-bottom none

div.ui-eaton #vue-navigation-interface .navbar .navbar-nav>li:not(.active).dropdown.open>a
  background-color inherit

@media (max-width: 767px)
  div.ui-eaton #vue-navigation-interface .navbar-inverse .navbar-nav .open .dropdown-menu>li>a
    color rgba(255,255,255,0.8)
    @:hover
      opacity 0.9

// not relating to this page, but placed here
// to keep locations of eaton styles to min

// @media (min-width: 768px)
//   div.ui-eaton
//     #vue-navigation-interface
//       margin-bottom 1.5em
//     #vue-page-title
//       display none
</style>
