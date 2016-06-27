<script>
import uiHeader from '../interface/header.vue'
import uiNavigation from '../interface/navigation.vue'
import uiFooter from '../interface/footer.vue'

export default {
  name: 'DefaultLayout',
  components: {
    uiHeader,
    uiNavigation,
    uiFooter
  },
  computed: {
    uiHeader: function () {
      return 'uiHeader'
      // return 'uiHeader' + (this.uiClass ? this.uiClass : '')
    },
    uiNavigation: function () {
      return 'uiNavigation'
      // return 'uiNavigation' + (this.uiClass ? this.uiClass : '')
    },
    uiFooter: function () {
      return 'uiFooter'
      // return 'uiFooter' + (this.uiClass ? this.uiClass : '')
    }
  },
  created () {
    window.onresize = this.onResize.bind(this)
  },
  methods: {
    toggle (force) {
      let navClass = 'nav-visible'
      let method = null
      if (!force) {
        force = !this.$el.classList.contains(navClass)
      }
      !force ? method = 'remove' : method = 'add'
      console.log('toggle()', force, method)
      this.$el.classList[method](navClass)
    },
    onResize () {
      const isMobile = window.innerWidth < 768
      console.log('onResize():isMobile', isMobile)
      if (isMobile) {
        this.$el.classList.remove('nav-visible')
      }
    }
  },
  events: {
    'navigation:toggle' (force) {
      console.log('navigation:toggle')
      this.toggle(force)
    }
  }
}
</script>

<template lang="jade">
#defaut-layout.layout
  component(:is='uiNavigation')
  #content-wrapper
    component(:is='uiHeader')
    router-view
    //- component(:is='uiFooter')
</template>

<style lang="stylus">
#defaut-layout
  min-height 100%
  height 100%
  display flex
  flex-direction column
#content-wrapper
  transition left 0.35s
  /*flex 1 1 auto*/
  position fixed
  top 0
  right 0
  bottom 0
  left navWidth
  overflow auto


//- all media queries for layout in here for now
mobile = 768px
navWidth = 160px
transitionTime = 0.35s

@media screen and (max-width: mobile)
  .layout
    #content-wrapper
      left 0px
    #ui-navigation
      box-shadow 1px 1px 2px 0px rgba(0,0,0,0.15)
    &:not(.nav-visible)
      #ui-navigation
        left -1*navWidth
    &.nav-visible
      #ui-navigation
        left 0px

@media screen and (min-width: mobile)
  .layout
    #content-wrapper
      left navWidth
    #ui-navigation
      left 0px

#ui-navigation
  width navWidth

#ui-navigation,
#content-wrapper
  transition left transitionTime

</style>
