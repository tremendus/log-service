<script>
import * as store from 'restful-service'
const vue = {
  name: 'adapter',
  route: {
    data () {
      const data = { label: 'test device' }
      return store.create('device', data)
        .then((d) => {
          return store.readOne('device', 7)
        })
        .then((d) => {
          const d1 = {
            id: 7,
            label: 'updated test device'
          }
          return store.update('device', d1)
        })
        .then((d) => {
          return store.destroy('device', 7)
        })
        .then((d) => {
          return Promise.resolve(true)
        })
    }
  }
}
export default vue
</script>

<template lang="jade">
#adapter

</template>
