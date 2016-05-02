<script>
import { readMany, create } from 'restful-service'

const vue = {
  name: 'DevicesAdd',
  data () {
    return {
      collection: [],
      query: {
        related: ['device_class', 'device_definition']
      },
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
      },
      useProtocol: 'tcp'
    }
  },
  computed: {
    devices () {
      const collection = Object.assign([], this.collection)
      collection.unshift({ id: false, label: 'Choose the model of your device' })
      return collection
    }
  },
  route: {
    data () {
      return {
        collection: readMany('device_model', this.query)
      }
    }
  },
  methods: {
    create () {
      create('device', this.device)
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
        .panel.panel-default
          .panel-heading
            .panel-title Device Details
          .panel-body
            form.form
              .form-group
                label Label
                input.form-control(type='text', v-model='device.label')
              .form-group
                label Model
                select.form-control(v-model='device.device_model_id')
                  option(v-for='model in devices', :value='model.id', v-text='model.label')
              label.checkbox-inline
                input(type='radio', v-model='useProtocol', value='tcp')
                | &nbsp; TCP
              label.checkbox-inline
                input(type='radio', v-model='useProtocol', value='rtu')
                | &nbsp; RTU

          .panel-body(v-if='useProtocol === "tcp"')
            .form-group
              label IP Address
              input.form-control(type='text', v-model='device.meta.protocols.modbus.tcp.ip')
            .form-group
              label Port
              input.form-control(type='text', v-model='device.meta.protocols.modbus.tcp.port')

          .panel-body(v-if='useProtocol === "rtu"')
            .form-group
              label Device
              input.form-control(type='text', v-model='device.meta.protocols.modbus.rtu.device')
            .form-group
              label Port
              input.form-control(type='text', v-model='device.meta.protocols.modbus.rtu.port')
            .form-group
              label Baud
              input.form-control(type='text', v-model='device.meta.protocols.modbus.rtu.baud')
            .form-group
              label Data Bit
              input.form-control(type='text', v-model='device.meta.protocols.modbus.rtu.dataBit')
            .form-group
              label Parity
              input.form-control(type='text', v-model='device.meta.protocols.modbus.rtu.parity')
            .form-group
              label Stop Bit
              input.form-control(type='text', v-model='device.meta.protocols.modbus.rtu.stopBit')

          .panel-footer
            button.btn.btn-primary(@click.stop.prevent='create') Save
</template>
