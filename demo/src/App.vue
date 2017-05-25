<template>
  <div id="app">
    <notifications name="foo" position="top left" classes="style-default" />
    <notifications name="bar" position="top right" classes="style-one" />
    <notifications name="yaz"
                   position="bottom right"
                   transition="fade"
                   classes="style-two" />
    <div class="content">
      <button @click="show('foo')">Show top left (basic)</button>
      <button @click="show('bar')">Show top right (styled)</button>
      <br>
      <button @click="show('yaz')">Show top right (styled, animated)</button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'app',
  methods: {
    show (group) {
      let now = new Date()
      let number = Math.random()

      this.$notify({
        group: group,
        title: 'Test notification',
        text: `${number}<br>${now}`
      })
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
}

.notification.style-two {
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
