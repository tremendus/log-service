<script>
import CollectionMixin from '../../mixins/collection'

const vue = {
  name: 'ReportsViewDevices',
  resource: 'devices',
  autoLoad: 'created',
  hash: 'devices',
  mixins: [CollectionMixin],
  props: ['list', 'devices', 'deviceIndex'],
  data () {
    return {
      query: {
        filters: [{
          method: 'whereIn',
          filter: ['id', this.list]
        }],
        related: ['device_model.device_definition']
      }
    }
  }
}

export default vue

// import { readMany } from '../../services/store'
// const vue = {
//   name: 'ReportsViewDevices',
//   created () {
//     this.fetch()
//   },
//   methods: {
//     fetch () {
//       readMany('devices', this.query)
//         .then((devices) => {
//           this.devices = devices
//         })
//     }
//   }
// }
// export default vue
</script>

<template lang="jade">
#reports-view-devices
  select.form-control(v-model='deviceIndex', v-if='devices')
    option(value='') Select One
    option(v-for='(i, device) in devices', :value='i') {{ device.label }}
</template>
