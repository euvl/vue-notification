### How to

In main.js:

```javascript
import Vue from 'vue'
import VN  from 'vue-notification'

Vue.use(VN)
```

In App.vue:

```vue
<notifications />
```

In any of your files:

```javascript

this.$notify({
  title: 'Inportant message',
  text: 'Hello user! This is a notification!'
});
```

### Props

`todo`

### API

`todo`

```javascript
  this.$notify({
    group: 'foo',
    type: 'warning',
    title: 'This is title',
    text: 'This is <b> content </b>'
  })
```

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
