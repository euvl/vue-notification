import Notifications from './Notifications.vue'
import { events }    from './events'

var Notify = {
  install(Vue) {
    if (this.installed) {
      return;
    }

    this.installed = true;

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
