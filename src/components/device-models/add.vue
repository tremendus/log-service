<script>
/* eslint-disable */
import uuid from 'uuid'
import events from '../../services/events'
import { readMany, action, create } from '../../services/store'
import FormComponent from './form'

const vue = {
  name: 'DeviceModelAdd',
  components: { FormComponent },
  data () {
    return {
      id: 0,
      model: {
        label: null,
        device_class_id: 1,  // todo: reserve for custom devices?
        device_definition_id: null, // assigned on save
        factory: 0,
        meta: {
          protocols: {
            modbus: {
              tcp: false,
              rtu: false
            }
          }
        },
        device_definition: {
          meta: {
            params: []
          }
        }
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
      // todo: this hasn't been tested - trying editing, make sure id same
      definition.meta.params.map((p) => p.id = p.id || uuid.v4())
      const data = {
        device_model: model,
        device_definition: definition
      }

      // todo: fixme: replace with model create api
      action('device-models', 'post', { data })
        .then(() => {
          events('notification:success').broadcast('Device model saved')
          this.$router.go({ name: 'device-models/index' })
        })
    }
  }
}
export default vue
</script>

<template lang="jade">
#device-model-add
  h3 Add Device Model
  debug(:debug='model')
  form-component(:model.sync='model', @action='save')
</template>
