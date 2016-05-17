<script>
import { readMany } from 'restful-service'

const vue = {
  name: 'DevicesForm',
  props: ['device'],
  data () {
    return {
      deviceModels: [],
      useProtocol: 'tcp'
    }
  },
  computed: {
    sortedDeviceModels () {
      const deviceModels = Object.assign([], this.deviceModels)
      deviceModels.unshift({ id: '', label: 'Choose the model of your device' })
      return deviceModels
    },
    isRequired () {
      return false
    }
  },
  created () {
    readMany('device_models')
      .then((collection) => {
        this.deviceModels = collection
      })
  },
  methods: {
    action () {
      this.$validate()
      if (this.$form.valid) {
        console.log('form is valid :)')
        // this.$emit('action')
      } else {
        console.warn('form is not valid', this.$form.errors)
      }
    }
  }
}

export default vue
</script>

<template lang="jade">
#devices-form

  validator(name='form', :classes="{ invalid: 'has-error' }")
    form.form(novalidate)

      //- device details
      .panel.panel-default
          .panel-heading
            .panel-title Device Details
          .panel-body
            .form-group(v-validate-class)
              label.control-label(for='device_label') Label
              input.form-control(type='text', v-model='device.label', v-validate:device_label='["required"]', initial='off', detect-change='off')
            .form-group(v-validate-class)
              label.control-label(for='model') Model
              select.form-control(v-model='device.device_model_id', v-validate:model='["required"]', initial='off', detect-change='off')
                option(v-for='model in sortedDeviceModels', :value='model.id', v-text='model.label')
            
            div(v-validate-class)
              label.checkbox-inline
                input(type='radio', name='protocol', v-model='useProtocol', value='tcp')
                | &nbsp; TCP
              label.checkbox-inline
                input(type='radio', name='protocol', v-model='useProtocol', value='rtu')
                | &nbsp; RTU

          .panel-body(v-if='useProtocol === "tcp"')
            .form-group(v-validate-class)
              label.control-label IP Address
              input.form-control(type='text', v-model='device.meta.protocols.modbus.tcp.ip', v-validate:ip.word='["ip"]', initial='off', detect-change='off')
            .form-group(v-validate-class)
              label.control-label Port
              input.form-control(type='text', v-model='device.meta.protocols.modbus.tcp.port', v-validate:port='{ min: 1, max: 65535 }', initial='off', detect-change='off')

          .panel-body(v-if='useProtocol === "rtu"')
            .form-group
              label.control-label Device
              input.form-control(type='text', v-model='device.meta.protocols.modbus.rtu.device')
            .form-group
              label.control-label Port
              input.form-control(type='text', v-model='device.meta.protocols.modbus.rtu.port')
            .form-group
              label.control-label Baud
              input.form-control(type='text', v-model='device.meta.protocols.modbus.rtu.baud')
            .form-group
              label.control-label Data Bit
              input.form-control(type='text', v-model='device.meta.protocols.modbus.rtu.dataBit')
            .form-group
              label.control-label Parity
              input.form-control(type='text', v-model='device.meta.protocols.modbus.rtu.parity')
            .form-group
              label.control-label Stop Bit
              input.form-control(type='text', v-model='device.meta.protocols.modbus.rtu.stopBit')

        .panel-footer
          button.btn.btn-primary(@click.stop.prevent='action') Save
</template>