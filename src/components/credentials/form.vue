<script>
// import { readMany } from 'restful-service'

const vue = {
  name: 'CredentialsForm',
  props: ['credential'],
  data () {
    return {
      types: [
        { id: 'smtp', value: 'SMTP Email' },
        { id: 'ftp', value: 'FTP' },
        { id: 'sftp', value: 'SFTP' },
        { id: 'http', value: 'HTTP Post' },
        { id: 'https', value: 'HTTPS Post' }
      ]
    }
  },
  computed: {

  },
  created () {
    let type = this.credential.type
    if (!type) {
      type = 'smtp'
    }
  },
  methods: {
    action () {
      this.$validate()
      if (this.$form.valid) {
        console.log('form is valid :)')
        // this.$emit('action')
      } else {
        console.warn('form is not valid', this.$form.errors)
      }
    }
  }
}

export default vue
</script>

<template lang="jade">
#credentials-form

  validator(name='form', :classes="{ invalid: 'has-error' }")
    form.form(novalidate)

      //- credential details
      .panel.panel-default
          .panel-heading
            .panel-title Export Credentials
          .panel-body
            .form-group(v-validate-class)
              label.control-label(for='credential.label') Label
              input.form-control(type='text', v-model='credential.label', v-validate:label='["required"]', initial='off', detect-change='off')

            div(v-validate-class)
              .form-group
                label.checkbox(v-for='type in types')
                  input(type='radio', name='protocol', v-model='credential.type', :value='type.id')
                  | &nbsp; {{ type.value }}

      //- smtp
      .panel.panel-default(v-if='credential.type === "smtp"')
          .panel-heading
            .panel-title SMTP Credentials
          .panel-body
            .form-group(v-validate-class)
              label.control-label Host
              input.form-control(type='text', v-model='credential.meta.host', v-validate:host='["required"]', initial='off', detect-change='off')
            .form-group(v-validate-class)
              label.control-label Port
              input.form-control(type='text', v-model='credential.meta.port', v-validate:port='{ required: true, min: 1, max: 65535 }', initial='off', detect-change='off')
            .form-group(v-validate-class)
              label.control-label Username
              input.form-control(type='text', v-model='credential.meta.user', v-validate:user='{}', initial='off', detect-change='off')
            .form-group(v-validate-class)
              label.control-label Password
              input.form-control(type='password', v-model='credential.meta.pass', v-validate:pass='{}', initial='off', detect-change='off')
            .form-group(v-validate-class)
              label.control-label Recipient Email
              input.form-control(type='text', v-model='credential.meta.to', v-validate:pass='["email_address"]', initial='off', detect-change='off')
            .form-group(v-validate-class)
              label.control-label From Email
              input.form-control(type='text', v-model='credential.meta.from', v-validate:pass='["email_address"]', initial='off', detect-change='off')

      //- (s)ftp
      .panel.panel-default(v-if='credential.type === "ftp" || credential.type === "sftp"')
          .panel-heading
            .panel-title FTP Credentials
          .panel-body
            .form-group(v-validate-class)
              label.control-label Type
              p.form-control-static {{ credential.type.toUpperCase() }}
            .form-group(v-validate-class)
              label.control-label Host
              input.form-control(type='text', v-model='credential.meta.host', v-validate:host='["required"]', initial='off', detect-change='off')
            .form-group(v-validate-class)
              label.control-label Port
              input.form-control(type='text', v-model='credential.meta.port', v-validate:port='{ required: true, min: 1, max: 65535 }', initial='off', detect-change='off')
            .form-group(v-validate-class)
              label.control-label Username
              input.form-control(type='text', v-model='credential.meta.user', v-validate:user='{}', initial='off', detect-change='off')
            .form-group(v-validate-class)
              label.control-label Password
              input.form-control(type='password', v-model='credential.meta.pass', v-validate:pass='{}', initial='off', detect-change='off')
            .form-group(v-validate-class)
              label.control-label Path
              input.form-control(type='text', v-model='credential.meta.path', v-validate:path='{}', initial='off', detect-change='off')
              span.help-text If your data needs to be stored somewhere other than the root of your FTP server, enter the entire path from the root of your server here

      //- http(s)
      .panel.panel-default(v-if='credential.type === "http" || credential.type === "https"')
          .panel-heading
            .panel-title HTTP Post Credentials
          .panel-body
            .form-group(v-validate-class)
              label.control-label Type
              p.form-control-static {{ credential.type.toUpperCase() }} Post
            .form-group(v-validate-class)
              label.control-label URL
              input.form-control(type='text', v-model='credential.meta.url', v-validate:path='required', initial='off', detect-change='off')
              p.help-text Enter the fully qualified domain name with port and path including any query string parameters you wish appended to the request
              p.help-text Eg: https://data.server.com:443/upload?token=abc123456
            .form-group(v-validate-class)
              label.control-label Request Headers
              input.form-control(type='text', v-model='credential.meta.header', v-validate:path='{}', initial='off', detect-change='off')
              p.help-text If required, you can enter a custom HTTP request header in this format: Header=Value
            //- .form-group(v-validate-class)
            //-   label.control-label Host
            //-   input.form-control(type='text', v-model='credential.meta.host', v-validate:host='["required"]', initial='off', detect-change='off')
            //- .form-group(v-validate-class)
            //-   label.control-label Port
            //-   input.form-control(type='text', v-model='credential.meta.port', v-validate:port='{ min: 1, max: 65535 }', initial='off', detect-change='off')
            //- .form-group(v-validate-class)
            //-   label.control-label Path
            //-   input.form-control(type='text', v-model='credential.meta.path', v-validate:path='{}', initial='off', detect-change='off')
            //- .form-group(v-validate-class)
            //-   label.control-label Query String
            //-   input.form-control(type='text', v-model='credential.meta.querystring', v-validate:query='{}', initial='off', detect-change='off')
            //-   span.help-text If you need to pass query string params (eg token) you can add the entire query string here, including the intial '?'
            //- .form-group(v-validate-class)
            //-   label.control-label Password
            //-   input.form-control(type='password', v-model='credential.meta.pass', v-validate:pass='{}', initial='off', detect-change='off')

      .panel-footer
        button.btn.btn-primary(@click.stop.prevent='action') Save
</template>
