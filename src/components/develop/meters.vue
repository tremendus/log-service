<script>
/* eslint-disable */
import * as store from '../../services/store'

const vue = {
  name: 'DevelopMeters',
  data () {
    return {
      msg: '',
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
      devices: [],
      models: [],
      classes: [],
      filters: {
        device: '',
        model: '',
        class: ''
      },
      isTcp: true
    }
  },
  computed: {
    fdevice () {
      return this.devices.find(m => m.id === this.filters.device) || {}
    },
    classById () {
      const id = this.device.device_model
      console.log('classById', id)
      if (!id) {
        return ''
      }
      const model = this.models.find(m => m.id === id)
      return this.classes.find(c => c.id === model.device_class).label
    }
  },
  route: {
    data () {
      // return store.readMany1('devices')
      return {
        devices: store.readMany('devices'),
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
      store.readMany(model)
        .then(data => {
          this.$set(key, data)
        })
    },
    update () {
      console.log('update()', this.fdevice)
      store.update('devices', this.fdevice)
        .then(() => {
          this.reset('devices', 'devices')
        })
    },
    destroy (device) {
      store.destroy('devices', device.id)
        .then(() => {
          this.reset('devices', 'devices')
        })
    },
    select (key, val) {
      if (this.filters[key] === val) {
        this.filters[key] = ''
      } else {
        this.filters[key] = val
      }
    },
    deviceModel (device) {
      const model = this.models.find(m => m.id === device.device_model)
      return model.label
    },
    deviceClass (device) {
      if (!device) {
        return ''
      }
      const model = this.models.find(m => m.id === device.device_model)
      const mclass = this.classes.find(c => c.id === model.device_class)
      return mclass.label
    }
  }
}
export default vue
</script>

<template lang="jade">
#develop-devices
  .grid(v-if='!$loadingRouteData')
    .container
      .col-sm-3
        h3 device classes
        .panel.panel-default
          .panel-heading
            .panel-title list of classes
          //- .panel-body
          ul.list-group
            li.list-group-item(v-for='class in classes', @click='select("class", class.id)', v-bind:class='{ "active" : class.id === filters.class }')
              | # {{ class.id }} :: {{ class.label }}
          .panel-footer
            | {{ classes.length }} classes fetched
        h3 device models
        .panel.panel-default
          .panel-heading
            .panel-title list of models
          //- .panel-body
          ul.list-group
            li.list-group-item(v-for='model in models | filterBy filters.class in "device_class"', @click='select("model", model.id)', v-bind:class='{ "active" : model.id === filters.model }')
              | # {{ model.id }} :: {{ model.label }}
          .panel-footer
            | {{ models.length }} models fetched
      .col-sm-6
        h3 devices
        .panel.panel-default
          .panel-heading
            .panel-title list of devices
          //- .panel-body
          ul.list-group
            li.list-group-item(v-for='_device in devices | filterBy filters.model in "device_model"', @click='select("device", _device.id)', v-bind:class='{ "active" : device.id === filters.device }')
              a(href, @click.stop.prevent='destroy(_device)')
                span.glyphicon.glyphicon-remove-circle.text-danger.pull-right
              p # {{ _device.id }} :: {{ _device.label }} &nbsp;
                //- span.label.label-primary {{ deviceModel(device) }}
              //- p
              //-   span.label.label-primary {{ deviceModel(device) }} &nbsp;
              //-   span.label.label-success {{ deviceClass(device) }}
          .panel-footer
            | {{ devices.length }} devices fetched
        h3 devices
        .panel.panel-default(v-if='fdevice')
          .panel-heading
            .panel-title {{fdevice.label}}
          .panel-body
            form.form
              .form-group
                label label
                input.form-control(type='text', :value='fdevice.label')
          .panel-footer
            button.btn.btn-success(@click.stop.prevent='update') update
        .panel.panel-default
          .panel-heading debug
          .panel-body
            debug(:debug='fdevice', label='device')
      .col-sm-3
        h3 new device
        .panel.panel-default
          .panel-heading
            .panel-title new device
          .panel-body
            form.form
              .form-group
                label label
                input.form-control(type='text', v-model='device.label')
              .form-group
                label model
                select.form-control(v-model='device.device_model')
                  option(v-for='model in models | filterBy filters.class in "device_class"', :value='model.id', v-text='model.label')
              .form-group
                label class
                input.form-control(type='text', readonly, v-model='classById')
              //- .form-group
              label.checkbox-inline
                input(type='radio', v-model='isTcp', value='tcp')
                | &nbsp; tcp
              label.checkbox-inline
                input(type='radio', v-model='isTcp', value='rtu')
                | &nbsp; rtu

          .panel-body(v-if='isTcp === "tcp"')
            .form-group
              label ip address
              input.form-control(type='text', v-model='device.meta.protocols.modbus.tcp.ip')
            .form-group
              label port
              input.form-control(type='text', v-model='device.meta.protocols.modbus.tcp.port')

          .panel-body(v-if='isTcp === "rtu"')
            .form-group
              label device
              input.form-control(type='text', v-model='device.meta.protocols.modbus.rtu.device')
            .form-group
              label port
              input.form-control(type='text', v-model='device.meta.protocols.modbus.rtu.port')
            .form-group
              label baud
              input.form-control(type='text', v-model='device.meta.protocols.modbus.rtu.baud')
            .form-group
              label dataBit
              input.form-control(type='text', v-model='device.meta.protocols.modbus.rtu.dataBit')
            .form-group
              label parity
              input.form-control(type='text', v-model='device.meta.protocols.modbus.rtu.parity')
            .form-group
              label stopBit
              input.form-control(type='text', v-model='device.meta.protocols.modbus.rtu.stopBit')

          .panel-footer
            button.btn.btn-primary(@click.stop.prevent='create') save ({{msg}})
</template>
