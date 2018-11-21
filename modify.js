const config = require('config')
const tilebelt = require('@mapbox/tilebelt')
const bbox = require('@turf/bbox').default

const w3n = config.get('w3n')
const [z, x, y] = w3n.split('-').map(v => parseInt(v))
const tile = tilebelt.tileToBBOX([x, y, z])

const isInTile = (bbox) => {
  return 
    tile[0] <= bbox[2] &&
    tile[1] <= bbox[3] &&
    tile[2] >= bbox[0] &&
    tile[3] >= bbox[1]
}

module.exports = (f) => {
  if (isInTile(bbox(f))) {
    return f
  } else {
    return null
  }
}
