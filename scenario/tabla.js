import Player from './player.js';

export default class Tabla extends Player {

parameters = {

key: '0',
highKey: '12*2',
detune: '0',
shift: '12*4',

attack: '1/2^5',
decay: '1/2^3',
sustain: '1/2^2',
release: '1/2^1',

lowSub: '1/2^0',
highSub: '1/2^3',
gogobell: '1/2^2',
snatch: '1/2^2'

};

header = `

giStrikeFT ftgen 0, 0, 256, 1, "$directory/prerequisites/marmstk1.wav", 0, 0, 0
giVibratoFT ftgen 0, 0, 128, 10, 1

`;

body = `

iPKey += giKey + iPDetune
iPHighKey += iPKey

iPAttack *= p3
iPDecay *= p3
iPRelease *= p3

p3 init iPAttack + iPDecay + iPRelease

aNote = 0

aLowSubAmplitude linseg 0, iPAttack, 1, iPDecay, iPSustain, iPRelease, 0

aLowSubFrequency linseg cpsmidinn ( iPKey + iPShift ), iPAttack, cpsmidinn ( iPKey )

aLowSub poscil aLowSubAmplitude, aLowSubFrequency

aNote += aLowSub * iPLowSub

aHighSubAmplitude linseg 0, iPAttack/8, 1, iPDecay/8, iPSustain, iPRelease/8, 0

aHighSubFrequency linseg cpsmidinn( iPHighKey + iPShift ), iPAttack/2, cpsmidinn ( iPHighKey )

aHighSub poscil aHighSubAmplitude, aHighSubFrequency

aNote += aHighSub * iPHighSub

aGogobell gogobel 1, cpsmidinn ( iPKey ), .5, .5, giStrikeFT, 6.0, 0.3, giVibratoFT

aNote += aGogobell * iPGogobell

aSnatchAmplitude linseg 0, iPAttack/8, 1, iPDecay/8, 0

aSnatchFrequency linseg cpsmidinn ( iPHighKey + iPShift ), iPAttack/2, cpsmidinn ( iPKey + iPShift )

aSnatch noise aSnatchAmplitude, 0
aSnatch butterlp aSnatch, aSnatchFrequency

aNote += aSnatch * iPSnatch

`;

};
