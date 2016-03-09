<script>
/* eslint-disable */
import LogService from '../../services/log'

const logger = new LogService({ label: 'notification', silent: 0 })

const vue = {
	name: 'UiNotification',
	props: [],
	mixins: [],
	components: {},
	computed: {},
	route: {},
	methods: {},
	events: {},
	watch: {}
}

vue.data = function () {
	return {
		message: '',
		level: 'default',
		sticky: false,
		isNotifying: false
	}
}

vue.methods.notify = function (options) {
	if (this.isNotifying && options.sticky !== true) {
		return false
	}
	this.isNotifying = true
	this.message = options.message
	this.level = options.level
	this.sticky = options.sticky
	$(this.$el).animate({'top':'0px'})
	if (options.sticky !== true) {
		this.$options.notifyInterval = setTimeout(this.clear, 3000)
	}
	else {
		clearInterval(this.$options.notifyInterval)
	}
}

vue.methods.clear = function () {
	$(this.$el).animate({'top':'-60px'})
	clearInterval(this.$options.notifyInterval)
	this.isNotifying = false
	// this.message = ''
}

vue.events['notification:show'] = function (options) {
	logger.log('notification:show', options)
	this.notify(options)
}

vue.events['notification:clear'] = function () {
	logger.log('notification:clear')
	this.clear()
}

vue.events['connection:up'] = function () {
	logger.event('connection:up')
	this.clear()
}

vue.events['connection:down'] = function (options) {
	var options = {
		level: 'danger',
		message: 'Cannot connect to the Ethernet module.',
		sticky: true
	}
	logger.event('connection:down', options)
	this.notify(options)
}

export default vue
</script>

<template lang="jade">
#ui-notification
	.ui.visible.message(v-bind:class='level')
		i.close.icon(v-if='sticky', @click='clear')
		.header {{message}}
</template>

<style lang="stylus">
#ui-notification
	position fixed
	z-index 10000
	left 0
	right 0
	top -60px
	/*height 60px*/
	&.shown
		top 0px
	& .message
		/*min-height 60px*/
</style>
