import Vue from 'vue'

// double bounce
const template = '<div class="spinner"><div class="double-bounce1"></div><div class="double-bounce2"></div></div>'

const spinner = Vue.extend({
  template
})

module.exports = function (Vue, options) {
  Vue.component('spinner', spinner)
}
