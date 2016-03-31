<script>
import * as store from '../../services/store'

const vue = {
  name: 'DevicesAdd',
  data () {
    return {
      models: [],
      classes: [],
      device: {
        label: '',
        device_model: '',
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
  route: {
    data () {
      return {
        models: store.readMany('device-models'),
        classes: store.readMany('device-classes')
      }
    }
  },
  methods: {
    create () {
      store.create('devices', this.device)
        .then(() => {
          this.reset('devices', 'devices')
          this.device.label = ''
        })
    },
    reset (key, model) {
      this.$set(key, model)
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
          //- .panel-heading
            //- .panel-title new device
          .panel-body
            form.form
              .form-group
                label Label
                input.form-control(type='text', v-model='device.label')
              .form-group
                label Model
                select.form-control(v-model='device.device_model')
                  option(v-for='model in models', :value='model.id', v-text='model.label')
              //- .form-group
              //-   label class
              //-   input.form-control(type='text', readonly, v-model='classById')
              //- .form-group
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
