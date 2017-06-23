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
                   :duration="4000"
                   :reverse="true"
                   position="bottom center">
       <template slot="body" scope="props">
        <div class="container">
            <div class="title">
              <a href="http://google.com">{{props.item.title}}</a>
            </div>
            <div class="content" v-html="props.item.text">
            </div>
            <div class="close" @click="props.close">x</div>
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
      <button @click="show('custom-template')">Show bottom center</button>
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
  position: relative;
  margin: 0px 10px 10px;
  background: #EAE7ED;

  .title {
    font-size: 12px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 2px;

    cursor: pointer;

    background: #004A7C;

    padding-top: 8px;
    padding-bottom: 8px;

    a {
      color: white;
    }
  }

  .close {
    width: 20px;
    height: 20px;
    line-height: 20px;

    top: 5px;
    right: 5px;

    cursor: pointer;
    color: red;

    font-weight: 900;

    border-radius: 4px;

    background: red;
    color: white;
    position: absolute;

  }

  .content {
    font-size: 14px;
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
