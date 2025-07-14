import Clock from './clock.js';
import Engine from './engine.js';
import Tabla from './tabla.js';
import Parameter from './parameter.js';

export default class Percussionist {

constructor ( details = {} ) {

this .details = Object .assign ( details, {

percussionist: this,
players: [],
score: []

} );

this .$clock = new Clock ( details );
this .$tabla = new Tabla ( details );
this .$t2 = new Tabla ( details );
this .$record = new Engine ( details );

};

title = 'recording';

$title ( _, ... argv ) {

return ! argv .length ? this .title : this .title = argv .join ( '-' );

};

$key = new Parameter ( { value: 60 } );

};
