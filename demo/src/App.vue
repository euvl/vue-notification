<template>
  <div id="app">
    <notifications group="foo" position="top left" />
    <notifications group="bar"
                   position="bottom right"
                   classes="custom" />
    <div class="content">
      <button @click="show('foo')">Show top left (basic)</button>
      <br>
      <button @click="show('bar')">Show top right (styled, animated)</button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'app',
  data () {
    return {
      id: 0
    }
  },
  methods: {
    show (group) {
      let title = `Test notification #${this.id++}`
      let text = `
        Random number: ${Math.random()}
        <br>
        Date: ${new Date()}
      `

      this.$notify({ group, title, text })
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

  font-size: 13px;
  padding: 10px;

  background: #FCFDFF;
  border: 1px solid #eaeefb;
  box-shadow: 0 0 4px 0 rgba(232, 237, 250, 0.6),
    0 2px 8px 0 rgba(232, 237, 250, 0.5);

  color: #8898A5;
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
