<script>
import * as store from '../../services/store'

const vue = {
  name: 'DevelopMeters',
  data () {
    return {
      msg: '',
      meter: {
        label: '',
        meta: {}
      },
      meters: [],
      models: [],
      classes: [],
      filters: {
        meter: '',
        model: '',
        class: ''
      }
    }
  },
  route: {
    data () {
      // return store.findMany1('meters')
      return {
        meters: store.findMany('meters'),
        models: store.findMany('meter-models'),
        classes: store.findMany('meter-classes')
      }
    }
  },
  methods: {
    select (key, val) {
      this.filters[key] = val
    },
    reset (key, model) {
      store.findMany(model)
        .then(data => {
          this.$set(key, data)
        })
    },
    create () {
      store.create('meters', this.meter)
        .then(() => {
          this.reset('meters', 'meters')
          this.meter.label = ''
        })
    },
    update () {
      
    },
    destroy (meter) {
      store.destroy('meters', meter.id)
        .then(() => {
          this.reset('meters', 'meters')
        })
    },
    meterModel (meter) {
      const model = this.models.find(m => m.id === meter.meter_model)
      console.log('meterModel', meter, model)
      return model.label
    },
    meterClass (meter) {
      const model = this.models.find(m => m.id === meter.meter_model)
      const mclass = this.classes.find(c => c.id === model.meter_class)
      return mclass.label
    }
  }
}
export default vue
</script>

<template lang="jade">
#develop-meters
  .grid(v-if='!$loadingRouteData')
    .container
      .col-sm-3
        h3 meter classes
        .panel.panel-default
          .panel-heading
            .panel-title list of classes
          //- .panel-body
          ul.list-group
            li.list-group-item(v-for='class in classes')
              | # {{ class.id }} :: {{ class.label }}
          .panel-footer
            | {{ classes.length }} classes fetched
        h3 meter models
        .panel.panel-default
          .panel-heading
            .panel-title list of models
          //- .panel-body
          ul.list-group
            li.list-group-item(v-for='model in models')
              | # {{ model.id }} :: {{ model.label }}
          .panel-footer
            | {{ models.length }} models fetched
      .col-sm-6
        h3 meters
        .panel.panel-default
          .panel-heading
            .panel-title list of meters
          //- .panel-body
          ul.list-group
            li.list-group-item(v-for='meter in meters')
              a(href, @click.stop.prevent='destroy(meter)')
                span.glyphicon.glyphicon-remove-circle.text-danger.pull-right
              p # {{ meter.id }} :: {{ meter.label }} &nbsp;
                //- span.label.label-primary {{ meterModel(meter) }}
              //- p
              //-   span.label.label-primary {{ meterModel(meter) }} &nbsp;
              //-   span.label.label-success {{ meterClass(meter) }}
          .panel-footer
            | {{ meters.length }} meters fetched

        .panel.panel-default
          .panel-heading
            .panel-title new meter
          .panel-body
            form.form
              .form-group
                label label
                input.form-control(type='text', v-model='meter.label')
          .panel-footer
            button.btn.btn-primary(@click.stop.prevent='create') saved ({{msg}})
</template>
