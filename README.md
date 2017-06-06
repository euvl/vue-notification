# Vue.js notifications

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

`name` - (optional) name of the notification holder

`width` - (optional) tada

`classes` - (optional) list of classes that will be applied to notification element

### API

```javascript
  this.$notify({
    // Name of the notification holder
    // If multiple notification holders have the same name 
    // then they all will show this notification
    group: 'foo',
    
    // Class that will be assigned to the notification
    type: 'warning',
    
    // Title, will be wrapped in div.notification-title
    title: 'This is title',
    
    // Content, will be wrapped in div.notification-content
    text: 'This is <b> content </b>'
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
