<script>
const vue = {
  name: 'DeviceRegister',
  props: ['register'],
  replace: false
}
export default vue
</script>

<template lang="jade">
td
  input.form-control(v-model='register.register')
</template>
