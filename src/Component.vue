<template>
<div class="v--notifications" :style="styles">
  <transition-group :name="transition" mode="out-in">
    <div class="notification-wrapper"
          v-for="(item, index) in list"
          :data-id="item.id"
          :key="item.id">
      <div :class="['notification', classes, item.type]"
           @click.stop="destroy(item)">
        <div v-if="item.title"
             class="notification-title"
             v-html="item.title"></div>
        <div class="notification-content"
             v-html="item.text"></div>
      </div>
    </div>
  </transition-group>
</div>
</template>
<script>
import Vue from 'vue';
import Plugin from './index'

const VERT_OPTIONS = ['top', 'bottom'];
const HORIZ_OPTIONS = ['left', 'center', 'right'];
const STATE = {idle: 0, destroying: 1, destroyed: 2};
const ID = (i => () => i++)(0);

const DIR = {
  x: ['left', 'center', 'right'],
  y: ['top', 'bottom']
}

var asNumber = (value, def) => typeof value === 'number'
  ? value
  : def

export default {
  name: 'Notifications',
  props: {
    name: {
      type: String
    },
    position: {
      type: [String, Array],
      default: 'top right',
      validator (value) {
        if (typeof value === 'string') {
          return value.split(/\s+/gi).length < 3
        }

        if (typeof value === 'object') {
          return value.length < 3
        }

        return false
      }
    },
    classes: {
      type: String,
      default: 'default-style'
    },
    width: {
      type: Number,
      default: 300
    },
    transition: {
      type: String
    },
    reverse: {
      type: Boolean,
      default: false
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
  data() {
    return {
      list: []
    }
  },
  created() {
    Plugin.events.$on('add', event => {
      if (event.group !== this.name) {
        return;
      }

      var duration = asNumber(event.duration, this.duration)
      var speed = asNumber(event.speed, this.speed)

      var item = {
        id: ID(),
        state: STATE.idle,
        title: event.title,
        text: event.text || '',
        type: event.type || null,
        length: duration + speed
      };

      if (duration >= 0) {
        item.timer = setTimeout(() => {
          this.destroy(item);
        }, item.length);
      }

      this.botToTop
        ? this.list.push(item)
        : this.list.unshift(item);
    });
  },
  computed: {
    styles() {
  //    var position = [];
      var styles = {
         width: this.width + 'px'
      };

      this.positionArray.forEach(v => {
        if (DIR.y.indexOf(v) != -1 || DIR.x.indexOf(v) != -1) styles[v] = 0;
      });

      return styles
    },

    botToTop() {
      return this.styles.hasOwnProperty('bottom');
    },

    positionArray() {
      return typeof this.position === 'object'
       ? this.position
       : this.position.split(/\s+/gi).filter(v => v)
    }
  },
  methods: {
    destroy(note) {
      clearTimeout(note.timer);
      note.state = STATE.destroyed;
      this.list = this.list.filter(v => v.state !== STATE.destroyed);
    }
  }
}
</script>
<style lang="scss">
.v--notifications {
  display: block;
  position: fixed;
  width: 300px;
  z-index: 2000;
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
  text-align: left;
  background: white;
}

.notification.style-default {
  font-size: 12px;
  padding: 10px;
  background: #44A4FC;
  color: white;
}

.notification.style-one {
  margin: 5px;
  margin-bottom: 5px;

  border-left: 5px solid #187FE7;
  font-size: 12px;
  padding: 10px;
  background: #44A4FC;
  color: white;

  & .notification-title {
    font-weight: 600;
  }

  &.warn {
    background: #ffb648;
    border-left: 5px solid #f48a06;
    color: white;
  }

  &.error {
    background: #E54D42;
    border-left: 5px solid #B82E24;
    color: white;
  }

  &.success {
    background: #68CD86;
    border-left: 5px solid #42A85F;
    color: white;
  }
}
</style>
