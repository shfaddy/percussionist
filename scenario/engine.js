import { readFile, writeFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';

export default class Engine {

constructor ( details ) {

this .details = Object .assign ( details, { recorder: this } );

};

$on () { return this .record = true, 'on' };
$offf () { return this .record = false, 'off'; }

async $_director ( _, ... argv ) {

if ( typeof argv [ 0 ] === 'symbol' )
return;

if ( argv .length )
throw `I don't know what you mean by: "${ argv .join ( ' ' ) }"?`;

const { percussionist, players, clock, score } = this .details;
const path = percussionist .title + '.csd';
let take;

try { take = parseInt ( await readFile ( '.take', 'utf8' ) ) } catch ( _ ) {}

if ( isNaN ( take ) )
take = 0;

await writeFile ( path, `

<CsoundSynthesizer>

<CsOptions>

-odac

</CsOptions>

<CsInstruments>

sr = 48000
ksmps = 32
nchnls = 1
0dbfs = 1

#define directory #${ new URL ( import .meta .url ) .pathname .split ( '/' ) .slice ( 0, -1 ) .join ( '/' ) }#

instr clock

giMeasure init p4

endin

giKey init ${ await _ .play ( Symbol .for ( 'senior' ), 'key' ) }

gaNote init 0

instr mixer

gaNote clip gaNote, 1, 0dbfs

out gaNote

if p4 != 0 then

fout "${ percussionist .title }.${ ++take }.wav", -1, gaNote

endif

gaNote = 0

endin

${ players .map (

( { code } ) => code .join ( '\n\n' )

) .join ( '\n\n' ) }

i_ readscore {{

#define measure #${ clock .measure } * 60 / ${ clock .tempo }#

i "clock" 0 0 [$measure]

i "mixer" 0 -1 ${ this .record !== true ? '0' : '1' }

${ score .join ( '\n' ) }

}}

</CsInstruments>

</CsoundSynthesizer>

` .trim (), 'utf8' );

writeFile ( '.take', take .toString (), 'utf8' );

this .process = spawn ( 'csound', [ path ], { stdio: 'ignore' } );

_ .interrupt .then (

() => this .process ? this .process .kill () : undefined

);

return await new Promise ( ( resolve, reject ) => {

this .process .on ( 'exit', ( ... status ) => {

status = status .filter ( status => status !== null ) .pop ();

delete this .process;

if ( status === 0 )
resolve ( true );

else
reject ( "Playing synthesizer is interrupted" );

} );

} );

};

};
