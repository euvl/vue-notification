export default {
  position: ['top', 'right'],
  cssAnimation: 'n-fade',
  velocityAnimation = {
    enter: (el) => {
      var height = el.clientHeight

      return {
        height: [height, 0],
         opacity: [1, 0]
      }
    },
    leave: {
      height: 0,
      opacity: [0, 1]
    }
  }
}