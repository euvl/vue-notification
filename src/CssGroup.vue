<template>
  <transition-group
    tag="span"
    :name="name"
  >
    <slot />
  </transition-group>
</template>
<script>
import { defineComponent, TransitionGroup } from "vue"

export default defineComponent({
  name: 'Css-Group',
  components: {
    TransitionGroup,
  },
  props: {
    name: { type: String, required: true },
  }
})
</script>
