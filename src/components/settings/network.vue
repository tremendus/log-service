<script>
import { action, update } from 'restful-service'

const vue = {
  name: 'SettingsNetwork',
  data () {
    return {
      network: {}
    }
  },
  route: {
    data () {
      return {
        network: action('settings/read-network')
      }
    }
  },
  methods: {
    update () {
      update(null, this.network, { url: 'settings/write-network' })
    }
  }
}
export default vue
</script>

<template lang="jade">
#settings-network
  .container-fluid(v-if='!$loadingRouteData')
    .row
      .cols-xs-12
        h3 Network Settings
        form.form
          .panel.panel-default
            .panel-heading Interface #1
            .panel-body
              .checkbox
                label
                  input(type='checkbox', xv-model='network.en[0][1].upnp')
                  | Use UPnP
              //- todo: div if not UPnp
              .checkbox
                label
                  input(type='checkbox', xv-model='network.en[0][1].dhcp')
                  | Use DHCP
              //- todo: div if !UPnP && !DHCP
              .form-group
                label IP Address
                input.form-control(type='text', v-model='network.en0[1].address')
              .form-group
                label Gateway
                input.form-control(type='text', xv-model='network.en[0][1].gateway')
              .form-group
                label Subnet Mask
                input.form-control(type='text', xv-model='network.en[0][1].netmask')
              .form-group
                label Hostname
                input.form-control(type='text', xv-model='network.en[0][1].hostname')
              .form-group
                label DNS Server 1
                input.form-control(type='text', xv-model='network.en[0][1].dns1')
              .form-group
                label DNS Server 2
                input.form-control(type='text', xv-model='network.en[0][1].dns2')
              .form-group
                label Ethernet MTU
                input.form-control(type='text', xv-model='network.en[0][1].mtu')
              .form-group
                label Proxy Address
                input.form-control(type='text', xv-model='network.en[0][1].proxy_address')
              .form-group
                label Proxy Port
                input.form-control(type='text', xv-model='network.en[0][1].proxy_port')
            .panel-footer
              button.btn.btn-primary(@click.stop.prevent='update') Save
        debug(:debug='network')
</template>
