<script>
import { readOne, update } from '../../services/store'
import CredentialsForm from './form'

const vue = {
  name: 'DevicesEdit',
  components: [CredentialsForm],
  data () {
    return {
      model: {}
    }
  },
  route: {
    data () {
      return {
        model: readOne('credentials', this.$route.params.credentialId)
      }
    }
  },
  methods: {
    update () {
      update('credentials', this.credential)
        .then(() => {
          console.warn('No event handler on update')
        })
    }
  }
}

export default vue
</script>

<template lang="jade">
#credentials-edit
  .container-fluid
    .row
      .col-xs-12(v-if='!$loadingRouteData')
        h3 Edit Export Profile
        credentials-form(:credential='model', @action='update')
</template>
