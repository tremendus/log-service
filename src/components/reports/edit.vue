<script>
/* eslint-disable */
import events from '../../services/events'
import { readOne, readMany, action, create } from '../../services/store'

const vue = {
  name: 'reports-add',
  props: ['tabs', 'selectedTab'],
  data () {
    return {
      report: {
        label: null,
        device_model_id: null,
        meta: {
          description: null,
          devices: [],
          params: [],
          credentials: [],
          schedule: {}
        }
      },
      model: {},
      devices: [],
      device_models: [],
      parameters: [],
      credentials: [],
      intervals: [
        { label: '1 minute', value: 1 },
        { label: '5 minutes', value: 5 },
        { label: '10 minutes', value: 10 },
        { label: '15 minutes', value: 15 },
        { label: '20 minutes', value: 20 },
        { label: '30 minutes', value: 30 },
        { label: '60 minutes', value: 60 },
        { label: '24 hours', value: 60*24 },
      ],
      query: {
        report: {
          where: { id: this.$route.params.id }
        },
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
    isSelectedDevices () {
      return this.devices.filter((d) => d._selected === true).length > 0
    },
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
      return sorted
    }
  },
  route: {
    data () {
      return {
        // TODO: replace me with parameter json
        report: readOne('report', this.$route.params.id),
        parameters: action('api/parameters'),
        devices: readMany('devices', this.query.devices).then((data) => data.collection),
        device_models: readMany('device_models', this.query.device_models).then((data) => data.collection),
        credentials: readMany('credentials').then((data) => data.collection)
      }
    }
  },
  methods: {
    create () {
      // create
      const params = this.deviceParams
        .filter((p) => p._selected)
        .map(({ id, log, min, max, alarm }) => {
          return { id, log, min, max, alarm }
        })
      this.report.meta.parameters = params
      const creds = this.credentials
        .filter((c) => c._selected)
        .map(({ id, csv, xml, json }) => {
          return { id, csv, xml, json }
        })
      this.report.meta.credentials = creds
      const devices = this.devices
        .filter((d) => d._selected)
        .map(({ id }) => id)
      this.report.meta.devices = devices
      // temp: hack to make it work - consider alter table todo:
      console.log('this.report.meta', this.report.meta)
      create('reports', this.report)
        .then(() => {
          events('notification:success').broadcast('Report saved')
          this.$router.go({ name: 'reports/index' })
        })
    }
  }
}

export default vue
</script>

<template lang="jade">
#reports-add

  validator(name='form', :classes="{ invalid: 'has-error' }")
    form.form(novalidate)

      .panel.panel-default
        .panel-heading
          .panel-title New Report
        .panel-body
          .form-group(v-validate-class)
            label.control-label Title
            input.form-control(type='text', v-model='report.label', v-validate:title='["required"]', initial='off', detect-change='off')
          .form-group
            label.control-label Description
            textarea.form-control {{ report.meta.description }}
          .form-group(v-validate-class)
            label.control-label Device Type
            select.form-control(v-model='report.device_model_id', v-validate:type='["required"]', initial='off', detect-change='off')
              option(value='') Select one
              option(v-for='model in device_models', :value='model.id') {{model.label}}

      div(v-if='report.device_model_id')

        //- devices
        .panel.panel-default
          .panel-heading
            .panel-title Devices
          .panel-body
            .checkbox(v-validate-class)
              label.control-label
                input(v-show='false', type='checkbox', v-validate:devices='{ required: true, minlength: 1 }', initial='off')
                | Select one or more devices
              .checkbox(v-if='report.device_model_id', v-for='device in filteredDevices')
                label
                  input(type='checkbox', v-model='device._selected', value=true, v-validate:devices)
                  | {{ device.label }}

      div(v-if='isSelectedDevices')

        //- logging
        .panel.panel-default
          .panel-heading
            .panel-title Logging
          .panel-body
            .row.table-responsive
                table.table.table-compact.table-striped
                  thead
                    tr
                      th Parameter
                      th.text-center Include
                      th.text-center Log
                      th Min Threshold
                      th Max Threshold
                      th.text-center Alarm
                    tr
                      td.col-help Parameter to measure
                      td.col-help Include parameter in report
                      td.col-help Log all readings
                      td.col-help Enter value to log min exceptions
                      td.col-help Enter value to log max exceptions
                      td.col-help Immediately notify on exception
                  tbody
                    tr(v-for='(i, param) in deviceParams')
                      td
                        | {{ param.label }} &nbsp;
                        span.small.muted {{ param.units }}
                      td.text-center
                        .checkbox
                          label.control-label
                            input(type='checkbox', v-model='param._selected', value=true)
                      td.text-center
                        .checkbox
                          label.control-label
                            input(v-if='param._selected', type='checkbox', v-model='param.log', value=true)
                      td(v-for='(i, v) in ["min", "max"]')
                        input.form-control(v-if='param._selected', v-model='param[v]', style='width:auto;')
                      td.text-center
                        .checkbox
                          label.control-label
                            input(type='checkbox', v-if='param._selected', v-model='param.alarm', :disabled='!(param.min || param.max)', value=true)
                        span.text-help(v-else)

        //- debug(:debug='deviceParams')

        //- credentials
        .panel.panel-default
            .panel-heading
              .panel-title Export Profiles
            .panel-body
                .checkbox(v-for='(i, credential) in credentials')
                  label.control-label
                    input(type='checkbox', v-model='credential._selected', value=true)
                    | {{ credential.label }} &nbsp;
                    .checkbox(v-if='credential._selected')
                      label.control-label
                        input(type='checkbox', v-model='credential.csv', value=true)
                        | CSV
                    .checkbox(v-if='credential._selected')
                      label.control-label
                        input(type='checkbox', v-model='credential.xml', value=true)
                        | XML
                    .checkbox(v-if='credential._selected')
                      label.control-label
                        input(type='checkbox', v-model='credential.json', value=true)
                        | JSON

      //- schedule
      .panel.panel-default
        .panel-heading
          .panel-title Schedule
        .panel-body
          .form-group(v-validate-class)
            label.control-label Logging Interval
            select.form-control(v-model='report.meta.schedule.logging', v-validate:logging='["required"]', initial='off')
              option(value='') Select interval
              option(v-for='i in intervals', :value='i.value') {{ i.label }}
          .form-group(v-validate-class)
            label.control-label Export Interval
            select.form-control(v-model='report.meta.schedule.export', v-validate:export='["required"]', initial='off')
              option(value='') Select interval
              option(v-for='i in intervals', :value='i.value') {{ i.label }}

      //- options
      .panel.panel-default
        .panel-heading
          .panel-title Options
        .panel-body
          .checkbox
            label.control-label
              input(type='checkbox', v-model='report.meta.options.headings', value=true)
              | Include column headings
              br
              small Exporter uses parameter abbreviations as headings where set and parameter labels if not
            .checkbox
              label.control-label
                input(type='checkbox', v-model='report.meta.options.units', value=true)
                | Include units

      .form-group
        button.btn.btn-primary(@click.stop.prevent='create') Save

    debug(:debug='report')
</template>
