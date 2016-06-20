import { readOne, create, update, destroy } from '../services/store'
import keypather from 'keypather'
const keypath = window.keypath = keypather()

export default {
  // mixins: [PaginationMixin],
  resource: null,         // api path to resource
  autoLoad: 'route.data', // where to load, or false
  hash: 'model',          // keypath to set the model's data
  primaryKey: 'id',       // name of model's primaryKey field
  idFrom: '$route.params.id',    // uses keypath to extract from path
  props: {
    id: String,           // pass an id to load
    autoLoad: {
      type: String,       // keypath to method to auto load or false
      default: () => 'route.data' // ['route.data', 'created', etc...]
    },
    model: {
      type: Object,       // prop to all model to be passed from collection
      default: () => {}
    }
  },
  data () {
    return {
      query: {},
      isRequest: false
    }
  },
  computed: {
    isRequesting () {
      return this.$loadingRouteData || this.isRequest
    },
    modelId () {
      return keypath.get(this, this.$options.idFrom)
    }
  },
  methods: {
    read () {
      this.isRequest = true
      return readOne(this.$options.resource, this.modelId, this.query)
        .then((data) => {
          this.isRequest = false
          return data
        })
    },
    // todo: create wrappers around these to auto handle toggling of isRequest
    create () {
      return create(this.$options.resource, this[this.$options.hash])
    },
    update () {
      return update(this.$options.resource, this[this.$options.hash])
    },
    destroy () {
      return destroy(this.$options.resource, this[this.$options.hash].id)
    }
  },
  route: {
    data () {
      if (this.autoLoad === 'route.data' && this.modelId) {
        return {
          [this.$options.hash]: this.read()
        }
      }
      return
    }
  }
}
