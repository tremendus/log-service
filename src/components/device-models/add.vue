<script>
/* eslint-disable */

import { action, create } from 'restful-service'
import { component as TabComponent, mixin as TabMixin } from '../../plugins/tabs'

const vue = {
  name: 'DeviceModelAdd',
  components: { TabComponent },
  mixins: [TabMixin],
  data () {
    return {
      register: {
        // remove factory alignment for now
        // parameter_id: null,
        label: null,
        abbreviation: null,
        units: null,
        register: null,
        dataType: null,
        function: null,
        slopeEnabled: false,
        slope: null,
        offsetEnabled: false,
        offset: null,
        multiRegEnabled: false,
        multiReg: null,
        userScaleEnabled: false,
        userScale: null,
        invalidValueEnabled: false,
        invalidValue: null
      },
      device_model: {
        label: null,
        device_class_id: 1,  // todo: reserve for custom devices?
        device_definition_id: null, // assigned on save
        factory: 0,
        meta: {
          protocols: {
            modbus: {
              tcp: false,
              rtu: false
            }
          }
        }
      },
      device_definition: {
        label: null,
        meta: {
          params: []
        }
      },
      parameters: [],
      selected: 0,
      params: [],
      tabs: [{
        code: 'custom',
        label: 'Build'
      }, {
        code: 'upload',
        label: 'Upload'
      }],
      selectedTab: 'custom'
    }
  },
  computed: {
    reg () {
      if (!this.params[this.selected]) {
        return {}
      }
      return this.params[this.selected]
    }
  },
  created () {
    this.append()
  },
  methods: {
    next (dir) {
      if (dir && this.selected < this.params.length - 1) {
        this.selected += 1
      } else if (!dir && this.selected > 0) {
        this.selected -= 1
      }
    },
    select (i) {
      this.selected = i
    },
    append () {
      // todo: clone w/ reset register, or clean new
      const add = Object.assign({}, this.register)
      this.params.push(add)
      this.selected = this.params.length - 1
    },
    remove (i) {
      // console.log('remove()', i)
      if (this.selected >= i) {
        this.select(false)
      }
      this.params.splice(i, 1)
      if (this.params.length === 0) {
        this.append()
      }
    },
    upload () {
      const file = document.getElementById('upload').files[0]
      const reader = new FileReader()
      reader.onload = this.process.bind(this)
      // todo: proper error handling
      reader.onerror = console.error
      reader.readAsText(file)
    },
    process (event) {
      console.log('process()', event)
      const definition = event.target.result
      action('import/upload', 'post', { data: { definition } })
        .then((result) => {
          console.log('result', result)
          const sorted = result.sort((a, b) => {
            if (a.label < b.label) return -1
            if (a.label > b.label) return 1
            return 0
          })
          this.params = sorted
        })
    },
    save () {
      // reference the current params object
      this.device_definition.meta.params = this.params
      const data = {
        device_model: this.device_model,
        device_definition: this.device_definition
      }
      console.log('save()', data)
      action('device-models', 'post', { data })
    }
  },
  route: {
    data () {
      return {
        parameters: action('api/parameters')
      }
    }
  },
  watch: {
    'device_model.label' (val) {
      this.device_definition.label = val + ' Definition'
    }
  }
}
export default vue
</script>

