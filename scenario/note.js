import Controller from './controller.js';
import Chord from './chord.js';

export default class Note extends Controller {

$chord = new Chord;

constructor ( details ) {

super ( details );

this .number = details .number;
this .instance = details .instance = ++details .instance % 10 === 0 ? ++details .instance : details .instance;

};

$number () { return [ this .number, this .instance ] .join ( '.' ) };

async $_director ( _, ... argv ) {

const { play: $ } = _;

if ( ! argv .length )
return super .$_director ( _ );

const step = argv .shift () || '0';
const length = argv .shift () || '1';
const chord = await $ ( 'chord', 'notes' );
const delay = await $ ( 'chord', 'delay' );

let note = [];

note .push ( `{ ${ chord } chord` );
note .push ( [

`i ${ await $ ( 'number' ) }`,
`[$measure * (${ step } + $chord * (${ delay }) )]`,
`[${ length }]`,
... await $ ( 'parameters' )

] .join ( ' ' ) );
note .push ( '}' );

this .details .score .push ( note = note .join ( '\n' ) );

return note;

};

};
