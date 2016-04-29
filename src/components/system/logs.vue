<script>
// todo: clear logs
// todo: download all at once

import { action } from '../../services/store'
import config from '../../configuration/adapter'

const vue = {
  name: 'SystemLogs',
  data () {
    return {
      url: '',
      logs: {}
    }
  },
  computed: {
    // logs () {
    //   const files = window.files = this.files.logs
    //   if (!Array.isArray(files)) return []
    //   files.shift() // remove fist line files, <count>
    //   files.pop() // remove blank last line
    //   const logs = files.map((f) => {
    //     return f.split('\t')
    //   })
    //   return logs
    // }
  },
  route: {
    data () {
      return {
        logs: action('system/logs')
      }
    }
  },
  methods: {
    path (url) {
      return config.host + url
    }
  }
}

export default vue
</script>

<template lang="jade">
#system-logs
  .container-fluid
    .row
      .col-xs-12(v-if='!loadingRouteData')
        h3 System Logs
        table.table.table-bordered.table-striped(v-if='logs')
          thead
            tr
              th File
              th.text-right Size
              th.text-right Created
          tbody
            tr(v-for='log in logs')
              td
                a(:href='path(log.url)', target='_blank'){{ log.file }}
              td.text-right {{ log.stats.size }}
              td.text-right {{ log.stats.atime }}
</template>
