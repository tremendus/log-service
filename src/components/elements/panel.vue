<script>
var vue = {
  name: 'PanelElement',
  props: ['title', 'footer']
}
export default vue
</script>

<template lang="jade">
.panel.panel-default
  .panel-heading(v-if='title')
    .panel-title {{ title }}
  .panel-body
    slot
  .panel-footer(v-if='footer')
    slot(name='footer')
</template>
