<template>
<div
  class="notifications"
  :style="styles"
>
  <component
    :is="componentName"
    :name="animationName"
    @enter="enter"
    @leave="leave"
    @after-leave="clean"
  >
    <div
      v-for="item in list"
      v-if="item.state != 2"
      class="notification-wrapper"
      :style="notifyWrapperStyle(item)"
      :key="item.id"
      :data-id="item.id"
    >
      <slot
        name="body"
        :class="[classes, item.type]"
        :item="item"
        :close="() => destroy(item)"
      >
        <!-- Default slot template -->
        <div
          :class="notifyClass(item)"
          @click="destroy(item)"
        >
          <div
            v-if="item.title"
            class="notification-title"
            v-html="item.title"
          >
          </div>
          <div
            class="notification-content"
            v-html="item.text"
          >
          </div>
        </div>
      </slot>
    </div>
  </component>
</div>
</template>
<script>
import plugin                         from './index'
import { events }                     from './events'
import { Id, split, listToDirection } from './util'
import defaults                       from './defaults'
import VelocityGroup                  from './VelocityGroup.vue'
import CssGroup                       from './CssGroup.vue'
import parseNumericValue              from './parser'

const STATE = {
  IDLE: 0,
  DESTROYED: 2
}

const Component = {
  name: 'Notifications',
  components: {
    VelocityGroup,
    CssGroup
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
    }
  },
  data () {
    return {
      list: [],
      velocity: plugin.params.velocity
    }
  },
  mounted () {
    events.$on('add', this.addItem);
  },
  computed: {
    actualWidth () {
      return parseNumericValue(this.width)
    },
    /**
      * isVelocityAnimation
      */
    isVA () {
      return this.animationType === 'velocity'
    },

    componentName () {
      return this.isVA
        ? 'VelocityGroup'
        : 'CssGroup'
    },

    styles () {
      const { x, y } = listToDirection(this.position)
      const width = this.actualWidth.value
      const suffix = this.actualWidth.type

      let styles = {
        width: width + suffix,
        [y]: '0px'
      }

      if (x === 'center') {
        styles['left'] = `calc(50% - ${width/2}${suffix})`
      } else {
        styles[x] = '0px'
      }

      return styles
    },

    active () {
      return this.list.filter(v => v.state !== STATE.DESTROYED)
    },

    botToTop () {
      return this.styles.hasOwnProperty('bottom')
    }
  },
  methods: {
    addItem (event) {
      event.group = event.group || ''

      if (this.group !== event.group) {
        return
      }

      if (event.clean || event.clear) {
        this.destroyAll()
        return
      }

      const duration = typeof event.duration === 'number'
        ? event.duration
        : this.duration

      const speed = typeof event.speed === 'number'
        ? event.speed
        : this.speed

      let { title, text, type, data } = event

      const item = {
        id: Id(),
        title,
        text,
        type,
        state: STATE.IDLE,
        speed,
        length: duration + 2 * speed,
        data
      }

      if (duration >= 0) {
        item.timer = setTimeout(() => {
          this.destroy(item)
        }, item.length)
      }

      let direction = this.reverse
        ? !this.botToTop
        : this.botToTop

      let indexToDestroy = -1

      if (direction) {
        this.list.push(item)

        if (this.active.length > this.max) {
          indexToDestroy = 0
        }
      } else {
        this.list.unshift(item)

        if (this.active.length > this.max) {
          indexToDestroy = this.active.length - 1
        }
      }

      if (indexToDestroy !== -1) {
        this.destroy(this.active[indexToDestroy])
      }
    },

    notifyClass (item) {
      return [
        'notification',
        this.classes,
        item.type
      ]
    },

    notifyWrapperStyle (item) {
      return this.isVA
        ? null
        : {
            transition: `all ${item.speed}ms`
          }
    },

    destroy (item) {
      clearTimeout(item.timer)
      item.state = STATE.DESTROYED

      if (!this.isVA) {
        this.clean()
      }
    },

    destroyAll () {
      this.active.forEach(this.destroy)
    },

    getAnimation (index, el) {
      const animation = this.animation[index]

      return typeof animation === 'function'
        ? animation.call(this, el)
        : animation
    },

    enter ({ el, complete }) {
      const animation = this.getAnimation('enter', el)

      this.velocity(el, animation, {
        duration: this.speed,
        complete
      })
    },

    leave ({ el, complete }) {
      let animation = this.getAnimation('leave', el)

      this.velocity(el, animation, {
        duration: this.speed,
        complete
      })
    },

    clean () {
      this.list = this.list.filter(v => v.state !== STATE.DESTROYED)
    }
  }
}

export default Component
</script>
<style>
.notifications {
  display: block;
  position: fixed;
  z-index: 5000;
}

.notification-wrapper {
  display: block;
  overflow: hidden;
  width: 100%;
  margin: 0;
  padding: 0;
}

.notification {
  display: block;
  box-sizing: border-box;
  background: white;
  text-align: left;
}

.notification-title {
  font-weight: 600;
}

.vue-notification {
  font-size: 12px;
  padding: 10px;
  margin: 0 5px 5px;

  color: white;
  background: #44A4FC;
  border-left: 5px solid #187FE7;
}

.vue-notification.warn {
  background: #ffb648;
  border-left-color: #f48a06;
}

.vue-notification.error {
  background: #E54D42;
  border-left-color: #B82E24;
}

.vue-notification.success {
  background: #68CD86;
  border-left-color: #42A85F;
}

.vn-fade-enter-active, .vn-fade-leave-active, .vn-fade-move  {
  transition: all .5s;
}

.vn-fade-enter, .vn-fade-leave-to {
  opacity: 0;
}

</style>
