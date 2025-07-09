export default class Parameter extends Map {

constructor ( details ) {

super ();

this .value = details .value;

};

$_director ( { play: $ }, value, ... argv ) {

if ( typeof value === 'symbol' )
return;

if ( value !== undefined )
this .value = this .has ( value ) ? this .get ( value ) : value;

if ( argv .length )
return $ ( Symbol .for ( 'senior' ), ... argv );

if ( this .attachment !== undefined )
return this .value + this .attachment;

return this .value;

};

async $_wrapped ( _ ) {

return `[${ ( await _ .play () ) .toString () }]`;

};

$define ( _, key, value ) {

if ( key === undefined )
throw "Provide a key for this parameter to define";

if ( value !== undefined )
this .set ( key, value );

return this .get ( key );

};

$attach ( _, ... argv ) {

if ( ! argv .length )
throw "Nothing to attach";

this .attachment = argv .join ( ' ' );

return _ .play ();

};

};
