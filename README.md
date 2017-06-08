# Vue.js notifications

### Install

```
npm install --save vue-notification
```

### How to

In main.js:

```javascript
import Vue           from 'vue'
import Notifications from 'vue-notification'

Vue.use(Notifications)
```

In App.vue:

```vue
<notifications />
```

In any of your files:

```javascript

this.$notify({
  title: 'Important message',
  text: 'Hello user! This is a notification!'
});
```

### Props

`group` - (optional) name of the notification holder, if specified

`width` - (optional) tada

`classes` - (optional) list of classes that will be applied to notification element

`position` - (optional) part of the screen where notifications will pop out

`animation` - (optional) Velocity animation configuration

`duration` - (optional) How long notification stays on screen (if **negative** - notification will stay **forever** or until clicked)

`speed` - (optional) Speed of the animation

`delay` - todo :D

### API

```javascript
  this.$notify({
    // Name of the notification holder
    group: 'foo',

    // Class that will be assigned to the notification
    type: 'warning',

    // Title (will be wrapped in div.notification-title)
    title: 'This is title',

    // Content (will be wrapped in div.notification-content)
    text: 'This is <b> content </b>'
    
    // Overrides default/provided duration
    duration: 10000,
    
    // Overrides default/provided animation speed
    speed: 1000
  })
```

Title and Text can be HTML strings.

### Style

You can write your own css styles for notifications:

Structure:

```scss
// SCSS:

.notification.my-style {
  // Style of the notification itself

  .notification-title {
    // Style for title line
  }

  .notification-content {
    // Style for content
  }

  &.my-type {
    // Style for specific type of notification, will be applied when you
    // call notification with "type" parameter:
    // this.$notify({ type: 'my-type', message: 'Foo' })
  }
}
```
To apply this style you will have to specify "classes" property:

```vue
  <notifications classes="my-style"/>
```

**Default:**

Default

```scss
.vue-notification {
  padding: 10px;
  margin: 0 5px 5px;
  
  font-size: 12px;

  color: #ffffff;
  background: #44A4FC;
  border-left: 5px solid #187FE7;

  &.warn {
    background: #ffb648;
    border-left-color: #f48a06;
  }

  &.error {
    background: #E54D42;
    border-left-color: #B82E24;
  }

  &.success {
    background: #68CD86;
    border-left-color: #42A85F;
  }
}
```

### Animation

Library uses `Velocity` javascript animations, the format is:

```javascript
/*
 * Both 'enter' and 'leave' can be either an object or a function
 */
animation = {
  enter (element) {
     /*
      *  "element" - is a notification element 
      *    (before animation, meaning that you can take it's initial height, width, color, etc)
      */
     let height = element.clientHeight
     
     return {
       // Animates from 0px to "height"
       heigh: [height, 0],
       
       // Animates from initial color, to #0000ff
       backgroundColor: '#0000ff',
       
       // Animates from 0 to random opacity (in range between 0.5 and 1)
       opacity: [Math.random() * 0.5 + 0.5, 0]
     }  
  },
  leave: {
    height: 0,
    opacity: 0,
    backgroundColor: '#00ff00'
  }
}
```

```vue
<notifications animation="animation" />
```

The reason for using Velocity is that it gives more control over animating `Height` of the element which is important for this library
