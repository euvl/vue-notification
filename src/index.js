import Notifications from './Notifications.vue'
import { events }    from './events'

const Notify = {
  install(Vue, params = {}) {
    if (this.installed) {
      return
    }

    this.installed = true
    this.params = params

    Vue.component('notifications', Notifications)

    const notify = (params) => {
      if (typeof params === 'string') {
        params = { title: '', text: params }
      }

      if (typeof params === 'object') {
        events.$emit('add', params)
      }
    }

    Vue.prototype.$notify = notify
    Vue.notify = notify
  }
}

export default Notify
