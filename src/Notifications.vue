<template>
<div class="notifications" :style="styles">
  <transition-group :css="!isVA"
                    :name="animationName"
                    @enter="isVA && velocityEnter"
                    @leave="isVA && velocityLeave"
                    @after-leave="isVA && clean">
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
          <div>
            {{item}}
          </div>
        </div>
      </slot>
    </div>
  </transition-group>
</div>
</template>
<script>
import Vue                            from 'vue'
import Plugin                         from './index'
import { events }                     from './events'
import { Id, split, listToDirection } from './util'

const defaultPosition = ['top', 'right']
const defaultCssAnimation = 'n-fade'
const defaultVelocityAnimation = {
  enter: (el) => {
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

const STATE = {
  idle: 0, 
  destroyed: 2
}

export default {
  name: 'Notifications',
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
        return defaultVelocityAnimation
      }
    },

    animationName: {
      type: String,
      default: 'vn-fade'
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
    /**
      * isVelocityAnimation
      */
    isVA () {
      return this.animationType === 'velocity'
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
  //      this.$nextTick(() => {
    /*    for (var i = 0; i < this.list.length; i++) {
          var obj = this.list[i]

          if(obj.id === item.id) {
            this.list.splice(i, 1)
            break
          }
        } */
      }
    },

    getAnimation (index, el) {
      let anim = this.animation[index]

      return typeof anim === 'function'
        ? anim.call(this, el)
        : anim
    },

    velocityEnter (el, complete) {
      let animation = this.getAnimation('enter', el)

      this.velocity(el, animation, {
        duration: this.speed,
         complete
      })
    },

    velocityLeave (el, complete) {
      let animation = this.getAnimation('leave', el)

      this.velocity(el, animation, {
        duration: this.speed,
        complete
      })
    },

    clean () {
      this.list = this.list.filter(v => v.state !== STATE.destroyed)
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

.vn-fade-left-enter-active, .vn-fade-left-leave-active, .vn-fade-left-move {
  transition: opacity .5s;
}

.vn-fade-left-enter, .vn-fade-left-leave-to {
  opacity: 0;
  transform: translateX(-300px);
}

</style>
