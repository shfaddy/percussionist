import Player from './player.js';

export default class Tabla extends Player {

parameters = {

attack: '1/32',
decay: '1/8',
sustain: '1/4',
release: '1/2',

low: 5,
lowSub: 1,

high: 8,
highSub: '1/8',

gogobell: '1/4',

snatch: '1/4'

};

header = `

giStrikeFT ftgen 0, 0, 256, 1, "$directory/prerequisites/marmstk1.wav", 0, 0, 0
giVibratoFT ftgen 0, 0, 128, 10, 1

`;

body = `

iPitch random 0, 1

iPAttack *= p3
iPDecay *= p3
iPRelease *= p3

p3 init iPAttack + iPDecay + iPRelease

aNote = 0

aLowSubAmplitude linseg 0, iPAttack, 1, iPDecay, .25, iPRelease, 0
aLowSubFrequency linseg cpsoct ( iPHigh + iPitch ), iPAttack, cpsoct ( iPLow + iPitch )

aLowSub poscil aLowSubAmplitude, aLowSubFrequency

aNote += aLowSub * iPLowSub

aHighSubAmplitude linseg 0, iPAttack/8, 1, iPDecay/8, iPSustain, iPRelease/8, 0
aHighSubFrequency linseg cpsoct ( iPHigh + 2 + iPitch ), iPAttack/2, cpsoct ( iPLow + 2 + iPitch )

aHighSub poscil aHighSubAmplitude, aHighSubFrequency

aNote += aHighSub * iPHighSub

aGogobell gogobel 1, cpsoct ( iPLow + iPitch ), .5, .5, giStrikeFT, 6.0, 0.3, giVibratoFT

aNote += aGogobell * iPGogobell

aSnatchAmplitude linseg 0, iPAttack/8, 1, iPDecay/8, 0
aSnatchFrequency linseg cpsoct ( iPHigh + 2 + iPitch ), iPAttack/2, cpsoct ( iPHigh + iPitch )

aSnatch noise aSnatchAmplitude, 0
aSnatch butterlp aSnatch, aSnatchFrequency

aNote += aSnatch * iPSnatch

`;

};
