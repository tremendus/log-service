<script>
import uiNotification from '../interface/notification.vue'
// import navLeft from '../interface/nav-left.vue'
// import navMain from '../interface/nav-main.vue'

export default {
  name: 'DefaultLayout',
  components: {
    uiNotification
    // searchIndex,
    // navLeft,
    // navMain
  },
  methods: {
    toggleNav: function () {
      this.$el.classList.toggle('hidden-menu')
    }
  },
  events: {
    'ui:nav:toggle': function () {
      this.toggleNav()
    }
  }
}
</script>

<template lang="jade">
#default-layout.user-interface
  ui-notification
  //- nav-left
  //- nav-main
  router-view
</template>
