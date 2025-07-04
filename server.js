#!/usr/bin/env node

import Percussionist from '@shfaddy/percussionist';
import Scenarist from '@shfaddy/scenarist/shell';

try {

await new Scenarist ( new Percussionist ) .publish ();

} catch ( error ) {

console .error ( "Percussionist got killed!" );
console .error ( error );

}
