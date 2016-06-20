<script>
import CollectionMixin from '../../mixins/collection'

const vue = {
  name: 'ReportsViewReportCredentials',
  resource: 'credentials',
  autoLoad: 'created',
  mixins: [CollectionMixin],
  props: ['list'],
  data () {
    return {
      query: {
        filters: [{
          method: 'whereIn',
          filter: ['id', this.list]
        }]
      }
    }
  }
}
export default vue
</script>

<template lang="jade">
#reports-view-report-credentials
  debug(:debug='collection')
</template>
