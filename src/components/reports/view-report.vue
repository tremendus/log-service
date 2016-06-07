<script>
import { readOne } from 'restful-service'

var vue = {
  name: 'ReportsViewReport',
  data () {
    return {
      model: {}
    }
  },
  created () {
    this.fetch()
  },
  methods: {
    fetch () {
      readOne('report', this.$route.report_id)
        .then((report) => {
          this.model = report
        })
    }
  }
}

export default vue
</script>

<template lang="jade">
#reports-view-report
  debug(:debug='model')
</template>
