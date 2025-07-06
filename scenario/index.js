import Device from './device.js';
import Clock from './clock.js';
import Recorder from './recorder.js';
import Tabla from './tabla.js';

export default class Percussionist extends Device {

constructor ( details = {} ) {

super ();

this .details = Object .assign ( details, {

percussionist: this,
players: [],
score: []

} );

this .$clock = new Clock ( details );
this .$tabla = new Tabla ( details );
this .$t2 = new Tabla ( details );
this .$record = new Recorder ( details );

};

title = 'recording';

$title ( _, ... argv ) {

return ! argv .length ? this .title : this .title = argv .join ( '-' );

};

key = 64;

$key ( _, ... argv ) { return _ .play ( _, Symbol .for ( 'parameter' ), 'key', ... argv ) };

};
