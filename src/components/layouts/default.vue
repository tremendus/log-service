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
  }
}
</script>

<template lang="jade">
#defaut-layout
  component(:is='uiHeader')
  component(:is='uiNavigation')
  #content-wrapper
    router-view
  component(:is='uiFooter')
</template>

<style lang="stylus">
#defaut-layout
  min-height 100%
  height 100%
  display flex
  flex-direction column
  #content-wrapper
    flex 1 1 auto
</style>
