<script>
// todo: what if no device definitions
import { readOne, readMany } from 'restful-service'

const vue = {
  name: 'ReportsAdd',
  data () {
    return {
      collection: [],
      report: {},
      credentials: []
    }
  },
  computed: {
    params () {
      const params = this.collection[0].meta.reduce((ps, p) => {
        ps.push({ name: p.name, selected: false })
        return ps
      }, [])
      return params
    },
    segment () {
      const ps = this.$options.filters.orderBy(this.params, 'name')
      var l = Math.floor(ps.length / 3)
      console.log('l', l, ps.length, (2 * l), ps.length - (2 * l))
      // 10
      // l = floor( 3 / 10 ) = 3
      // 0: 0,3
      // 1: 3+1 = 4, 3
      // 2: 2*3+1=7
      var s = [
        ps.slice(0, l),
        ps.slice(l, (2 * l)),
        ps.slice(2 * l, ps.length)
      ]
      return s
    }
  },
  route: {
    data () {
      return {
        collection: readOne('device-definitions', 7),
        credentials: readMany('credentials')
      }
    }
  }
}

export default vue
</script>

<template lang="jade">
#reports-add
  h3 New Report
  //- debug(:debug='collection')
  div(v-if='!$loadingRouteData')
    form.form

      h4 Measurement Parameters
      .row
        .col-xs-4(v-for='n in 3')
          .checkbox(v-for='(i, param) in segment[n]')
            label
              input(type='checkbox', v-model='param.selected', value='true')
              | {{ param.name }}

      h4 Configuration
      .form-group
        label Polling Interval
        input.form-control(type='text', v-model='report.polling_interval')
      .form-group
        label Export Interval
        input.form-control(type='text', v-model='report.export_interval')

      h4 Exports
      .form-group
        label
          a() Setup new export configuration
      div(v-for='cred in credentials')
        .checkbox
          label
            input(type='checkbox', v-model='cred.selected', value='true')
            | {{ cred.label }}
            span.help-block {{ cred.meta.host }}
            div(v-if='cred.selected')
              .checkbox
                label
                  input(type='checkbox')
                  | CSV
              .checkbox
                label
                  input(type='checkbox')
                  | JSON
              .checkbox
                label
                  input(type='checkbox')
                  | XML
      h4 Logging
      p some type of logging options ...

    //- debug(:debug='params')

</template>
