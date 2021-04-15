import { defineComponent, TransitionGroup, openBlock, createBlock, withCtx, renderSlot, resolveDynamicComponent, Fragment, renderList, createCommentVNode, createVNode } from 'vue';

function mitt(n){return {all:n=n||new Map,on:function(t,e){var i=n.get(t);i&&i.push(e)||n.set(t,[e]);},off:function(t,e){var i=n.get(t);i&&i.splice(i.indexOf(e)>>>0,1);},emit:function(t,e){(n.get(t)||[]).slice().map(function(n){n(e);}),(n.get("*")||[]).slice().map(function(n){n(t,e);});}}}

const events = mitt();

const params = new Map();

const directions = {
  x: ['left', 'center', 'right'],
  y: ['top', 'bottom']
};

/**
  * Sequential ID generator
  */
const Id = (i => () => i++)(0);

/**
  * Splits space/tab separated string into array and cleans empty string items.
  */
const split = (value) => {
  if (typeof value !== 'string') {
    return []
  }

  return value.split(/\s+/gi).filter(v => v)
};

/**
  * Cleanes and transforms string of format "x y" into object {x, y}.
  * Possible combinations:
  *   x - left, center, right
  *   y - top, bottom
  */
const listToDirection = (value) => {
  if (typeof value === 'string') {
    value = split(value);
  }

  let x = null;
  let y = null;

  value.forEach(v => {
    if (directions.y.indexOf(v) !== -1) {
      y = v;
    }
    if (directions.x.indexOf(v) !== -1) {
      x = v;
    }
  });

  return { x, y }
};

function Timer (callback, delay, notifItem) {
  let start, remaining = delay;

  this.pause = function() {
    clearTimeout(notifItem.timer);
    remaining -= Date.now() - start;
  };

  this.resume = function() {
    start = Date.now();
    clearTimeout(notifItem.timer);
    notifItem.timer = setTimeout(callback, remaining);
  };

  this.resume();
}

var defaults = {
  position: ['top', 'right'],
  cssAnimation: 'vn-fade',
  velocityAnimation: {
    enter: (el) => {
      var height = el.clientHeight;

      return {
        height: [height, 0],
        opacity: [1, 0]
      }
    },
    leave: {
      height: 0,
      opacity: [0, 1]
    }
  }
};

var script$2 = defineComponent({
  name: 'velocity-group',
  components: {
    TransitionGroup,
  },
  emits: ['afterLeave', 'leave', 'enter'],
  methods: {
    enter (el, complete) {
      this.$emit('enter', { el, complete });
    },
    leave (el, complete) {
      this.$emit('leave', { el, complete });
    },
    afterLeave () {
      this.$emit('afterLeave');
    }
  }
});

function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(TransitionGroup, {
    tag: "span",
    css: false,
    onEnter: _ctx.enter,
    onLeave: _ctx.leave,
    onAfterLeave: _ctx.afterLeave
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["onEnter", "onLeave", "onAfterLeave"]))
}

script$2.render = render$2;
script$2.__file = "src/VelocityGroup.vue";

var script$1 = defineComponent({
  name: 'css-group',
  components: {
    TransitionGroup,
  },
  props: {
    name: { type: String, required: true },
  }
});

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(TransitionGroup, {
    tag: "span",
    name: _ctx.name
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["name"]))
}

script$1.render = render$1;
script$1.__file = "src/CssGroup.vue";

const floatRegexp = '[-+]?[0-9]*.?[0-9]+';

const types = [
  {
    name: 'px',
    regexp: new RegExp(`^${floatRegexp}px$`)
  },
  {
    name: '%',
    regexp: new RegExp(`^${floatRegexp}%$`)
  },
  /**
   * Fallback option
   * If no suffix specified, assigning "px"
   */
  {
    name: 'px',
    regexp: new RegExp(`^${floatRegexp}$`)
  }
];

var getType = (value) => {
  if (value === 'auto') {
    return {
      type: value,
      value: 0
    }
  }

  for (var i = 0; i < types.length; i++) {
    let type = types[i];
    if (type.regexp.test(value)) {
      return {
        type: type.name,
        value: parseFloat(value)
      }
    }
  }

  return {
    type: '',
    value: value
  }
};

const parse = (value) => {
  switch (typeof value) {
    case 'number':
      return { type: 'px', value }
    case 'string':
      return getType(value)
    default:
      return { type: '', value }
  }
};

const STATE = {
  IDLE: 0,
  DESTROYED: 2
};

