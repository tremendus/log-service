<script>
/* incomplete: not yet in use - too convoluted? */
const vue = {
  name: 'DeviceModelsSelect',
  data () {
    return {
      collection: []
    }
  },
  created () {
    readMany('device_models')
      .then((collection) => {
        this.collection = collection
      })
  }
}
export default vue
</script>

<template lang="jade">
select.form-control
  option(v-for='model in collection')
  
</template>