<template lang="jade">
#device-model-add
  h3 Add Device Model

  form.form
    .form-group
      label Device Model
      input.form-control(type='text', v-model='device_model.label')
      span.help-block Try to use a concise accurate and complete model of your device eg. Acuvim-IIR-60-5A-P1

    .form-group
      tab-component(class='nav nav-pills', :tabs.sync='tabs', :selected-tab.sync='selectedTab')

    .panel.panel-default(v-if='isTab("custom")')
      .panel-heading
        .panel-title Add Registers ({{ selected + 1 }} of {{ params.length }})
      .panel-body
        .btn-group
          .btn.btn-default(@click.stop.prevent='next(false)')
            span.glyphicon.glyphicon-chevron-left
          .btn.btn-default(@click.stop.prevent='next(true)')
            span.glyphicon.glyphicon-chevron-right
        .row
          .col-xs-4
            .form-group
              label Parameter Name
              input.form-control(type='text', v-model='reg.label')
          .col-xs-4
            .form-group
              label Parameter Abbreviation
              input.form-control(type='text', v-model='reg.abbreviation')
          .col-xs-4
            .form-group
              label Parameter Units
              input.form-control(type='text', v-model='reg.units')
        .row
          .col-xs-4
            .form-group
              label Register
              input.form-control(type='text', v-model='reg.register')
          .col-xs-4
            .form-group
              label Data Type
              select.form-control(v-model='reg.dataType')
                option(value=) Select one
                option(value=0) UINT16
                option(value=1) INT16
                option(value=2) UINT32
                option(value=3) INT32
                option(value=4) Float32
                option(value=5) Mod 10k (4 registers)
                option(value=6) Mod 10k (3 registers)
                option(value=7) Mod 10k (2 registers)
                option(value=8) Mod 1k (4 registers)
                option(value=9) Mod 1k (3 registers)
                option(value=10) Mod 1k (2 registers)
                option(value=11) HEX 16
              //- input.form-control(type='text', v-model='reg.dataType')
          .col-xs-4
            .form-group
              label Function
              select.form-control(v-model='reg.function')
                option(value=) Select one
                option(value=1) Read Coil
                option(value=3) Read Input Register
                option(value=4) Read Holding Register
              //- input.form-control(type='text', v-model='reg.function')
        .row
          .col-xs-4
            .form-group
              label
                input(type='checkbox', v-model='reg.slopeEnabled', value=true)
                | &nbsp; Enable Slope
              .div(v-if='reg.slopeEnabled')
                input.form-control(type='text', v-model='reg.slope')
          .col-xs-4
            .form-group
              label
                input(type='checkbox', v-model='reg.offsetEnabled', value=true)
                | &nbsp; Enable Offset
              .div(v-if='reg.offsetEnabled')
                input.form-control(type='text', v-model='reg.offset')
          .col-xs-4
            .form-group
              label
                input(type='checkbox', v-model='reg.multiplierRegisterEnabled', value=true)
                | &nbsp; Enable Multiplier Register
              .div(v-if='reg.multiplierRegisterEnabled')
                input.form-control(type='text', v-model='reg.multiplierRegister')
        .row
          .col-xs-4
            .form-group
              label
                input(type='checkbox', v-model='reg.userScaleEnabled', value=true)
                | &nbsp; Enable Scale
              .div(v-if='reg.userScaleEnabled')
                input.form-control(type='text', v-model='reg.userScale')
          .col-xs-4
            .form-group
              label
                input(type='checkbox', v-model='reg.invalidValueEnabled', value=true)
                | &nbsp; Enable Invalid Value
              .div(v-if='reg.invalidValueEnabled')
                input.form-control(type='text', v-model='reg.invalidValue')
        
        // remove factory alignment for now
        //- .row
        //-   .col-xs-4
        //-     .form-group
        //-       label Align Parameter
        //-       select.form-control(v-model='reg.parameter_id')
        //-         option(value=) Select one
        //-         option(v-for='parameter in parameters', :value='parameter.id') {{ parameter.label }}

        button.btn.btn-primary(@click.prevent.stop='append') Add

    .panel.panel-default(v-if='isTab("upload")')
      .panel-heading
        .panel-title Upload
      .panel-body
        .form-group
          label File
          input#upload.form-control(type='file')
        .form-group.btn-group
          a.btn.btn-primary(@click='upload') Upload

  .table-responsive(v-if='true')
    table.table.table-condensed.table-striped
      thead
        tr
          th Parameter
          //- th Factory Parameter
          th Abbreviation
          th Units
          th Register
          th DataType
          th Function Code
          th Slope
          th Offset
          th Multiplier
          th Scale
          th Invalid Value
          th Remove?
      tbody
        //- tr(is='device-register', v-for='register in params', :register='register')
        tr(v-for='(i, model) in params')
          td
            a(href='javascript:;', @click='select(i)') {{ model.label }}
          td {{ model.parameter_id }}
          //- td {{ model.abbreviation }}
          td {{ model.units }}
          td {{ model.register }}
          td {{ model.dataType }}
          td {{ model.function }}
          td {{ model.slope }}
          td {{ model.offset }}
          td {{ model.multiplierRegister }}
          td {{ model.scale }}
          td {{ model.invalidValue }}
          td
            button.btn.btn-sm.btn-danger(@click.stop.prevent='remove(i)') Remove

  .form-group
    button.btn.btn-primary(@click.stop.prevent='save') Save

  //- debug(:debug='params')

</template>
