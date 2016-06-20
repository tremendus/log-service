<script>
import ModelMixin from '../../mixins/model'
import FormComponent from './form'
import events from '../../services/events'

const vue = {
  name: 'DevicesAdd',
  resource: 'devices',
  mixins: [ModelMixin],
  components: { FormComponent },
  data () {
    return {
      collection: [],
      model: {
        label: null,
        device_model_id: null,
        meta: {
          protocols: {
            use: 'tcp',
            modbus: {
              tcp: {
                ip: null,
                port: null
              },
              rtu: {
                device: null,
                port: null,
                baud: null,
                dataBit: null,
                parity: null,
                stopBit: null
              }
            }
          }
        }
      }
    }
  },
  methods: {
    save () {
      this.isRequest = true
      this.create()
        .then(() => {
          events('notification:success').broadcast('Device created')
          this.$router.go({ name: 'devices/index' })
        })
    }
  }
}

export default vue
</script>

<template lang="jade">
#devices-add
  .container-fluid
    .row
      .col-xs-12
        h3 Add Device
        form-component(:model.sync='model', @action='save')
</template>
