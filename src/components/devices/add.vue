<script>
import { create } from 'restful-service'
import DevicesForm from './form'

const vue = {
  name: 'DevicesAdd',
  components: [DevicesForm],
  data () {
    return {
      collection: [],
      device: {
        label: '',
        device_model_id: null,
        meta: {
          protocols: {
            modbus: {
              tcp: {
                ip: '192.168.0.1',
                port: 3500
              },
              rtu: {
                device: 32,
                port: '/dev/tty3',
                baud: 9600,
                dataBit: 8,
                parity: 'N',
                stopBit: 1
              }
            }
          }
        }
      }
    }
  },
  methods: {
    create () {
      create('devices', this.device)
        .then(() => {
          console.warn('No event handler on create')
          // this.reset('devices', 'devices')
          // this.device.label = ''
        })
    },
    reset (key, model) {
      this.$set(key, model)
      console.warn('No event handler on reset')
      // store.readMany(model)
      //   .then(data => {
      //     this.$set(key, data)
      //   })
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
        devices-form(:device='device', @action='create')
</template>
