<script>
/* eslint-disable */
import * as store from '../../services/store'

const vue = {
  name: 'DevelopMeters',
  data () {
    return {
      msg: '',
      meter: {
        label: '',
        meter_model: '',
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
      meters: [],
      models: [],
      classes: [],
      filters: {
        meter: '',
        model: '',
        class: ''
      },
      isTcp: true
    }
  },
  computed: {
    fmeter () {
      return this.meters.find(m => m.id === this.filters.meter) || {}
    },
    classById () {
      const id = this.meter.meter_model
      console.log('classById', id)
      if (!id) {
        return ''
      }
      const model = this.models.find(m => m.id === id)
      return this.classes.find(c => c.id === model.meter_class).label
    }
  },
  route: {
    data () {
      // return store.readMany1('meters')
      return {
        meters: store.readMany('meters'),
        models: store.readMany('meter-models'),
        classes: store.readMany('meter-classes')
      }
    }
  },
  methods: {
    create () {
      store.create('meters', this.meter)
        .then(() => {
          this.reset('meters', 'meters')
          this.meter.label = ''
        })
    },
    reset (key, model) {
      store.readMany(model)
        .then(data => {
          this.$set(key, data)
        })
    },
    update () {
      console.log('update()', this.fmeter)
      store.update('meters', this.fmeter)
        .then(() => {
          this.reset('meters', 'meters')
        })
    },
    destroy (meter) {
      store.destroy('meters', meter.id)
        .then(() => {
          this.reset('meters', 'meters')
        })
    },
    select (key, val) {
      if (this.filters[key] === val) {
        this.filters[key] = ''
      } else {
        this.filters[key] = val
      }
    },
    meterModel (meter) {
      const model = this.models.find(m => m.id === meter.meter_model)
      return model.label
    },
    meterClass (meter) {
      if (!meter) {
        return ''
      }
      const model = this.models.find(m => m.id === meter.meter_model)
      const mclass = this.classes.find(c => c.id === model.meter_class)
      return mclass.label
    }
  }
}
export default vue
</script>

<template lang="jade">
#develop-meters
  .grid(v-if='!$loadingRouteData')
    .container
      .col-sm-3
        h3 meter classes
        .panel.panel-default
          .panel-heading
            .panel-title list of classes
          //- .panel-body
          ul.list-group
            li.list-group-item(v-for='class in classes', @click='select("class", class.id)', v-bind:class='{ "active" : class.id === filters.class }')
              | # {{ class.id }} :: {{ class.label }}
          .panel-footer
            | {{ classes.length }} classes fetched
        h3 meter models
        .panel.panel-default
          .panel-heading
            .panel-title list of models
          //- .panel-body
          ul.list-group
            li.list-group-item(v-for='model in models | filterBy filters.class in "meter_class"', @click='select("model", model.id)', v-bind:class='{ "active" : model.id === filters.model }')
              | # {{ model.id }} :: {{ model.label }}
          .panel-footer
            | {{ models.length }} models fetched
      .col-sm-6
        h3 meters
        .panel.panel-default
          .panel-heading
            .panel-title list of meters
          //- .panel-body
          ul.list-group
            li.list-group-item(v-for='_meter in meters | filterBy filters.model in "meter_model"', @click='select("meter", _meter.id)', v-bind:class='{ "active" : meter.id === filters.meter }')
              a(href, @click.stop.prevent='destroy(_meter)')
                span.glyphicon.glyphicon-remove-circle.text-danger.pull-right
              p # {{ _meter.id }} :: {{ _meter.label }} &nbsp;
                //- span.label.label-primary {{ meterModel(meter) }}
              //- p
              //-   span.label.label-primary {{ meterModel(meter) }} &nbsp;
              //-   span.label.label-success {{ meterClass(meter) }}
          .panel-footer
            | {{ meters.length }} meters fetched
        h3 meters
        .panel.panel-default(v-if='fmeter')
          .panel-heading
            .panel-title {{fmeter.label}}
          .panel-body
            form.form
              .form-group
                label label
                input.form-control(type='text', :value='fmeter.label')
          .panel-footer
            button.btn.btn-success(@click.stop.prevent='update') update
        .panel.panel-default
          .panel-heading debug
          .panel-body
            debug(:debug='fmeter', label='meter')
      .col-sm-3
        h3 new meter
        .panel.panel-default
          .panel-heading
            .panel-title new meter
          .panel-body
            form.form
              .form-group
                label label
                input.form-control(type='text', v-model='meter.label')
              .form-group
                label model
                select.form-control(v-model='meter.meter_model')
                  option(v-for='model in models | filterBy filters.class in "meter_class"', :value='model.id', v-text='model.label')
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
              input.form-control(type='text', v-model='meter.meta.protocols.modbus.tcp.ip')
            .form-group
              label port
              input.form-control(type='text', v-model='meter.meta.protocols.modbus.tcp.port')

          .panel-body(v-if='isTcp === "rtu"')
            .form-group
              label device
              input.form-control(type='text', v-model='meter.meta.protocols.modbus.rtu.device')
            .form-group
              label port
              input.form-control(type='text', v-model='meter.meta.protocols.modbus.rtu.port')
            .form-group
              label baud
              input.form-control(type='text', v-model='meter.meta.protocols.modbus.rtu.baud')
            .form-group
              label dataBit
              input.form-control(type='text', v-model='meter.meta.protocols.modbus.rtu.dataBit')
            .form-group
              label parity
              input.form-control(type='text', v-model='meter.meta.protocols.modbus.rtu.parity')
            .form-group
              label stopBit
              input.form-control(type='text', v-model='meter.meta.protocols.modbus.rtu.stopBit')

          .panel-footer
            button.btn.btn-primary(@click.stop.prevent='create') save ({{msg}})
</template>