var script = defineComponent({
  name: 'notifications',
  components: {
    VelocityGroup: script$2,
    CssGroup: script$1
  },
  props: {
    group: {
      type: String,
      default: ''
    },

    width: {
      type: [Number, String],
      default: 300
    },

    reverse: {
      type: Boolean,
      default: false
    },

    position: {
      type: [String, Array],
      default: () => {
        return defaults.position
      }
    },

    classes: {
      type: String,
      default: 'vue-notification'
    },

    animationType: {
      type: String,
      default: 'css',
      validator (value) {
        return value === 'css' || value === 'velocity'
      }
    },

    animation: {
      type: Object,
      default () {
        return defaults.velocityAnimation
      }
    },

    animationName: {
      type: String,
      default: defaults.cssAnimation
    },

    speed: {
      type: Number,
      default: 300
    },
    /* Todo */
    cooldown: {
      type: Number,
      default: 0
    },

    duration: {
      type: Number,
      default: 3000
    },

    delay: {
      type: Number,
      default: 0
    },

    max: {
      type: Number,
      default: Infinity
    },

    ignoreDuplicates: {
      type: Boolean,
      default: false
    },

    closeOnClick: {
      type: Boolean,
      default: true
    },

    pauseOnHover: {
      type: Boolean,
      default: false
    }

  },
  emits: ['click', 'destroy'],
  data () {
    return {
      list: [],
      velocity: params.get('velocity'),
      timerControl: ""
    }
  },
  computed: {
    actualWidth () {
      return parse(this.width)
    },
    /**
      * isVelocityAnimation
      */
    isVA () {
      return this.animationType === 'velocity'
    },

    componentName () {
      return this.isVA
        ? 'velocity-group'
        : 'css-group'
    },

    styles () {
      const { x, y } = listToDirection(this.position);
      const width = this.actualWidth.value;
      const suffix = this.actualWidth.type;

      let styles = {
        width: width + suffix,
        [y]: '0px'
      };

      if (x === 'center') {
        styles['left'] = `calc(50% - ${width/2}${suffix})`;
      } else {
        styles[x] = '0px';
      }

      return styles
    },

    active () {
      return this.list.filter(v => v.state !== STATE.DESTROYED)
    },

    botToTop () {
      // eslint-disable-next-line no-prototype-builtins
      return this.styles.hasOwnProperty('bottom')
    },
  },
  mounted () {
    events.on('add', this.addItem);
    events.on('close', this.closeItem);
  },
  methods: {
    destroyIfNecessary (item) {
      this.$emit('click', item);
      if (this.closeOnClick) {
        this.destroy(item);
      }
    },
    pauseTimeout () {
      if (this.pauseOnHover) {
        this.timerControl.pause();
      }
    },
    resumeTimeout () {
      if (this.pauseOnHover) {
        this.timerControl.resume();
      }
    },
    addItem (event) {
      event.group = event.group || '';
      event.data = event.data || {};

      if (this.group !== event.group) {
        return
      }

      if (event.clean || event.clear) {
        this.destroyAll();
        return
      }

      const duration = typeof event.duration === 'number'
        ? event.duration
        : this.duration;

      const speed = typeof event.speed === 'number'
        ? event.speed
        : this.speed;

      const ignoreDuplicates = typeof event.ignoreDuplicates === 'boolean'
        ? event.ignoreDuplicates
        : this.ignoreDuplicates;

      let { title, text, type, data, id } = event;

      const item = {
        id: id || Id(),
        title,
        text,
        type,
        state: STATE.IDLE,
        speed,
        length: duration + 2 * speed,
        data
      };

      if (duration >= 0) {
        this.timerControl = new Timer(()=> this.destroy(item), item.length, item);
      }

      let direction = this.reverse
        ? !this.botToTop
        : this.botToTop;

      let indexToDestroy = -1;

      const isDuplicate = this.active.some(item => {
        return item.title === event.title && item.text === event.text
      });

      const canAdd = ignoreDuplicates ? !isDuplicate : true;

      if (!canAdd) return;

      if (direction) {
        this.list.push(item);

        if (this.active.length > this.max) {
          indexToDestroy = 0;
        }
      } else {
        this.list.unshift(item);

        if (this.active.length > this.max) {
          indexToDestroy = this.active.length - 1;
        }
      }

      if (indexToDestroy !== -1) {
        this.destroy(this.active[indexToDestroy]);
      }
    },

    closeItem (id) {
      this.destroyById(id);
    },

    notifyClass (item) {
      return [
        'vue-notification-template',
        this.classes,
        item.type
      ]
    },

    notifyWrapperStyle (item) {
      return this.isVA
        ? null
        : { transition: `all ${item.speed}ms` }
    },

    destroy (item) {
      clearTimeout(item.timer);
      item.state = STATE.DESTROYED;

      if (!this.isVA) {
        this.clean();
      }

      this.$emit('destroy', item);
    },

    destroyById (id) {
      const item = this.list.find(v => v.id === id);

      if (item) {
        this.destroy(item);
      }
    },

    destroyAll () {
      this.active.forEach(this.destroy);
    },

    getAnimation (index, el) {
      const animation = this.animation[index];

      return typeof animation === 'function'
        ? animation.call(this, el)
        : animation
    },

    enter (el, complete) {
      if (!this.isVA) {
        complete();
        return;
      }
      const animation = this.getAnimation('enter', el);

      this.velocity(el, animation, {
        duration: this.speed,
        complete
      });
    },

    leave (el, complete) {
      if (!this.isVA) {
        complete();
        return;
      }
      let animation = this.getAnimation('leave', el);

      this.velocity(el, animation, {
        duration: this.speed,
        complete
      });
    },

    clean () {
      this.list = this.list.filter(v => v.state !== STATE.DESTROYED);
    }
  }
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("div", {
    class: "vue-notification-group",
    style: _ctx.styles
  }, [
    (openBlock(), createBlock(resolveDynamicComponent(_ctx.componentName), {
      name: _ctx.animationName,
      onEnter: _ctx.enter,
      onLeave: _ctx.leave,
      onAfterLeave: _ctx.clean
    }, {
      default: withCtx(() => [
        (openBlock(true), createBlock(Fragment, null, renderList(_ctx.active, (item) => {
          return (openBlock(), createBlock("div", {
            key: item.id,
            class: "vue-notification-wrapper",
            style: _ctx.notifyWrapperStyle(item),
            "data-id": item.id,
            onMouseenter: _cache[1] || (_cache[1] = (...args) => (_ctx.pauseTimeout && _ctx.pauseTimeout(...args))),
            onMouseleave: _cache[2] || (_cache[2] = (...args) => (_ctx.resumeTimeout && _ctx.resumeTimeout(...args)))
          }, [
            renderSlot(_ctx.$slots, "body", {
              class: [_ctx.classes, item.type],
              item: item,
              close: () => _ctx.destroy(item)
            }, () => [
              createCommentVNode(" Default slot template "),
              createVNode("div", {
                class: _ctx.notifyClass(item),
                onClick: $event => (_ctx.destroyIfNecessary(item))
              }, [
                (item.title)
                  ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "notification-title",
                      innerHTML: item.title
                    }, null, 8 /* PROPS */, ["innerHTML"]))
                  : createCommentVNode("v-if", true),
                createVNode("div", {
                  class: "notification-content",
                  innerHTML: item.text
                }, null, 8 /* PROPS */, ["innerHTML"])
              ], 10 /* CLASS, PROPS */, ["onClick"])
            ])
          ], 44 /* STYLE, PROPS, HYDRATE_EVENTS */, ["data-id"]))
        }), 128 /* KEYED_FRAGMENT */))
      ]),
      _: 3 /* FORWARDED */
    }, 8 /* PROPS */, ["name", "onEnter", "onLeave", "onAfterLeave"]))
  ], 4 /* STYLE */))
}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = "\n.vue-notification-group {\n  display: block;\n  position: fixed;\n  z-index: 5000;\n}\n.vue-notification-wrapper {\n  display: block;\n  overflow: hidden;\n  width: 100%;\n  margin: 0;\n  padding: 0;\n}\n.notification-title {\n  font-weight: 600;\n}\n.vue-notification-template {\n  display: block;\n  box-sizing: border-box;\n  background: white;\n  text-align: left;\n}\n.vue-notification {\n  display: block;\n  box-sizing: border-box;\n  text-align: left;\n  font-size: 12px;\n  padding: 10px;\n  margin: 0 5px 5px;\n\n  color: white;\n  background: #44A4FC;\n  border-left: 5px solid #187FE7;\n}\n.vue-notification.warn {\n  background: #ffb648;\n  border-left-color: #f48a06;\n}\n.vue-notification.error {\n  background: #E54D42;\n  border-left-color: #B82E24;\n}\n.vue-notification.success {\n  background: #68CD86;\n  border-left-color: #42A85F;\n}\n.vn-fade-enter-active, .vn-fade-leave-active, .vn-fade-move  {\n  transition: all .5s;\n}\n.vn-fade-enter-from, .vn-fade-leave-to {\n  opacity: 0;\n}\n\n";
styleInject(css_248z);

script.render = render;
script.__file = "src/Notifications.vue";

const notify = (params) => {
  if (typeof params === 'string') {
    params = { title: '', text: params };
  }

  if (typeof params === 'object') {
    events.emit('add', params);
  }
};

notify.close = function (id) {
  events.emit('close', id);
};

var index = {
  install: (app, args = {}) => {
    Object.entries(args).forEach((entry) => params.set(...entry));

    const name = args.name || 'notify';

    app.config.globalProperties['$' + name] = notify;

    app.component(args.componentName || 'notifications', script);
  }
};

export default index;
export { notify };
