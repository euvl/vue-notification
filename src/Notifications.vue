<template>
<div class="notifications" :style="styles">
  <transition-group :css="false"
                    @enter="enter"
                    @leave="leave"
                    @after-leave="afterLeave">
    <div class="notification-wrapper"
          v-for="item in list"
          v-if="item.state != 2"
          :key="item.id"
          :data-id="item.id">
      <slot name="body" :class="[classes, item.type]" :item="item" :close="() => destroy(item)">
        <div :class="['notification', classes, item.type]"
            @click="destroy(item)">

          <div v-if="item.title"
              class="notification-title"
              v-html="item.title"></div>

          <div class="notification-content"
              v-html="item.text"></div>

        </div>
      </slot>
    </div>
  </transition-group>
</div>
</template>
<script>
import Vue           from 'vue'
import Velocity      from 'velocity-animate'
import { events }    from './events'
import { Id, split } from './util'

const dirs = {
  x: ['left', 'center', 'right'],
  y: ['top', 'bottom']
}

const defaultPosition = 'top right'

const STATE = { idle: 0, destroying: 1, destroyed: 2 }

export default {
  name: 'Notify',
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
      default: defaultPosition
    },
    classes: {
      type: String,
      default: 'vue-notification'
    },
    animation: {
      type: Object,
      default() {
        return {
          enter (el) {
            var height = el.clientHeight

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
      }
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
        length: duration + speed
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
    styles() {
      let defaults = defaultPosition.split(' ')
      let x = defaults[0]
      let y = defaults[1]

      this.positionAsArray()
        .forEach(v => {
          if (dirs.y.indexOf(v) != -1) {
            y = v
          }
          if (dirs.x.indexOf(v) != -1) {
            x = v
          }
        })

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

    botToTop() {
      return this.styles.hasOwnProperty('bottom')
    }
  },
  methods: {
    getAnimation (index, el) {
      let anim = this.animation[index]

      return typeof anim === 'function'
        ? anim.call(this, el)
        : anim
    },

    destroy (note) {
      clearTimeout(note.timer)
      note.state = STATE.destroyed
    },

    enter (el, complete) {
      Velocity(el, this.getAnimation('enter', el), {
        duration: this.speed,
        complete
      })
    },

    leave (el, complete) {
      Velocity(el, this.getAnimation('leave', el), {
        duration: this.speed,
        complete
      })
    },

    afterLeave (el) {
      this.list = this.list
        .filter(v => v.state !== STATE.destroyed)
    },

    positionAsArray () {
      return typeof this.position === 'string'
        ? split(this.position)
        : this.position
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
</style>
