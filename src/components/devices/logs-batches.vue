<script>
import { readMany } from 'restful-service'

var vue = {
  name: 'DeviceLogsBatches',
  props: ['device', 'report', 'batch'],
  data () {
    return {
      batches: []
    }
  },
  computed: {
    query () {
      return {
        where: {
          report_id: this.report
        },
        orderBy: {
          column: 'created_at',
          direction: 'desc'
        }
      }
    }
  },
  methods: {
    fetch () {
      readMany('batches', this.query)
        .then((batches) => {
          this.batches = batches
        })
    }
  },
  watch: {
    report () {
      this.fetch()
    }
  }
}

export default vue
</script>

<template lang="jade">
#device-logs-batches
  .form-group
    label.control-label Select Batch
    select.form-control(v-model='batch')
      option(value='') Select One
      option(v-for='bat in batches', :value='bat.id') {{ bat.created_at }}
</template>
