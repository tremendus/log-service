<script>
/* eslint-disable */
import { readOne, action } from 'restful-service'
import FormComponent from './form'

const vue = {
  name: 'DeviceModelsView',
  components: { FormComponent },
  data () {
    return {
      query: {
        related: ['device_definition']
      },
      model: []
    }
  },
  route: {
    data () {
      return {
        model: readOne('device_models', this.$route.params.deviceModelId, this.query)
      }
    }
  },
  methods: {
    save () {
      console.log('edit:save()')
      // clone the data
      const model = Object.assign({}, this.model)
      const definition = Object.assign({}, this.model.device_definition)

      //- prep the save obj
      // delete the key
      delete model.device_definition
      // map the index to arbitrary id
      definition.meta.params.map((p, i) => p.id = i)
      const data = {
        device_model: model,
        device_definition: definition
      }

      // todo: fixme: replace with model create api
      action('device-models', 'post', { data })
        .then((result) => {
          console.log('save():action:result', result)
          const opts = {
            level: 'success',
            message: 'Your device was successfully created'
          }
          this.$root.$broadcast('notification:show', opts)
          setTimeout(this.$router.go({ name: 'device-models/index' }), 2000)
        })
        .catch((error) => {
          const opts = {
            level: 'danger',
            // todo: proper error messages: consider should this be handled at adapter or store, not here?
            message: 'There was a problem saving your device. Try again, if the problem persists ... there is little you can do'
          }
          this.$root.$broadcast('notification:show', opts)
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
