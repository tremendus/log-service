<script>
var MenuMixin = require('../../mixins/menus')
var vue = {
  name: 'PageTitleInterface',
  mixins: [MenuMixin],
  methods: {
    logout: function () {
      this.$root.$broadcast('session:logout')
    }
  }
}
module.exports = vue
</script>

<template lang="jade">
#vue-page-title
  h3
    span.hidden-xs
      | {{section.label}} &nbsp;
      span.small {{screen.label}}

    span.hidden.visible-xs
      .btn-group
        button.btn.btn-default(type='button')
          b {{section.label}}
        button.btn.btn-default.dropdown-toggle(type='button', data-toggle='dropdown', aria-haspopup='true', aria-expanded='false')
          span.caret
          span.sr-only Toggle Dropdown
        ul.dropdown-menu
          li(v-for='item in menus')
            a(v-link='item.path', v-text='item.label')
          li
            a(href='javascript:;', v-on:click='logout') Logout
      .btn-group(v-if='hasOptions')
        button.btn.btn-default(type='button')
          b {{screen.label}}
        button.btn.btn-default.dropdown-toggle(type='button', data-toggle='dropdown', aria-haspopup='true', aria-expanded='false')
          span.caret
          span.sr-only Toggle Dropdown
        ul.dropdown-menu
          li(v-for='item in section.options')
            a(v-link='item.path', v-text='item.label')
</template>
