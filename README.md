1. Incude "nice-notifications" component in your app/body.
```vue
<nice-notifications/>
```

2. In anyVue component call `this.$notify(params)` fuction to show notification.
```vue
this.$notify({
  ...
});
```

### Api

```
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
# SCSS:

.notification.my-style {
  # Style of the notification itself

  .notification-title {
    # Style for title line
  }

  .notification-content {
    # Style for content
  }


  &.my-type {
    # Style for specific type of notification, will be applied when you
    # call notification with "type" parameter:
    # this.$notify({ type: 'my-type', message: 'Foo' })
  }
}
```
To apply this style you will have to specify "classes" property:

```vue
  <notifications classes="my-style"/>
```
