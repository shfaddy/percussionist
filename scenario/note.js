import Parameter from './parameter.js';

export default class Note extends Set {

constructor ( details ) {

super ( typeof details ?.parameters === 'object' ? Object .keys ( details .parameters ) : undefined );

this .details = details;
this .number = details .number;
this .instance = details .instance = ++details .instance % 10 === 0 ? ++details .instance : details .instance;

for ( const parameter of [ ... this ] )
this [ '$' + parameter ] = new Parameter ( { value: details .parameters [ parameter ] } );

};

$number () { return [ this .number, this .instance ] .join ( '.' ) };

async $_director ( { play: $ }, ... argv ) {

if ( ! argv .length )
return [ ... this ] .map (

parameter => [ parameter, this [ '$' + parameter ] .value ] .join ( ' = ' )

);

const note = [

`i ${ await $ ( 'number' ) }`,
`[${ argv .shift () || '0' }]`,
`[${ argv .shift () || '1/4' }]`,
... await $ ( 'parameters' )

] .join ( ' ' );

this .details .score .push ( note );

return note;

};

$parameters ( { play: $ } ) {

return Promise .all ( [ ... this ] .map ( async parameter => {

const value = await $ ( parameter );

return isNaN ( `${ value }` [ 0 ] ) ? `"${ value }"` : `[${ value }]`

} ) );

};

};
