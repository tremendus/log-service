<script>
import ModelMixin from '../../mixins/model'
import FormComponent from './form'
import events from '../../services/events'

const vue = {
  name: 'DevicesEdit',
  resource: 'devices',
  mixins: [ModelMixin],
  components: { FormComponent },
  methods: {
    save () {
      this.update()
        .then(() => {
          events('notification:success').broadcast('Device saved')
          this.$router.go({ name: 'devices/index' })
        })
    }
  }
}

export default vue
</script>

<template lang="jade">
#devices-add
  .container-fluid
    .row
      .col-xs-12(v-if='!$loadingRouteData')
        h3 Edit Device
        form-component(:model.sync='model', @action='save')
</template>
