<template>
  <div>
    <transition-group :name="name"
                      :css="!isVelocity"
                      @enter="enter"
                      @leave="leave"
                      @after-leave="afterLeave">
      <slot/>
    </transition-group>
</template>
<script>
  import Plugin from './index'

  export default {
    name: 'AnimationGroup',
    props: {
      animationType: {
        type: String
      },
      name: {
        type: String
      }
    },
    computed: {
      isVelocity () {
        return this.animationType === 'velocity'
      }
    }
    methods: {

    }
  }
</script>