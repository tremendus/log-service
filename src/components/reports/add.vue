<script>
/* eslint-disable */
import { readMany, action, create } from 'restful-service'
import { component as TabComponent, mixin as TabMixin } from '../../plugins/tabs'

const vue = {
  name: 'reports-add',
  props: ['tabs', 'selectedTab'],
  components: { TabComponent },
  mixins: [ TabMixin ],
  data () {
    return {
      report: {
        label: null,
        type: 'logging',
        device_model_id: null,
        meta: {
          description: null,
          params: []
        }
      },
      devices: [],
      device_models: [],
      parameters: [],
      reportParams: [],
      credentials: [],
      tabs: [{
        code: 'logging',
        label: 'Logging'
      }, {
        code: 'threshold',
        label: 'Threshold'
      }, {
        code: 'alarm',
        label: 'Alarm'
      }],
      selectedTab: 'logging',
      query: {
        devices: {
          orderBy: {
            column: 'label',
            direction: 'asc'
          }
        },
        device_models: {
          related: ['device_definition'],
          orderBy: {
            column: 'label',
            direction: 'asc'
          }
        }
      }
    }
  },
  computed: {
    filteredDevices () {
      return this.devices.filter((d) => d.device_model_id === this.report.device_model_id)
    },
    // sortedDevices (arr) {
    //   const sorted = arr.sort((a, b) => {
    //     if (a.label < b.label) return -1
    //     if (a.label > b.label) return 1
    //     return 0
    //   })
    //   return sorted
    // },
    deviceParams () {
      const deviceId = this.report.device_model_id
      const device = this.device_models.find((d) => d.id === deviceId)
      if (!device) return []
      const params = device.device_definition.meta.params || []
      const sorted = params.sort((a, b) => {
        if (a.label < b.label) return -1
        if (a.label > b.label) return 1
        return 0
      })
      // console.log('deviceParams', deviceId, device)
      return sorted
      // return []
    },
    // groupedParameters () {
    //   console.log('')
    //   const grouped = this.parameters.reduce((ps, p) => {
    //     console.log('p', p)
    //     let gp = ps[p.tab]
    //     if (!gp) {
    //       ps[p.tab] = gp = []
    //     }
    //     gp.push(p)
    //     console.log('gps', p, ps)
    //     return ps
    //   }, {})
    //   return grouped || []
    // }
  },
  route: {
    data () {
      return {
        // TODO: replace me with parameter json
        parameters: action('api/parameters'),
        devices: readMany('devices', this.query.devices),
        device_models: readMany('device_models', this.query.device_models),
        credentials: readMany('credentials')
      }
    }
  },
  methods: {
    create () {
      create
    }
  }
}

export default vue
</script>

<template lang="jade">
#reports-add

  form.form

    .panel.panel-default
      .panel-heading
        .panel-title New Report
      .panel-body
        .form-group
          label Title
          input.form-control(type='text', v-model='report.label')
        .form-group
          label Description
          textarea.form-control {{ report.meta.description }}
        .form-group
          label Device Type
          select.form-control(v-model='report.device_model_id')
            option(value='') Select one
            option(v-for='model in device_models', :value='model.id') {{model.label}}
        .form-group
          label Report Type
          .radio
            label
              input(type='radio', v-model='report.type', value='logging')
              | Logging
          .radio
            label
              input(type='radio', v-model='report.type', value='threshold')
              | Threshold
          .radio
            label
              input(type='radio', v-model='report.type', value='alarm')
              | Alarms

    //- .form-group
    //-   tab-component(class='nav nav-pills', :tabs.sync='tabs', :selected-tab.sync='selectedTab')

    //- devices
    .panel.panel-default
      .panel-heading
        .panel-title Devices
      .panel-body
        .checkbox(v-if='report.device_model_id', v-for='device in filteredDevices')
          label
            // todo: make an array of filtered devices that can push into
            input(type='checkbox', value=true)
            | {{ device.label }} &nbsp;
            //- span.small.muted {{ device }}

    //- logging
    .panel.panel-default(v-if='report.type === "logging"')
      .panel-heading
        .panel-title Logging
      .panel-body
        .row.table-responsive
            table.table.table-compact.table-striped
              thead
                tr
                  th Parameter
                  th Log
                  th Min Threshold
                  th Max Threshold
                  th Alarm
                tr
                  td.col-help Parameter to measure
                  td.col-help Include parameter and log all readings
                  td.col-help Enter value to log min exceptions
                  td.col-help Enter value to log max exceptions
                  td.col-help Check to immediately notify on exception
              tbody
                tr(v-for='(i, param) in deviceParams')
                  td 
                    | {{ param.label }} &nbsp;
                    span.small.muted {{ param.units }}
                  td
                    .checkbox
                      label
                        input(type='checkbox', v-model='param._selected', value=true)
                  td(v-for='i in 2')
                    input.form-control(style='width:auto;')
                  td
                    .checkbox
                      label
                        input(type='checkbox', v-model='param._alarm', value=true)

    //- threshold
    .panel.panel-default(v-if='report.type === "threshold"')
      .panel-heading
        .panel-title Threshold
      .panel-body
    
    //- alarm
    .panel.panel-default(v-if='report.type === "alarm"')
      .panel-heading
        .panel-title Alarm
      .panel-body

  //- credentials
  .panel.panel-default
      .panel-heading
        .panel-title Export Profiles
      .panel-body
          .checkbox(v-for='(i, credential) in credentials')
            label
              input(type='checkbox', v-model='credential._selected', value=true)
              | {{ credential.label }} &nbsp;
              //- span.small.muted {{ parameter.units }}
              .checkbox(v-if='credential._selected')
                label
                  input(type='checkbox', v-model='credential._csv', value=true)
                  | CSV
                  //- span.small.muted {{ parameter.units }}
              .checkbox(v-if='credential._selected')
                label
                  input(type='checkbox', v-model='credential._xml', value=true)
                  | XML
                  //- span.small.muted {{ parameter.units }}
              .checkbox(v-if='credential._selected')
                label
                  input(type='checkbox', v-model='credential._json', value=true)
                  | JSON
                  //- span.small.muted {{ parameter.units }}
</template>

<style lang="stylus">
.col-help
  font-size 0.85em
  opacity 0.7
</style>
