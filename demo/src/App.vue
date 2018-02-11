<template>
  <div id="app">
    <h2>Vue.js Notification
      <br>
      <a href="https://github.com/euvl/vue-notification/blob/master/README.md"
         target="readme">Readme</a>
      <a href="https://github.com/euvl/vue-notification/"
         target="issues">Github</a>
    </h2>
    <!-- CSS animation example -->
    <notifications group="foo-css"
                   position="bottom left"
                   :speed="500" />

    <!-- Velocity animation example -->
    <notifications group="foo-velocity"
                   position="bottom right"
                   animation-type="velocity"
                   :speed="500" />

    <!-- Custom style example -->
    <notifications group="custom-style"
                   position="top center"
                   classes="n-light"
                   :max="3"
                   :width="400"/>

    <!-- Custom template example -->
    <notifications group="custom-template"
                   :duration="5000"
                   :width="500"
                   animation-name="v-fade-left"
                   position="top left">

       <template slot="body" slot-scope="props">
        <div class="custom-template">
          <div class="custom-template-icon">
            <i class="icon ion-android-checkmark-circle"></i>
          </div>
          <div class="custom-template-content">
            <div class="custom-template-title">
              {{props.item.title}}

              <p>
                Random number: {{props.item.data.randomNumber}}
              </p>
            </div>
            <div class="custom-template-text"
                 v-html="props.item.text"></div>
          </div>
          <div class="custom-template-close"
               @click="props.close">
            <i class="icon ion-android-close"></i>
          </div>
        </div>
      </template>
    </notifications>

    <!-- Full width example -->
    <notifications group="full-width"
                   width="100%" />

    <div class="content">
      <p>
        CSS animation:
      </p>
      <div>
        <button class="success"
                style="width: 30%"
                @click="show('foo-css', 'success')">
          <i class="icon ion-information-circled"/>
          SUCCESS
        </button>
        <button class="warn"
                style="width: 30%"
                @click="show('foo-css', 'warn')">
          <i class="icon ion-alert-circled"/>
          WARNING
        </button>
        <button class="error"
                style="width: 30%"
                @click="show('foo-css', 'error')">
          <i class="icon ion-close-circled"/>
          ERROR
        </button>
      </div>

      <div style="padding-top: 10px"></div>

      <p>
        Velocity animation:
      </p>

      <div>
        <button class="success"
                style="width: 30%"
                @click="show('foo-velocity', 'success')">
          <i class="icon ion-information-circled"/>
          SUCCESS
        </button>
        <button class="warn"
                style="width: 30%"
                @click="show('foo-velocity', 'warn')">
          <i class="icon ion-alert-circled"/>
          WARNING
        </button>
        <button class="error"
                style="width: 30%"
                @click="show('foo-velocity', 'error')">
          <i class="icon ion-close-circled"/>
          ERROR
        </button>
      </div>
      <div style="padding-top: 20px">
        <p>Custom style:</p>
        <button @click="show('custom-style')">
          top center (max=3)
        </button>
        <p>Custom template:</p>
        <button @click="show('custom-template')">
          show top left
        </button>
        <p></p>
        <button @click="clean('custom-template')">
          <u>clean all</u> top left
        </button>
        <p></p>
        <button @click="show('full-width')">
          show bottom (full width)
        </button>
      </div>
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
      const text = `
        This is notification text!
        <br>
        Date: ${new Date()}
      `

      this.$notify({
        group,
        title: `Test ${type} notification #${this.id++}`,
        text,
        type,
        data: {
          randomNumber: Math.random()
        }
      })
    },

    clean (group) {
      this.$notify({ group, clean: true })
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
  padding-top: 80px;
  margin: 0;

  h2 {
    font-weight: 300;

    a {
      color: black;
      font-size: 12px;
    }
  }

  button {
    display: inline-block;
    box-sizing: border-box;

    border: 0;
    border-radius: 3px;
    color: white;
    vertical-align: top;
    text-decoration: none;
    font-size: 12px;
    font-family: inherit;
    cursor: pointer;

    outline: none;


    transition: all 500ms;
    padding: 12px;
    box-shadow: none;
    background: #02ccba;
    font-weight: 600;
    width: 100%;

    letter-spacing: 1px;
    box-shadow: 0 5px 15px 0px rgba(46,61,73,0.1);

    &.success {
      background: #68CD86;
    }

    &.warn {
      background: #ffb648;
    }

    &.error {
      background: #E54D42;
    }

    &:active {
      opacity: 0.8;
    }
  }

  #app {
    text-align: center;
    color: #2c3e50;

    .content {
      margin: 0 auto;
      max-width: 420px;
    }
  }
}

.sub-button {
  display: inline-block;
  float: right;
  background: #E54D42;
  padding: 4px;
  box-shadow: 0 5px 15px 0px rgba(46, 61, 73, 0.1);
}

/*
  EXAMPLES
*/

.notification.n-light {
  margin: 10px;
  margin-bottom: 0;

  border-radius: 3px;
  font-size: 13px;

  padding: 10px 20px;

  color: #495061;
  background: #EAF4FE;

  border: 1px solid #D4E8FD;

  .notification-title {
    letter-spacing: 1px;
    text-transform: uppercase;
    font-size: 10px;
    color: #2589F3;
  }
}

.custom-template {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;

  text-align: left;
  font-size: 13px;
  margin: 5px;
  margin-bottom: 0;
  align-items: center;
  justify-content: center;

  &, & > div {
    box-sizing: border-box;
  }

  background: #E8F9F0;
  border: 2px solid #D0F2E1;


  .custom-template-icon {
    flex: 0 1 auto;
    color: #15C371;
    font-size: 32px;
    padding: 0 10px;
  }

  .custom-template-close {
    flex: 0 1 auto;
    padding: 0 20px;
    font-size: 16px;
    opacity: 0.2;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }

  .custom-template-content {
    padding: 10px;
    flex: 1 0 auto;

    .custom-template-title {
      letter-spacing: 1px;
      text-transform: uppercase;
      font-size: 10px;
      font-weight: 600;
    }
  }
}

.v-fade-left-enter-active,
.v-fade-left-leave-active,
.v-fade-left-move {
  transition: all .5s;
}

.v-fade-left-enter,
.v-fade-left-leave-to {
  opacity: 0;
  transform: translateX(-500px) scale(0.2);
}

</style>
