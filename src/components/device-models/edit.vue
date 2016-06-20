<script>
/* eslint-disable */
import uuid from 'uuid'
import events from '../../services/events'
import { action } from '../../services/store'
import ModelMixin from '../../mixins/model'
import FormComponent from './form'

const vue = {
  name: 'DeviceModelsView',
  resource: 'device_models',
  mixins: [ModelMixin],
  components: { FormComponent },
  data () {
    return {
      query: {
        related: ['device_definition']
      }
    }
  },
  methods: {
    save () {
      console.log('edit:save()')

      this.isRequest = true

      // clone the data
      const model = Object.assign({}, this.model)
      const definition = Object.assign({}, this.model.device_definition)

      //- prep the save obj
      // delete the key
      delete model.device_definition

      // map the index to unique id
      definition.meta.params.map((p, i) => p.id = uuid.v4())
      const data = {
        device_model: model,
        device_definition: definition
      }

      // todo: fixme: replace with model create api
      action('device-models', 'post', { data })
        .then(() => {
          events('notification:success').broadcast('Device model updated')
          this.$router.go({ name: 'device-models/index' })
        })
    }
  }
}
export default vue
</script>

<template lang="jade">
#device-models-view
  .container-fluid
    .row
      .col-xs-12(v-if='!$loadingRouteData')
        h3 {{model.label}}
        form-component(:model.sync='model', @action='save')
        </template>
