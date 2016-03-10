<script>
import Store from '../../services/store'
import request from 'superagent'

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
      const done = Store.findOne('meter-models', 2)
      console.log('done', done)
      return true
      // const meters = this.fetch('meters')
      // const models = this.fetch('meter-models')
      // const classes = this.fetch('meter-classes')
      // return { meters, models, classes }
    }
  },
  methods: {
    select (key, val) {
      this.filters[key] = val
    },
    fetch (path) {
      return new Promise((resolve, reject) => {
        const url = 'http://localhost:3333/' + path
        request.get(url)
          .end((err, res) => { /* eslint-disable-line handle-callback-err */
            resolve(JSON.parse(res.text))
            err
          })
      })
    },
    save () {
      const url = 'http://localhost:3333/meters'
      request.post(url)
        .send({ meter: this.meter })
        .end((err, res) => { /* eslint-disable-line handle-callback-err */
          this.msg = JSON.parse(res.text).result
          err
          this.fetch('meters')
            .then(meters => { this.meters = meters })
        })
    },
    remove (meter) {
      const url = 'http://localhost:3333/meters/' + meter.id
      request.delete(url)
        .end((err, res) => { /* eslint-disable-line handle-callback-err */
          err
          this.fetch('meters')
            .then(meters => { this.meters = meters })
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
  .grid
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
              a(href, @click.stop.prevent='remove(meter)')
                span.glyphicon.glyphicon-remove-circle.text-danger.pull-right
              p # {{ meter.id }} :: {{ meter.label }} &nbsp;
                span.label.label-primary {{ meterModel(meter) }}
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
            button.btn.btn-primary(@click.stop.prevent='save') saved ({{msg}})
</template>
