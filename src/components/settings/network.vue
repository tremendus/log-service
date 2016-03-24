<script>
import * as adapter from '../../services/adapter'

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
        network: adapter.action('settings/read-network')
      }
    }
  },
  methods: {
    update () {
      adapter.update(null, this.network, { url: 'settings/write-network' } )
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
                  input(type='checkbox', v-model='network.en[0][1].dhcp')
                  | Use DHCP
              .checkbox
                label
                  input(type='checkbox', v-model='network.en[0][1].upnp')
                  | Use UPnP
              .form-groups
                label IP Address
                input.form-control(type='text', v-model='network.en[0][1].address')
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
            .panel-footer
              button.btn.btn-primary(@click.stop.prevent='update') Save
        debug(:debug='network')
</template>
