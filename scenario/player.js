import Device from './device.js';
import Note from './note.js';

export default class Player extends Device {

constructor ( details ) {

super ();

this .details = details = Object .assign ( Object .create ( details ), { player: this, instance: 0 } );

this .code = details .code = [];
this .number = details .number = details .players .push ( this ) + 1;

};

$note = Note;

$_producer () {

this .details .parameters = this .parameters

let { parameters, header, body, mix } = this;
const { code, number } = this;

if ( typeof header === 'string' && ( header = header .trim () ) .length )
code .push ( header );

code .push ( `instr ${ number }` );

if ( mix !== false && typeof parameters === 'object' )
parameters = Object .assign ( parameters, { amplitude: '1/4' } );

if ( typeof parameters === 'object' && Object .keys ( parameters ) .length )
code .push (

Object .entries ( parameters ) .map (

( [ control, value ], index ) => `${ isNaN ( value .toString () [ 0 ] ) ? 'S' : 'i' }P${ control [ 0 ] .toUpperCase () + control .slice ( 1 ) } init p ( ${ index + 4 } )`

) .join ( '\n' ),

`schedule p1, giMeasure, p3, ${ Object .keys ( parameters ) .map (

( _, index ) => `p${ index + 4 }`

) .join ( ', ' ) }`

);

if ( typeof body === 'string' && ( body = body .trim () ) .length )
code .push ( body );

if ( mix !== false )
code .push ( `

aNote clip aNote, 1, 0dbfs

gaNote = gaNote + aNote * iPAmplitude

` .trim () );

code .push ( 'endin' );

};

$code () { return this .code .join ( '\n\n' ) };

$number () { return this .number };

async $_director ( _, ... argv ) {

if ( ! argv .length )
return;

if ( typeof argv [ 0 ] === 'symbol' )
return;

const { score, instrument } = this .details;

await _ .play ( Symbol .for ( 'parameter' ), 'duration', argv .shift () );

score .push ( [

`i "${ instrument }"`,
this .playing !== true ? ( this .playing = true, 0 ) : '+',
`[${ this .duration }]`,
`[${ this .duration }]`,
`[ $key + ${ this .detune }]`

] .join ( ' ' ) );

return _ .play ( _, ... argv );

};

};
