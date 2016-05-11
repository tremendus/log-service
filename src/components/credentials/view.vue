<script>
import { readOne } from 'restful-service'

const vue = {
  name: 'CredentialsView',
  data () {
    return {
      query: {},
      model: []
    }
  },
  route: {
    data () {
      return {
        model: readOne('credentials', this.$route.params.credentialId, this.query)
      }
    }
  }
}
export default vue
</script>

<template lang="jade">
#credentials-view
  .container-fluid
    .row
      .col-xs-12(v-if='!$loadingRouteData')
        h3 {{model.label}}
        debug(:debug='model')
</template>
