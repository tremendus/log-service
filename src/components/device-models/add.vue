<script>
// import DeviceRegister from './elements/device-register'
const vue = {
  name: 'DeviceModelAdd',
  // components: { DeviceRegister },
  data () {
    return {
      register: {
        parameter_id: null,
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
      registers: [],
      definition: {
        label: null,
        meta: []
      },
      selected: 0,
      tabs: [{
        code: 'upload',
        label: 'Upload'
      }, {
        code: 'custom',
        label: 'Build'
      }],
      selectedTab: 'build'
    }
  },
  computed: {
    reg () {
      if (!this.registers[this.selected]) {
        return {}
      }
      return this.registers[this.selected]
    }
  },
  created () {
    this.append()
  },
  methods: {
    select (dir) {
      if (dir && this.selected < this.registers.length - 1) {
        this.selected += 1
      } else if (!dir && this.selected > 0) {
        this.selected -= 1
      }
    },
    append () {
      // todo: clone w/ reset register, or clean new
      const add = Object.assign({}, this.register)
      this.registers.push(add)
      this.selected = this.registers.length - 1
    },
    remove (i) {
      // console.log('remove()', i)
      if (this.selected >= i) {
        this.select(false)
      }
      this.registers.splice(i, 1)
      if (this.registers.length === 0) {
        this.append()
      }
    },
    isTab (tab) {
      console.log('isTab', tab, this.selectedTab)
      return tab === this.selectedTab
    },
    selectTab (tab) {
      this.selectedTab = tab
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
      label Model Label
      input.form-control(type='text', v-model='definition.label')
      span.help-block Try to use a concise accurate and complete model of your device eg. Acuvim-IIR-60-5A-P1

    .form-group
      .nav.nav-pills
        li(:class='{ "active" : isTab("build") }')
          a(href='javascript;', @click.stop.prevent='selectTab("build")') Build
        li(:class='{ "active" : isTab("upload") }')
          a(href='javascript;', @click.stop.prevent='selectTab("upload")') Upload

    .panel.panel-default(v-if='isTab("build")')
      .panel-heading
        .panel-title Add Registers ({{ selected + 1 }} of {{ registers.length }})
      .panel-body
        .btn-group
          .btn.btn-default(@click.stop.prevent='select(false)')
            span.glyphicon.glyphicon-chevron-left
          .btn.btn-default(@click.stop.prevent='select(true)')
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
                option(selected) Select one
                option(value='0') UINT16
                option(value='1') INT16
                option(value='2') UINT32
                option(value='3') INT32
                option(value='4') Float32
                option(value='5') Mod 10k (4 registers)
                option(value='6') Mod 10k (3 registers)
                option(value='7') Mod 10k (2 registers)
                option(value='8') Mod 1k (4 registers)
                option(value='9') Mod 1k (3 registers)
                option(value='10') Mod 1k (2 registers)
                option(value='11') HEX 16
              //- input.form-control(type='text', v-model='reg.dataType')
          .col-xs-4
            .form-group
              label Function
              select.form-control(v-model='reg.function')
                option(selected) Select one
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
                input(type='checkbox', v-model='reg.multiRegEnabled', value=true)
                | &nbsp; Enable Multiplier
              .div(v-if='reg.multiRegEnabled')
                input.form-control(type='text', v-model='reg.multiReg')
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

        button.btn.btn-primary(@click.prevent.stop='append') Add

  debug(:debug='registers')

  .table-responsive(v-if='true')
    table.table.table-condensed.table-striped
      thead
        tr
          th Parameter
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
        //- tr(is='device-register', v-for='register in registers', :register='register')
        tr(v-for='(i, model) in registers')
          td {{ model.label }}
          td {{ model.abbreviation }}
          td {{ model.units }}
          td {{ model.register }}
          td {{ model.dataType }}
          td {{ model.function }}
          td {{ model.slope }}
          td {{ model.offset }}
          td {{ model.multiReg }}
          td {{ model.scale }}
          td {{ model.invalidValue }}
          td
            button.btn.btn-sm.btn-danger(@click.stop.prevent='remove(i)') Remove
</template>
