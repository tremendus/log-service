import Vue from 'vue'

const template = `
<div class='vue-debug'>
  <div class='ui raised secondary {{classes}} segment'>
    <span class='ui large teal ribbon label' v-if='label'>debug: {{label}}</span>
    <pre><code class='code javascript js' v-text='debug | json'></code></pre>
  </div>
</div>
`

const debug = Vue.extend({
  props: ['debug', 'title', 'label'],
  // session: {
  session () {
    return {
      title: 'debug',
      label: false,
      debug: ''
    }
  },
  template: template
})

export default {
  install (Vue, options) {
    Vue.component('debug', debug)
  }
}
