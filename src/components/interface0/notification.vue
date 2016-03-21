<script>
/**
 * NotificationInterface
 * Notification
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
var notification = {
	name: "NotificationInterface",
	components: {},
	mixins: {},
	route: {},
	methods: {},
	computed: {},
	events: {},
	notifyInterval: {}
}
/////////////////////////////////////////////////

//- build
notification.data = function () {
	return {
		message: '',
		level: 'default',
		isNotifying: false
	}
}

notification.computed.alertLevel = function () {
	return 'alert-' + this.level
}

notification.methods.notify = function (options) {
	if(this.isNotifying && options.sticky !== true) {
		return false
	}
	this.isNotifying = true
	this.message = options.message
	this.level = options.level
	$(this.$el).animate({'top':'0px'})
	if(options.sticky !== true) {
		this.$options.notifyInterval = setTimeout(this.clear, 3000)
	}
	else {
		clearInterval(this.$options.notifyInterval)
	}
}

notification.methods.clear = function (options) {
	$(this.$el).animate({'top':'-60px'})
	clearInterval(this.$options.notifyInterval)
	this.isNotifying = false
	this.message = ''
}

notification.events['notification:show'] = function (options) {
	logger.event('notification', options)
	this.notify(options)
}

notification.events['notification:clear'] = function (options) {
	this.clear(options)
}

notification.events['connection:up'] = function () {
	logger.event('connection:up')
	this.clear()
}

notification.events['connection:down'] = function (options) {
	var options = {
		level: 'danger',
		message: 'Cannot connect to the Ethernet module.',
		sticky: true
	}
	logger.event('connection:down', options)
	this.notify(options)
}

/////////////////////////////////////////////////

//- events
// empty
/////////////////////////////////////////////////

//- exports
module.exports = notification
/////////////////////////////////////////////////

//- debug
// empty
/////////////////////////////////////////////////
</script>

<template lang="jade">
#vue-interface-notice
	div.alert.inverse(v-bind:class='alertLevel')
		b {{message}}
	//- div: code interface/footer.vue
</template>

<style lang="stylus">
#vue-interface-notice
	position fixed
	z-index 100
	left 0
	right 0
	top -60px
	height 60px
	&.shown
		top 0px
	& .notification
		min-height 60px
</style>
