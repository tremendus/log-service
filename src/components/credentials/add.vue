<script>
import { create } from '../../services/store'
import CredentialsForm from './form'

const vue = {
  name: 'CredentialsAdd',
  components: [CredentialsForm],
  data () {
    return {
      credential: {}
    }
  },
  methods: {
    create () {
      create('credentials', this.credential)
        .then(() => {
          console.warn('No event handler on create')
        })
    }
  }
}

export default vue
</script>

<template lang="jade">
#credentials-add
  .container-fluid
    .row
      .col-xs-12
        h3 Add Export Profile
        credentials-form(:credential='credential', @action='create')
</template>
