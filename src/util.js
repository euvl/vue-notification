const directions = {
  x: ['left', 'center', 'right'],
  y: ['top', 'bottom']
}

/**
  * Sequential ID generator
  */
export const Id = (i => () => i++)(0)

/**
  * Splits space/tab separated string into array and cleans empty string items.
  */
export const split = (value) => {
  if (typeof value !== 'string') {
    return []
  }

  return value.split(/\s+/gi).filter(v => v)
}

/**
  * Cleanes and transforms string of format "x y" into object {x, y}. 
  * Possible combinations:
  *   x - left, center, right
  *   y - top, bottom
  */
export const listToDirection = (value) => {
  if (typeof value === 'string') {
    value = split(value)
  }

  let x = null
  let y = null

  value.forEach(v => {
    if (directions.y.indexOf(v) !== -1) {
      y = v
    }
    if (directions.x.indexOf(v) !== -1) {
      x = v
    }
  })

  return { x, y }
}