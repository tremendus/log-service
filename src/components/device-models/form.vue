<script>
/* eslint-disable */
import Vue from 'vue'
import events from '../../services/events'
import { action } from '../../services/store'
import { component as TabComponent, mixin as TabMixin } from '../../plugins/tabs'

const vue = {
  name: 'DeviceModelForm',
  props: ['model'],
  components: { TabComponent },
  mixins: [TabMixin],
  data () {
    return {
      id: 0,
      register: {
        // remove factory alignment for now
        // parameter_id: null,
        id: null,
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
      // necessary to have array as root object for mutation observers to fire
      // params: [],
      selected: 0,
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
    params () {
      return this.model.device_definition.meta.params
    },
    reg () {
      if (!this.params[this.selected]) {
        return {}
      }
      return this.params[this.selected]
    }
  },
  created () {
    if (this.params.length === 0) {
      this.append()
    }
  },
  methods: {
    next (dir) {
      if (dir && this.selected < this.params.length - 1) {
        this.selected += 1
        Vue.nextTick(() => {
          this.$validate()
        })
      } else if (!dir && this.selected > 0) {
        this.selected -= 1
        Vue.nextTick(() => {
          this.$validate()
        })
      }
    },
    select (i) {
      this.selected = i
      Vue.nextTick(() => {
        this.$validate()
      })
    },
    append () {
      // todo: clone w/ reset register, or clean new
      const add = Object.assign({}, this.register)
      this.params.push(add)
      this.selected = this.params.length - 1
    },
    doIfValid (cb) {
      this.$validate()
      if (this.$form.valid) {
        // this.append()
        if (typeof cb === 'function') {
          cb.call()
          return
        } else {
          this.$emit('action')
        }
      } else {
        events('notification:error').broadcast('Please check all fields before continuing')
      }
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
          this.model.device_definition.meta.params = sorted
        })
    }
  }
}
export default vue
</script>

<template lang="jade">
#device-model-add
  //- debug(:debug='$form')
  validator(name='form', :classes="{ invalid: 'has-error' }")
    form.form(novalidate)
      .panel.panel-default
        .panel-heading
          .panel-title Model Details
        .panel-body
          .form-group(v-validate-class)
            label.control-label Model Label
            input.form-control(type='text', v-model='model.label', v-validate:label='["required"]', initial='off', detect-change='off')
            //- span.help-block Try to use a concise accurate and complete model of your device eg. Acuvim-IIR-60-5A-P1

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
              .form-group(v-validate-class)
                label.control-label Parameter Name
                input.form-control(type='text', v-model='reg.label', v-validate:label='["required"]', initial='off', detect-change='off')
            .col-xs-4
              .form-group(v-validate-class)
                label.control-label Parameter Abbreviation
                input.form-control(type='text', v-model='reg.abbreviation', v-validate:abbreviation='[]', initial='off', detect-change='off')
            .col-xs-4
              .form-group(v-validate-class)
                label.control-label Parameter Units
                input.form-control(type='text', v-model='reg.units', v-validate:units='["required"]', initial='off', detect-change='off')
          .row
            .col-xs-4
              .form-group(v-validate-class)
                label.control-label Register
                input.form-control(type='text', v-model='reg.register', v-validate:register='["required"]', initial='off', detect-change='off')
            .col-xs-4
              .form-group(v-validate-class)
                label.control-label Data Type
                select.form-control(v-model='reg.dataType', v-validate:dataType='["required"]', initial='off', detect-change='off')

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
              .form-group(v-validate-class)
                label.control-label Function
                select.form-control(v-model='reg.function', v-validate:function='["required"]', initial='off', detect-change='off')
                  option(value='') Select one
                  option(value=1) Read Coil
                  option(value=3) Read Input Register
                  option(value=4) Read Holding Register
                //- input.form-control(type='text', v-model='reg.function')
          .row
            .col-xs-4
              .form-group(v-validate-class)
                label
                  input(type='checkbox', v-model='reg.slopeEnabled', value=true)
                  | &nbsp; Enable Slope
                .div(v-if='reg.slopeEnabled')
                  input.form-control(type='text', v-model='reg.slope')
            .col-xs-4
              .form-group(v-validate-class)
                label
                  input(type='checkbox', v-model='reg.offsetEnabled', value=true)
                  | &nbsp; Enable Offset
                .div(v-if='reg.offsetEnabled')
                  input.form-control(type='text', v-model='reg.offset')
            .col-xs-4
              .form-group(v-validate-class)
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
          //-       label.control-label Align Parameter
          //-       select.form-control(v-model='reg.parameter_id')
          //-         option(value=) Select one
          //-         option(v-for='parameter in parameters', :value='parameter.id') {{ parameter.label }}

          button.btn.btn-primary(@click.prevent.stop='doIfValid(append)') Add

    .panel.panel-default(v-if='isTab("upload")')
      .panel-heading
        .panel-title Upload
      .panel-body
        .form-group
          label.control-label File
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
        tr(v-for='(i, param) in params')
          td
            a(href='javascript:;', @click='select(i)') {{ param.label || 'None Set' }}
          td {{ param.parameter_id }}
          //- td {{ param.abbreviation }}
          td {{ param.units }}
          td {{ param.register }}
          td {{ param.dataType }}
          td {{ param.function }}
          td {{ param.slope }}
          td {{ param.offset }}
          td {{ param.multiplierRegister }}
          td {{ param.scale }}
          td {{ param.invalidValue }}
          td
            button.btn.btn-sm.btn-danger(@click.stop.prevent='remove(i)') Remove

  .form-group
    button.btn.btn-primary(@click.stop.prevent='doIfValid()') Save

  //- debug(:debug='params')

</template>
