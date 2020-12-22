<p align="right">
  <a href="https://www.buymeacoffee.com/yev" target="_blank">
  <img width="200" alt="screen shot 2018-03-01 at 10 33 39" src="https://user-images.githubusercontent.com/1577802/36840220-21beb89c-1d3c-11e8-98a4-45fc334842cf.png">
  </a>
</p>

[![npm version](https://badge.fury.io/js/vue-notification.svg)](https://badge.fury.io/js/vue-notification)
[![npm](https://img.shields.io/npm/dm/vue-notification.svg)](https://www.npmjs.com/package/vue-notification)

# Vue.js notifications

<p align="center">
  <img src="https://media.giphy.com/media/xUn3C6FmbGmszMem64/giphy.gif">
</p>

## Demo

View a live demo here:

- http://vue-notification.yev.io/

## Setup

Install via the command line:

```bash
npm install --save vue-notification
```

Add dependencies to your `main.js`:

```javascript
import Vue           from 'vue'
import Notifications from 'vue-notification'

/*
or for SSR:
import Notifications from 'vue-notification/dist/ssr.js'
*/

Vue.use(Notifications)
```

Add the global component to your `App.vue`:

```vue
<notifications/>
```

Trigger notifications from your `.vue` files:

```javascript
// simple
this.$notify('Hello user!')

// using options
this.$notify({
  title: 'Important message',
  text: 'Hello user!'
});
```

Or trigger notifications from other files, for example, your router:

```javascript
import Vue from 'vue'

Vue.notify({
  title: 'Authorization',
  text: 'You have been logged in!'
})
```

## Usage

### Component props

You configure the majority of settings for the Notifications component using props:

```vue
<notifications position="bottom right" classes="my-custom-class"/>
```

Note that all props are optional.

| Name             | Type          | Default            | Description                                                  |
| ---------------- | ------------- | ------------------ | ------------------------------------------------------------ |
| position         | String/Array  | 'top right'        | Part of the screen where notifications will pop out          |
| width            | Number/String | 300                | Width of notification holder, can be `%`, `px` string or number.<br>Valid values: '100%', '200px', 200 |
| classes          | String/Array  | 'vue-notification' | List of classes that will be applied to notification element |
| group            | String        | null               | Name of the notification holder, if specified                |
| duration         | Number        | 3000               | Time (in ms) to keep the notification on screen (if **negative** - notification will stay **forever** or until clicked) |
| speed            | Number        | 300                | Time (in ms) to show / hide notifications                    |
| animation-type   | String        | 'css'              | Type of animation, currently supported types are `css` and `velocity` |
| animation-name   | String        | null               | Animation name required for `css` animation                  |
| animation        | Object        | Custom             | Animation configuration for [Velocity](#Animation]) animation |
| max              | Number        | Infinity           | Maximum number of notifications that can be shown in notification holder |
| reverse          | Boolean       | false              | Show notifications in reverse order                          |
| ignoreDuplicates | Boolean       | false              | Ignore repeated instances of the same notification           |
| closeOnClick     | Boolean       | true               | Close notification when clicked                              |

### JavaScript API

You trigger notifications via the API:

```javascript
  this.$notify({
    // (optional)
    // Name of the notification holder
    group: 'foo',

    // (optional)
    // Title (will be wrapped in div.notification-title)
    title: 'This is the <em>title</em>',

    // Content (will be wrapped in div.notification-content)
    text: 'This is some <b>content</b>',

    // (optional)
    // Class that will be assigned to the notification
    type: 'warn',

    // (optional, override)
    // Time (in ms) to keep the notification on screen
    duration: 10000,

    // (optional, override)
    // Time (in ms) to show / hide notifications
    speed: 1000

    // (optional)
    // Data object that can be used in your template
    data: {}
  })
```

To remove notifications, include the `clean: true` parameter.

```javascript
this.$notify({
  group: 'foo', // clean only the foo group
  clean: true
})
```

### Plugin Options

You can configure the plugin itself with an additional options object:

```js
Vue.use(notifications, { name: 'alert' })
```

All options are optional:

| Name          | Type   | Default       | Description                                                  |
| ------------- | ------ | ------------- | ------------------------------------------------------------ |
| name          | String | notify        | Defines the instance name. It's prefixed with the dollar sign. E.g. `$notify` |
| componentName | String | notifications | The component's name                                         |

>  **Note**: setting `componentName` can cause issues when using SSR.

## Features

### Position

You can position the component on the screen, using the `position` prop:

```vue
<notifications position="bottom right"/>
```

It requires a `string` with **two keywords** for vertical and horizontal postion.

Format: `"<vertical> <horizontal>"`.

- Horizontal options: `left`, `center`, `right`
- Vertical options: `top`, `bottom`

Default is `"top right"`.

### Width

Width can be set using a `number` or `string` with optional `%` or `px` extensions:

```vue
<notifications :width="100"/>
<notifications width="100"/>
<notifications width="100%"/>
<notifications width="100px"/>
```

### Type

You can set the `type` of a notification (**warn**, **error**, **success**, etc) by adding a `type` property to the call:

```js
this.$notify({ type: 'success', text: 'The operation completed' })
```

This will add the `type` (i.e. "success") as a CSS class name to the `.vue-notification` element.

See the [Styling](#styling) section for how to hook onto the class and style the popup.

### Groups

If you require different classes of notifications, i.e...

- authentication errors (top center)
- app notifications (bottom-right)

...you can specify the `group` attribute:

```vue
<notifications group="auth" position="top"/>
<notifications group="app"  position="bottom right"/>
```

You can trigger a notification for a specific group by specifying it in the API call:

```javascript
this.$notify({ group: 'auth', text: 'Wrong password, please try again' })
```

## Customisation

### Styling

Vue Notifications comes with default styling, but it's easy to assign your own.

First, assign a the `classes` property to the component:

```vue
<notifications classes="my-style"/>
```

Then simply write your own css styles for notifications:

```scss
// scss
.my-style {
  // Style of the notification itself

  .notification-title {
    // Style for title line
  }

  .notification-content {
    // Style for content
  }

  &.my-type {
    /*
    Style for specific type of notification, will be applied when you
    call notification with "type" parameter:
    this.$notify({ type: 'my-type', message: 'Foo' })
    */
  }
}
```

Note that the default styling looks like this:

```scss
// scss
.vue-notification {
  // styling
  margin: 0 5px 5px;
  padding: 10px;
  font-size: 12px;
  color: #ffffff;
  
  // default (blue)
  background: #44A4FC;
  border-left: 5px solid #187FE7;

  // types (green, amber, red)
  &.success {
    background: #68CD86;
    border-left-color: #42A85F;
  }

  &.warn {
    background: #ffb648;
    border-left-color: #f48a06;
  }

  &.error {
    background: #E54D42;
    border-left-color: #B82E24;
  }
}
```

### Content

You can completely replace the content of the notifications by using Vue's slots system.

```vue
<notifications position="bottom right">
  <template slot="body" slot-scope="{ item, close }">
    <div>
      <p class="title">
        {{ item.title }}
      </p>
      <a class="close" @click="close">
        <i class="fa fa-fw fa-close"></i>
      </a>
      <div v-html="props.item.text"/>
    </div>
  </template>
</notifications>
```
The `props` object has the following members:

| Name  | Type     | Description                          |
| ----- | -------- | ------------------------------------ |
| item  | Object   | Notification object                  |
| close | Function | A function to close the notification |

<a name="velocity_animation"></a>

### Animation

Vue Notification can use the [Velocity](https://github.com/julianshapiro/velocity) library to power the animations using JavaScript.

To start using it you will have to manually install `velocity-animate` & pass the library to the  `vue-notification` plugin (the reason for doing that is to reduce the size of this plugin).

In your `main.js`:

```javascript
import Vue           from 'vue'
import Notifications from 'vue-notification'
import velocity      from 'velocity-animate'

Vue.use(Notifications, { velocity })
```

In the template you will have to set `animation-type="velocity"`.

```vue
<notifications animation-type="velocity"/>
```

The animation configuration consists of 2 objects/functions: `enter` and `leave`, which defaults to:

```js
{
  enter: { opacity: [1, 0] },
  leave: { opacity: [0, 1] }
}
```

You can also supply your own configuration, for example:

```javascript
computed: {
  animation () {
    return {
      /**
       * Animation function
       * 
       * Runs before animating, so you can take the initial height, width, color, etc
       * @param  {HTMLElement}  element  The notification element
       */
      enter (element) {
        let height = element.clientHeight
        return {
          // animates from 0px to "height"
          height: [height, 0],

          // animates from 0 to random opacity (in range between 0.5 and 1)
          opacity: [Math.random() * 0.5 + 0.5, 0]
        }
      },
      leave: {
        height: 0,
        opacity: 0
      }
    }
  }
}
```

Assign your custom configuration as a component prop:

```vue
<notifications animation-type="velocity" :animation="animation"/>
```

## FAQ

Check closed issues with `FAQ` label to get answers for most asked questions.

## Development

```bash
To run an example:

# Build main library

cd vue-notification
npm install
npm run build

# Build and run demo

cd demo
npm install
npm run dev

# Run tests
npm run test

# Watch unit tests
npm run unit:watch
```


