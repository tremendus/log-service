<script>
import events from '../../services/events'

/* global $ */
const vue = {
  name: 'UiNotification',
  data () {
    return {
      message: '',
      sticky: false,
      isNotifying: false,
      level: 'default',
      levels: {
        default: 'default',
        info: 'info',
        success: 'success',
        warning: 'warning',
        error: 'danger'
      }
    }
  },
  computed: {
    alertLevel () {
      return 'alert-' + this.levels[this.level]
    }
  },
  created () {
    this.events()
  },
  methods: {
    events () {
      Object.keys(this.levels).map((l) => {
        events(`notification:${l}`).subscribe((message) => {
          this.notify(message, l)
        })
      })
    },
    notify (message, level = 'success', sticky = false) {
      if (this.isNotifying && sticky !== true) {
        return false
      }
      this.isNotifying = true
      this.message = message
      this.level = level
      this.sticky = sticky
      $(this.$el).animate({ top: '0px' })
      if (sticky !== true) {
        this.$options.notifyInterval = setTimeout(this.clear, 3000)
      } else {
        clearInterval(this.$options.notifyInterval)
      }
    },
    clear () {
      $(this.$el).animate({ 'top': '-60px' })
      clearInterval(this.$options.notifyInterval)
      this.isNotifying = false
      // this.message = ''
    }
  }
}

export default vue
</script>

<template lang="jade">
#ui-notification
  div.alert.inverse(:class='alertLevel')
    i.mdi.mdi-close-circle-outline.pull-right(@click='clear')
    b {{ message }}
</template>

<style lang="stylus">
height = 60px
#ui-notification
  position fixed
  z-index 11000
  left 0
  right 0
  top -(height)
  min-height height
  &.shown
    top 0px
/*  & .notification
    min-height height */
</style>
