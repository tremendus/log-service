import events from './events'

events('error:handle').subscribe(handle)

function handle (data) {
  // todo: do something with data.err
  // other keys may exist
  console.info('elegantly handled error', data.error)
}
