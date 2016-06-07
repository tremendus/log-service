const template = `
<ul class='nav gateway-tabs' :class='{ "nav-pills" : tabType === "pills", "nav-tabs" : tabType === "tabs" }'>
  <li v-for='tab in tabs' :class='{ "active" : isTab(tab.code) }'>
    <a href='javascript:;', @click.stop.prevent='selectTab(tab.code)'>{{ tab.label }}</a>
  </li>
</ul>
`

// props: pass tabs = [{ code, label }, ...]
export const component = {
  props: ['classes', 'tabs', 'selectedTab', 'tabType'],
  template: template,
  methods: {
    isTab (code) {
      return code === this.selectedTab
    },
    selectTab (code) {
      this.selectedTab = code
    }
  }
}

export const mixin = {
  // data () {
  //   return {
  //     tabs: [],
  //     selectedTab: null
  //   }
  // },
  methods: {
    isTab (code) {
      return code === this.selectedTab
    }
  }
}

// to use as a global plugin, Vue.use() this plugin w/ default export
export default function (Vue, options) {
  Vue.component('TabComponent', component)
  Vue.component('TabMixin', mixin)
}
