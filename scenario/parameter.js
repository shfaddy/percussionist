export default class Parameter {

constructor ( details ) {

this .value = details .value;

};

$_director ( { play: $ }, value ) {

if ( typeof value === 'symbol' )
return;

return this .value = value !== undefined ? value : this .value;

};

};
