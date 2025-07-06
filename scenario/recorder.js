import { readFile, writeFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';

export default class Recorder {

constructor ( details ) {

this .details = Object .assign ( details, { recorder: this } );

};

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

alwayson "recorder"

gaNote init 0

instr recorder

gaNote clip gaNote, 1, 0dbfs

fout "${ percussionist .title }.${ ++take }.wav", -1, gaNote

out gaNote

gaNote = 0

endin

instr clock

giMeasure init p4

endin

${ players .map (

( { code } ) => code .join ( '\n\n' )

) .join ( '\n\n' ) }

i_ readscore {{

#define measure #[${ clock .measure } * 60 / ${ clock .tempo }]#
#define key #${ percussionist .key }#

i "clock" 0 0 $measure

i "recorder" 0 -1

v $measure

${ score .join ( '\n' ) }

}}

</CsInstruments>

</CsoundSynthesizer>

` .trim (), 'utf8' );

writeFile ( '.take', take .toString (), 'utf8' );

this .engine = spawn ( 'csound', [ path ], { /* stdio: 'inherit' */ } );

_ .interrupt .then (

() => this .engine ? this .engine .kill () : undefined

);

return await new Promise ( ( resolve, reject ) => {

this .engine .on ( 'exit', ( ... status ) => {

status = status .filter ( status => status !== null ) .pop ();

delete this .engine;

if ( status === 0 )
resolve ( true );

else
reject ( "Playing synthesizer is interrupted" );

} );

} );

};

};
