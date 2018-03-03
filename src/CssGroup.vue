<template>
  <transition-group :name="name">
    <slot/>
  </transition-group>
</template>
<script>
export default {
  name: 'CssGroup',
  props: ['name']
}
</script>
