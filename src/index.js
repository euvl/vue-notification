import Component from './Component.vue'

const plugin = {
  install(Vue) {

    const $notify = (params) => {
      if (typeof params !== 'undefined') {
        if (typeof params !== 'object') {
          params = {title: '', text: params}
        }

        this.events.$emit('add', params)
      }
    }

    this.events = new Vue()
    Object.defineProperty(Vue.prototype, '$notify', {
      get: () => $notify
    })

    Vue.component('notifications', Component)
  }
}

export default plugin
