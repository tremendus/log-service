<script>
/**
 * DefaultLayout
 * Default layout for secured pages
 * type   : layout
 */

//- todos
// empty
/////////////////////////////////////////////////

//- imports
var LogService = require('../../services/log')

var session = require('../../services/session')
/////////////////////////////////////////////////

//- define
var logger = new LogService({ silent: 1 })
/////////////////////////////////////////////////

//- instantiate
var layout = {
	name: "DefaultLayout",
	components: {},
	mixins: {},
	route: {},
	methods: {},
	events: {},
}
/////////////////////////////////////////////////

//- build
layout.computed = {
	uiClass: function () {
		return this.$parent.uiStyle
	},
	uiHeader: function () {
		return 'uiHeader' + (this.uiClass ? this.uiClass : '')
	},
	uiNavigation: function () {
		return 'uiNavigation' + (this.uiClass ? this.uiClass : '')
	},
	uiFooter: function () {
		return 'uiFooter' + (this.uiClass ? this.uiClass : '')
	}
}

layout.components = {
	// defaults
	uiHeader: require('../interface/header.vue'),
	uiNavigation: require('../interface/navigation.vue'),
	uiFooter: require('../interface/footer.vue'),
	// eaton
	uiHeaderEaton: require('../interface/header-eaton.vue'),
	uiNavigationEaton: require('../interface/navigation-eaton.vue'),
	uiFooterEaton: require('../interface/footer-eaton.vue'),
}
/////////////////////////////////////////////////

//- events
// empty
/////////////////////////////////////////////////

//- exports
module.exports = layout
/////////////////////////////////////////////////

//- debug
// empty
/////////////////////////////////////////////////
</script>

<template lang="jade">
#vue-default-layout
	//- div: code layout/default.vue ({{uiClass}} {{uiHeader}} {{uiNavigation}})
	component(:is='uiHeader')
	component(:is='uiNavigation')
	#wrapper
		router-view
	component(:is='uiFooter')
</template>

<style lang="stylus">
html, body, #app, #vue-app, #vue-wrapper
	min-height 100%
	height 100%
#vue-default-layout
	min-height 100%
	display flex
	flex-direction column
#wrapper
	flex 1 1 auto
</style>
