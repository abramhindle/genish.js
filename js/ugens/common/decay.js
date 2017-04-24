'use strict'

let gen     = require( './gen.js' ),
    history = require( '../target/history.js' ),
    mul     = require( '../target/mul.js' ),
    t60     = require( '../target/t60.js' )

module.exports = ( decayTime = 44100, props ) => {
  let properties = Object.assign({}, { initValue:1 }, props ),
      ssd = history ( properties.initValue )

  ssd.in( mul( ssd.out, t60( decayTime ) ) )

  ssd.out.trigger = ()=> {
    ssd.value = 1
  }

  return ssd.out 
}