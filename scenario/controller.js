import Parameter from './parameter.js';

export default class Controller extends Set {

constructor ( details ) {

super ( typeof details ?.parameters === 'object' ? Object .keys ( details .parameters ) : undefined );

this .details = details;

for ( const parameter of [ ... this ] )
this [ '$' + parameter ] = new Parameter ( { value: details .parameters [ parameter ] } );

};

async $_director ( _, ... argv ) {

const { play: $ } = _;

if ( ! argv .length )
return Promise .all ( [ ... this ] .map (

async parameter => [ parameter, await $ ( parameter ) ] .join ( ' = ' )

) );

};

$parameters ( { play: $ } ) {

return Promise .all ( [ ... this ] .map (

parameter => $ ( parameter, Symbol .for ( 'wrapped' ) )

) );

};

};
