<script>
import { action } from 'restful-service'

const vue = {
  name: 'SystemInfo',
  data () {
    return {
      command: '',
      info: []
    }
  },
  route: {
    // data () {
    //   const command = 'top -l 1'
    //   const path = 'develop/shell?command=' + encodeURIComponent(command)
    //   return {
    //     info: action(path)
    //   }
    // }
  },
  methods: {
    send () {
      const command = this.command
      const path = 'system/shell?command=' + encodeURIComponent(command)
      action(path)
        .then(response => {
          this.$set('info', response)
        })
    }
  }
}

export default vue
</script>

<template lang="jade">
#system-info
  .container-fluid
    .row
      .col-xs-12
        h3 system info
        .input-group
          label shell command to run
          input.form-control(type='text', v-model='command')
        .input-group
          button.btn.btn-primary(@click='send') send
        debug(:debug='info')
</template>
