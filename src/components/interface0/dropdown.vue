<script>
var MenuMixin = require('../../mixins/menus')
var menus = {}
var vue = {
  name: "DropdownInterface",
  props: ['section'],
  mixins: [MenuMixin]
}
module.exports = vue
</script>

<template lang="jade">
ul.dropdown-menu(role='menu')
  li(v-for='item in section.options')
    a(v-link='item.path', v-text='item.label')
</template>
