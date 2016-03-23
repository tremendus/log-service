<script>
const vue = {
  name: 'UsersForm',
  props: ['user']
}
export default vue
</script>

<template lang="jade">
#users-form
  form.form
    .form-group
      label Name
      input.form-control(type='text', v-model='user.name')
    .form-group
      label Email
      input.form-control(type='text', v-model='user.email')
    .checkbox
      label
        input(type='checkbox', v-model='user.is_active')
        | Active
    .checkbox
      label
        input(type='checkbox', v-model='user.is_admin')
        | Administrator
</template>
