<script>
/**
 * LoginAdmin
 * VueDescription
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
var vue = {
	name: "LoginAdmin",
	props: [],
	computed: {},
	components: {},
	events: {},
	methods: {},
	mixins: [],
	route: {},
	watch: {}
}
/////////////////////////////////////////////////

//- build

// data
vue.data = function () {
	return {
		user: {
			username: 'view',
			password: ''
		},
		isLoggingIn: false
	}
}

// computed
// empty

// components
// empty

// callbacks
vue.created = function () {
	session.on('deauthorized', function () {
		logger.log('session:deauthorized')
		this.isLoggingIn = false
		var options = {
			level: 'warning',
			message: 'Incorrect password for the selected access level, please try again'
		}
		if(this.$root) {
			this.$root.$broadcast('notification:show', options)
		}
	}.bind(this))
}

// route
// empty

// methods
vue.methods.login = function (event) {
	logger.log('#login', this.user, event)
	this.isLoggingIn = true
	event.preventDefault()
	event.stopPropagation()
	session.authenticate(this.user)
}

// events
// empty

// watch
// empty
/////////////////////////////////////////////////

//- exports
module.exports = vue
/////////////////////////////////////////////////
</script>

<template lang="jade">
#vue-login-admin
	//- div: code login/admin.vue
	.container(v-cloak)
		.row
			.col-xs-8.col-xs-offset-2.col-sm-6.col-sm-offset-3.col-md-4.col-md-offset-3
				//- form(method='post', action='#')
				//- div(v-if='$parent.$parent.uiClass')
				div
					//- h2 Sign In to Use AXM-WEB
					.form-group.text-center(v-if='$parent.$parent.uiClass === "ui-eaton"')
						img(src='../../../assets/images/logo-eaton.gif')
					.form-group.text-center(v-else)
						img(src='../../../assets/images/logo-accuenergy.png')
						h5 Sign in to use AXM-WEB

					.form-group
						//- div: code form/checkbox.vue
						label Access Level
							span.label.label-danger
						.radio
							label
								input(type='radio', v-model='user.username', value='view', checked)
								| User &nbsp;
								span.small.muted View reports and settings
						.radio
							label
								input(type='radio', v-model='user.username', value='admin')
								| Admin &nbsp;
								span.small.muted Edit settings, control meter
					//- .form-group
					//- 	label User
					//- 	input.form-control(type='text', v-model='user.username', placeholder='User', required='', autofocus='', autocomplete='off')
					.form-group
						label Password
						input.form-control(type='password', v-model='user.password', v-on:keyup.enter='login', placeholder='Password', required='', autocomplete='off')
					.form-group(v-if='!isLoggingIn')
						a.btn.btn-lg.btn-primary.btn-block(v-on:click='login') Sign in
					.form-group(v-else)
						spinner.spinner-tight
	//- debug(:debug='user')
</template>

<style lang="stylus">
#vue-login-admin
	margin-top 20px
	& img
		height 25px
</style>
