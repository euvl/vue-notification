<template>
  <transition-group
    tag="span"
    :css="false"
    @enter="enter"
    @leave="leave"
    @after-leave="afterLeave"
  >
    <slot />
  </transition-group>
</template>

<script>
import { defineComponent, TransitionGroup } from "vue"

export default defineComponent({
  name: 'Velocity-Group',
  components: {
    TransitionGroup,
  },
  emits: ['afterLeave', 'leave', 'enter'],
  methods: {
    enter (el, complete) {
      this.$emit('enter', { el, complete })
    },
    leave (el, complete) {
      this.$emit('leave', { el, complete })
    },
    afterLeave () {
      this.$emit('afterLeave')
    }
  }
})
</script>
