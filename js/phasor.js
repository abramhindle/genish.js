'use strict'

let gen  = require( './gen.js' ),
    accum= require( './accum.js' ),
    mul  = require( './mul.js' )

let proto = {
  basename:'phasor',

  gen() {
    let inputs = gen.getInputs( this ), out

    out = accum( mul( inputs[0], 1/44100 ), inputs[1] ).gen()

    gen.memo[ this.name ] = out[0]

    return out
  }

}

module.exports = ( frequency=1, reset=0 ) => {
  let ugen = Object.create( proto )

  Object.assign( ugen, { 
    frequency,
    uid:    gen.getUID(),
    inputs: [ frequency, reset ],
    properties: [ 'frequency','reset' ],
  })
  
  ugen.name = `${ugen.basename}${ugen.uid}`

  return ugen
}
