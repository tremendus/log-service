<script>
// todo: the theme should be a global shared object in session
// todo: the footer shouldn't be fixed in mobile!

import theme from '../../configuration/theme'
import content from '../../configuration/content'

export default {
  name: 'UiFooter',
  computed: {
    text () {
      // todo: make content/navigation dynamic based on theme
      return content[theme.default.content]
    },
    mailto () {
      return 'mailto:' + this.text.emailSupport
    }
  }
}
</script>

<template lang="jade">
#ui-footer
  .container-fluid
    .row
      .col-sm-4
        h5 {{text.model}}
        p.small.muted {{text.description}}
        p
          a(:href='text.websiteMain') Learn more online
      .col-sm-4
        h5 Support
        p.small.muted Call or email for engineering support
        p
          | Phone: {{text.phone}}
          | <br />
          | Email: &nbsp;
          a(:href='mailto') {{text.emailSupport}}
      .col-sm-4
        h5 Resources
        p.small.muted Online guides, manuals, videos and diagrams available online
        p
          a(:href='text.websiteSupport') {{text.websiteSupport}}
</template>

<style lang="stylus">
#ui-footer
  background-color #434445
  color #eee
  padding 20px 0 20px
  a
    opacity 1
    // color #F78F1E
</style>
