// todo: deprecate this.$set
import { readMany } from '../services/store'
import PaginationMixin from './pagination'

export default {
  mixins: [PaginationMixin],
  resource: null,
  autoLoad: 'route.data',
  autoMethod: 'read',
  autoPaginate: true,
  hash: 'collection',
  metaHash: 'paging.meta',
  data () {
    return {
      collection: [],
      query: {
        where: {},
        filters: [],
        related: []
      },
      search: {
        term: null,
        filter: {
          method: 'where',
          filter: ['name', 'like', null]
        }
      },
      isRequest: false
    }
  },
  computed: {
    isRequesting () {
      return this.$loadingRouteData || this.isRequest
    }
  },
  created () {
    if (this.$options.autoLoad === 'created') {
      this.read()
        .then((collection) => {
          this.$set(this.$options.hash, collection)
        })
    }
  },
  methods: {
    read () {
      this.isRequest = true
      const query = Object.assign(this.paging, this.query)
      return readMany(this.$options.resource, query)
        .then((data) => {
          // todo: move to finally() - polyfill required
          this.isRequest = false
          this.pagingMeta = data.meta
          return data.collection
        })
    }
  },
  route: {
    data () {
      if (this.$options.autoLoad === 'route.data') {
        return this.read()
          .then((collection) => {
            return {
              [this.$options.hash]: collection
            }
          })
      }
      return
    }
  },
  watch: {
    query: {
      deep: true,
      handler () {
        if (this.$options.autoPaginate) {
          this.read()
            .then((collection) => {
              this.$set(this.$options.hash, collection)
            })
        }
      }
    },
    'search.term' (val) {
      const { term, filter } = this.search
      console.log('search.term', val, term, filter)
      if (val) {
        filter.filter[2] = `%${term}%`
        this.query.filters = [filter]
      } else {
        this.query.filters = []
      }
    }
  }
}
