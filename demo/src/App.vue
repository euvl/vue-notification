<template>
  <div id="app">
    <h2>Vue.js Notification
      <br>
      <a href="https://github.com/euvl/vue-notification/blob/master/README.md" target="readme">Readme</a>
      <a href="https://github.com/euvl/vue-notification/" target="issues">Github</a>
    </h2>
    <notifications group="foo" position="bottom left" :speed="500" />
    <notifications group="bar"
                   position="top right"
                   classes="custom" />
    <notifications group="baz"
                   :animation="animation"
                   :reverse="true"
                   position="top left" />
    <notifications group="custom-template"
                   :animation="animation"
                   :reverse="true"
                   position="bottom right">
       <template slot="body" scope="props">
        <div class="container">
            <a class="title">{{props.item.title}}</a>
            <a class="close" @click="props.close">x</a>
            <div v-html="props.item.text">
            </div>
        </div>
      </template>
    </notifications>
    <div class="content">
      <button @click="show('foo')">Show bottom left GENERAL</button>
      <button @click="show('foo', 'warn')">Show bottom left WARNING</button>
      <button @click="show('foo', 'error')">Show bottom left ERROR</button>
      <br>
      <br>
      <button @click="show('bar')">Show top right</button>
      <br>
      <button @click="show('baz')">Show top left</button>
      <br>
      <button @click="show('custom-template')">Show bottom right</button>
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
          opacity: 0,
          height: 0
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
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  padding: 0;
  padding-top: 100px;
  margin: 0;

  h2 {
    font-weight: 300;

    a {
      color: black;
      font-size: 12px;
    }
  }

  button {
    width: 100%;
  }

  #app {
    text-align: center;
    color: #2c3e50;

    .content {
      margin: 0 auto;
      max-width: 300px;
    }
  }
}

.notification.custom {
  margin: 5px;
  margin-bottom: 5px;

  border-radius: 5px;

  font-size: 13px;
  padding: 10px;

  color: #5A6B81;
  border-bottom: 2px solid rgba(#474748, 0.1);
  background: #E5EBF1;

  & .notification-title {
    font-weight: 600;
  }
}

.container {
  background: red;

  a.title {
    color: blue;
    text-decoration: underline;
    cursor: pointer;
  }

  a.close {
    cursor: pointer;
    position: absolute;
    right: 0px;
  }

  div {
    background: yellow;
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
