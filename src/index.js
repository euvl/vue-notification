import Notifications from './Notifications.vue'
import { events } from './events'
import { params } from './params';

const notify = (params) => {
  if (typeof params === 'string') {
    params = { title: '', text: params }
  }

  if (typeof params === 'object') {
    events.emit('add', params)
  }
}

notify.close = function (id) {
  events.emit('close', id)
}

let installed = false;

export default {
  install: (app, args = {}) => {
    if (installed) return;
    installed = true;
    Object.entries(args).forEach((entry) => params.set(...entry));

    const name = args.name || 'notify'

    app.config.globalProperties['$' + name] = notify;

    app.component(args.componentName || 'notifications', Notifications);
  }
}
