const Vue = require('vue')
const _ = Vue.util
const qs = require('qs')

export default {

  data () {
    return {
      // client paging request
      paging: {
        page: 1,
        limit: 20,
        sort: 'created_at',
        direction: 'desc'
      },
      // server response
      pagingMeta: {
        pages: null,
        count: null,
        total: null
      }
    }
  },

  beforeCompile () {
    const paging = _.mergeOptions(this.paging, this.$route.query)
    this.paging = paging
  },

  methods: {
    pageUp () {
      let p = parseInt(this.paging.page)
      if (p === parseInt(this.pagingMeta.pages)) return
      const path = this.pageRoute({ page: ++p })
      this.$route.router.go(path)
    },

    pageDown () {
      let p = parseInt(this.paging.page)
      if (p === 1) return
      const path = this.pageRoute({ page: --p })
      this.$route.router.go(path)
    },

    pageNum (p) {
      p = parseInt(p)
      const path = this.pageRoute({ page: p })
      this.$route.router.go(path)
    },

    pageSort (s) {
      let direction = this.paging.direction
      if (s === this.paging.sort) {
        direction = (direction === 'asc' ? 'desc' : 'asc')
      }
      console.log('direction', direction)
      const delta = {
        direction,
        sort: s,
        page: 1
      }
      const path = this.pageRoute(delta)
      this.$route.router.go(path)
    },

    pageDir (d) {
      const path = this.pageRoute({ direction: d })
      this.$route.router.go(path)
    },

    pageLimit (l) {
      const delta = {
        limit: parseInt(l),
        page: 1
      }
      const path = this.pageRoute(delta)
      this.$route.router.go(path)
    },

    // todo: move this to a routing mixin, useable by more than pagination
    pageRoute (param) {
      const query = _.mergeOptions(this.paging, param)
      this.paging = query
      const path = this.$route.path.split('?')[0]
      const go = path + '?' + qs.stringify(query)
      return go
    }
  }
}
