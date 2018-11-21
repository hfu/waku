const config = require('config')
const modify = require('./modify.js')
const fs = require('fs')
const es = require('event-stream')

const s = fs.createReadStream(
  config.get('src'), 
  { encoding: config.get('encoding') }
)
  .pipe(es.split())
  .pipe(es.mapSync(line => {
    s.pause()
    f = modify(JSON.parse(line))
    if (f) console.log(f)
    s.resume()
  })
  .on('error', err => {
    console.log(err)
  })
  .on('end', () => {
    console.log('end')
  })
)

