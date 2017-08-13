import Notifications from './Notifications.vue'
import { events }    from './events'

var Notify = {
  install(Vue, params = {}) {
    if (this.installed) {
      return;
    }

    this.installed = true
    this.params = params

    const { velocity } = params

    if (velocity) {
      Notifications.configure({ velocity })
    }

    Vue.component('notifications', Notifications)
    Vue.prototype.$notify = (params) => {
      if (typeof params === 'string') {
        params = { title: '', text: params }
      }

      if (typeof params === 'object') {
        events.$emit('add', params)
      }
    }
  }
}

export default Notify;
