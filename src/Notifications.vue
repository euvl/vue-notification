<template>
<div class="notifications" :style="styles">
  <component :is="componentName"
             :name="animationName"
             @enter="enter"
             @leave="leave"
             @after-leave="clean">
    <div class="notification-wrapper"
         v-for="item in list"
         v-if="item.state != 2"
         :style="nwStyle(item)"
         :key="item.id"
         :data-id="item.id">
      <slot name="body"
            :class="[classes, item.type]"
            :item="item"
            :close="() => destroy(item)">
        <div :class="nСlass(item)"
             @click="destroy(item)">
          <div v-if="item.title"
               class="notification-title"
               v-html="item.title"></div>
          <div class="notification-content"
               v-html="item.text"></div>
        </div>
      </slot>
    </div>
  </component>
</div>
</template>
<script>
import Vue                            from 'vue'
import Plugin                         from './index'
import { events }                     from './events'
import { Id, split, listToDirection } from './util'
import defaults                       from './defaults'
import VelocityGroup                  from './VelocityGroup.vue'
import CssGroup                       from './CssGroup.vue'

const STATE = {
  idle: 0, 
  destroyed: 2
}

export default {
  name: 'Notifications',
  components: {
    VelocityGroup,
    CssGroup
  },
  props: {
    group: {
      type: String
    },

    width: {
      type: Number,
      default: 300
    },

    reverse: {
      type: Boolean,
      default: false
    },

    position: {
      type: String,
      default: defaults.position
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

    duration: {
      type: Number,
      default: 3000
    },

    delay: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      velocity: Plugin.params.velocity,
      list: []
    }
  },
  created () {
    events.$on('add', event => {
      if (this.group && this.group !== event.group) {
        return
      }

      let duration = typeof event.duration === 'number'
        ? event.duration
        : this.duration

      let speed = typeof event.speed === 'number'
        ? event.speed
        : this.speed

      let { title, text, type } = event

      const item = {
        id: Id(),
        title,
        text,
        type,
        state: STATE.idle,
        speed,
        length: duration + 2 * speed
      }

      if (duration >= 0) {
        item.timer = setTimeout(() => {
          this.destroy(item)
        }, item.length)
      }

      let direction = this.reverse
        ? !this.botToTop
        : this.botToTop

      if (direction) {
        this.list.push(item)
      } else {
        this.list.unshift(item)
      }
    })
  },
  computed: {
    /**
      * isVelocityAnimation
      */
    isVA () {
      return this.animationType === 'velocity'
    },

    componentName () {
      return this.isVA ? 'VelocityGroup' : 'CssGroup'
    },

    styles () {
      let { x, y } = listToDirection(this.position)

      let styles = {
        width: `${this.width}px`,
        [y]: '0px'
      }

      if (x === 'center') {
        styles['left'] = `calc(50% - ${this.width/2}px)`
      } else {
        styles[x] = '0px'
      }

      return styles
    },

    botToTop () {
      return this.styles.hasOwnProperty('bottom')
    }
  },
  methods: {
    nСlass (item) {
      return [
        'notification',
        this.classes,
        item.type
      ]
    },

    nwStyle (item) {
      return this.isVA
        ? null
        : {
            transition: `all ${item.speed}ms`
          }
    },

    destroy (item) {
      clearTimeout(item.timer)
      item.state = STATE.destroyed

      if (!this.isVA) {
        this.clean()
      } 
    },

    getAnimation (index, el) {
      let anim = this.animation[index]

      return typeof anim === 'function'
        ? anim.call(this, el)
        : anim
    },

    enter ({ el, complete }) {
      let animation = this.getAnimation('enter', el)

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
      this.list = this.list
        .filter(v => v.state !== STATE.destroyed)
    }
  }
}
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
