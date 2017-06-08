<template>
  <div id="app">
    <notifications group="foo" position="bottom left" :speed="500" />
    <notifications group="bar"
                   position="bottom right"
                   classes="custom" />
    <notifications group="baz"
                   :animation="animation"
                   position="top left" />
    <div class="content">
      <button @click="show('foo')">Show bottom left GENERAL</button>
      <button @click="show('foo', 'warn')">Show bottom left WARNING</button>
      <button @click="show('foo', 'error')">Show bottom left ERROR</button>
      <br>
      <br>
      <button @click="show('bar')">Show bottom right</button>
      <br>
      <button @click="show('baz')">Show top left</button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'app',
  data () {
    return {
      id: 0,
      animation: {
        enter: {
          opacity: [1, 0],
          translateX: [0, -300],
          scale: [1, 0.2]
        },
        leave: {
          opacity: 0
        }
      }
    }
  },
  methods: {
    show (group, type = '') {
      let title = `Test ${type} notification #${this.id++}`
      let now = new Date()
      let text = `This is notification text!<br>Date: ${now}`

      this.$notify({ group, title, text, type })
    }
  }
}
</script>

<style lang="scss">
body {
  padding: 0;
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 100px;

  .content {
    margin: 0 auto;
    width: 300px;

    button {
      width: 100%;
    }
  }
}

.notification.custom {
  margin: 5px;
  margin-bottom: 5px;

  border-radius: 5px;

  font-size: 13px;
  padding: 10px;

  color: #FCFDFF;
  //border: 1px solid #eaeefb;
  box-shadow: 0 2px 3px 0 rgba(#000000, 0.2);
  background: #FF8D68;
  // font-weight: 600;

  & .notification-title {
    font-weight: 600;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.3s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
