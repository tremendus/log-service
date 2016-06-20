<script>
const vue = {
  name: 'form',
  data () {
    return {
      req: '',
      ip: '192.168.0.1'
    }
  },
  methods: {
    save () {
      this.$activateValidator()
    }
  }
}
export default vue
</script>

<template lang="jade">
#form.container
  validator(name='form1', :classes="{ invalid: 'has-error' }")
    form(novalidate)
      .form-group(v-validate-class)
        label.control-label(for='req') Required
        input.form-control(type='text', v-model='req', v-validate:req='["required"]')
        debug(:debug='$form1.req.invalid')

      .form-group(v-validate-class)
        label.control-label(for='ip') IP Address
        input.form-control(type='text', v-model='ip', v-validate:ip='["ip"]')
        debug(:debug='$form1.ip.invalid')

      .form-group
        button.btn.btn-primary(@click.stop.prevent='save') Save
  
  debug(:debug='$form1')
</template>