<script>
import PanelElement from '../elements/panel'
import CredentialsComponent from './view-report-credentials'

const vue = {
  name: 'ReportsViewReport',
  props: ['report'],
  components: {
    CredentialsComponent,
    PanelElement
  },
  computed: {
    params () {
      const rps = this.report.meta.parameters
      const dps = this.report.device_model.device_definition.meta.params
      const ps = rps.map((rp) => {
        var match = dps.filter((dp) => dp.id === rp.id)[0]
        return Object.assign({}, rp, match)
      })
      return ps
    },
    creds () {
      const cs = this.report.meta.credentials
        .map(({ id }) => id)
      return cs
    },
  }
}

export default vue
</script>

<template lang="jade">
#reports-view-report
  .row
    .col-sm-12


      //- note: this report shows time-param data for the selected device
        device is dropdown
        param = x
        time = y
        :: should re-use the same display component as the device view report page
        - the only difference there is filter is for report, not device

      //- panel-element(title='Parameters')
      //-   p some content

      //- content
        report settings
          - basics
            - name
            - device model
          - parameters
          - credentials
          - schedule
          - options
        params
        logs/thresholds


      //- credentials-component(:list='creds')

      debug(:debug='report')

</template>
