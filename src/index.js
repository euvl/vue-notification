import Notifications from './Notifications.vue'
import { events }    from './events'
import { isPlainObject } from './util'

var Notify = {
  install(Vue, params = {}) {
    if (this.installed) {
      return
    }

    this.installed = true
    this.params = params

    Vue.component('notifications', Notifications)

    Vue.prototype.$notify = (params) => {
      if (typeof params === 'string') {
        params = { title: '', text: params }
      }

      if (isPlainObject(params)) {
        events.$emit('add', params)
      }
    }
  }
}

export default Notify
