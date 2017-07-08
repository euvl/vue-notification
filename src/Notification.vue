<template>
  <div class="notification-wrapper"
          v-if="content.state != 2"
          :key="content.id"
          :data-id="content.id">
    <slot name="body" 
          :class="[classes, content.type]" 
          :content="content" 
          :close="() => destroy(content)">
      <div :class="['notification', classes, content.type]"
           @click="destroy(content)">

        <div v-if="content.title"
             class="notification-title"
             v-html="content.title"></div>

        <div class="notification-content"
             v-html="content.text"></div>
      </div>
    </slot>
  </div>
</template>
<script>
  export default {
    name: 'Notification',
    props: {
      classes: {
        type: String
      },
      content: {
        type: Object,
        required: true
      }
    },
    methods: {
      destroy () {
        this.$emit('destroy', this.content.id)
      }
    }
  }
</script>