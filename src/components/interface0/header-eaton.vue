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
var MenusMixin = require('../../mixins/menus')
/////////////////////////////////////////////////

//- define
var logger = new LogService({ silent: 1 })
/////////////////////////////////////////////////

//- instantiate
var header = {
	name: "HeaderInterface",
	components: {
    eatonIconSettings: require('./eaton/icon-settings.vue')
  },
	mixins: [MenusMixin],
	route: {},
	methods: {}
}
/////////////////////////////////////////////////

//- build
header.methods.logout = function (event) {
	logger.log('#logout', session.user, event)
	session.deauthorize()
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
	//- div: code interface/header-eaton.vue
	nav.navbar.navbar-inverse(role='navigation')
		.container-fluid
			ul.nav.navbar-nav.navbar-right
				li.hidden-xs
						a(href='javascript:;', v-on:click='logout') Logout
				li.hidden-xs
					a(v-link='"/status/system"') About
				li.hidden-xs(:class='{ "active" : section.label === "Settings" }')
					a(v-link='"/settings/meter"')
						eaton-icon-settings
						| Settings
				li.hidden-xs(:class='{ "active" : section.label !== "Settings" }')
					a(v-link='"/home/index"') PXM-1000
				.navbar-header
					button.hidden-xs.navbar-toggle.collapsed(type='button', data-toggle='collapse', data-target='.navbar-collapse')
						span.sr-only Toggle navigation
						span.icon-bar
						span.icon-bar
						span.icon-bar
					a.navbar-brand
						img(src='../../../assets/images/logo-eaton.png')
</template>

<style lang="stylus">
#vue-header-interface .navbar
	margin-bottom 0
	border-radius 0
	border 0

#vue-header-interface .navbar-right > .navbar-header
	margin-left 1em

div.ui-eaton #vue-header-interface
	background-color #2f2f2f
	/*height: 56px;*/
	border-bottom none
	border-top none

div.ui-eaton #vue-header-interface .navbar-nav > li:not(:hover):not(.active) > a path
	fill #9d9d9d

div.ui-eaton #vue-header-interface .navbar-nav li a,
div.ui-eaton #vue-header-interface .navbar-nav li a:hover,
	color white

div.ui-eaton #vue-header-interface .navbar-nav > li > a:hover,
div.ui-eaton #vue-header-interface .navbar-nav .open > a:hover
	border-bottom none
	background-color inherit

div.ui-eaton #vue-header-interface .navbar-nav li.active
	background: #187bc6 !important;
	background: linear-gradient(to bottom, #1c8be2, #187bc6);
</style>
