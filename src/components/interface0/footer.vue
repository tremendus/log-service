<script>
/**
 * FooterInterface
 * Footer
 * type: interface
 */

//- todos
// empty
/////////////////////////////////////////////////

//- imports
var LogService = require('../../services/log')

/////////////////////////////////////////////////

//- define
var logger = new LogService({ silent: 1 })
/////////////////////////////////////////////////

//- instantiate
var footer = {
	name: "FooterInterface",
	components: {},
	mixins: {},
	route: {},
	methods: {}
}
/////////////////////////////////////////////////

//- build
// empty
/////////////////////////////////////////////////

//- events
// empty
/////////////////////////////////////////////////

//- exports
module.exports = footer
/////////////////////////////////////////////////

//- debug
// empty
/////////////////////////////////////////////////
</script>

<template lang="jade">
#vue-interface-footer
	//- div: code interface/footer.vue
	.container-fluid
		.row
			.col-sm-4
				h5 AXM-WEB
				p.small.muted Web-based metering app for Acuvim II Series Power Meters from Accuenergy
				p
					a(href='https://www.accuenergy.com/product/acuvim-ii-power-energy-submeter') Learn more online
			.col-sm-4
				h5 Support
				p.small.muted Call or email for engineering support
				p
					| Phone: +1.416.497.4100
					<br />
					| Email: &nbsp;
					a(href='mailto:support@accuenergy.com') support@accuenergy.com
			.col-sm-4
				h5 Resources
				p.small.muted Online guides, manuals, videos and diagrams available online
				p
					a(href='https://www.accuenergy.com/page/support/accuenergy-u-acuvim-ii-resources') www.accuenergy.com


</template>

<style lang="stylus">
#vue-interface-footer
	background-color #333
	color #eee
	padding 20px
	a
		opacity 1
		// color #F78F1E
</style>
