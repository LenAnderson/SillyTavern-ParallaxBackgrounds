import { SlashCommand } from "../../../slash-commands/SlashCommand.js";
import { ARGUMENT_TYPE, SlashCommandArgument } from "../../../slash-commands/SlashCommandArgument.js";
import { SlashCommandParser } from "../../../slash-commands/SlashCommandParser.js";

const bgs = [
    {
        dur: 10000,
        excl: [],
        layers: [
            'parallax-01/00_Train',
            'parallax-01/01_Mist',
            'parallax-01/02_Bushes',
            'parallax-01/03_Particles',
            'parallax-01/04_Forest',
            'parallax-01/05_Particles',
            'parallax-01/06_Forest',
            'parallax-01/07_Forest',
            'parallax-01/08_Forest',
            'parallax-01/09_Forest',
            'parallax-01/10_Sky',
        ],
    },
    {
        dur: 13000,
        excl: [
            'parallax-02/03_Moon',
            'parallax-02/02_Stars',
            'parallax-02/01_Sky',
        ],
        layers: [
            'parallax-02/00_Train',
            'parallax-02/12_Desert',
            'parallax-02/11_Mountains',
            'parallax-02/10_Cloudsmall',
            'parallax-02/09_Cloudsmall',
            'parallax-02/08_Cloud',
            'parallax-02/07_Cloud',
            'parallax-02/06_Cloud',
            'parallax-02/05_Cloud',
            'parallax-02/04_Cloud',
            'parallax-02/03_Moon',
            'parallax-02/02_Stars',
            'parallax-02/01_Sky',
        ],
    },
];


const wrapper = document.createElement('div'); {
    wrapper.classList.add('stpb--wrapper');
    wrapper.innerHTML = '';
    document.body.append(wrapper);
}

const makeBg = ()=>{
    let bg = bgs[JSON.parse(localStorage.getItem('stpb--bg') ?? '0')];
    let layers = bg.layers;
    let dur = bg.dur ?? 10000;
    for (const layer of layers.toReversed()) {
        const l = document.createElement('div'); {
            l.classList.add('stpb--layer');
            const img = document.createElement('div'); {
                img.classList.add('stpb--img');
                img.style.backgroundImage = `url(/scripts/extensions/third-party/SillyTavern-ParallaxBackgrounds/${layer}.png)`;
                img.style.setProperty('--stpb--duration', `${dur}ms`);
                if (bg.excl.includes(layer)) {
                    img.style.animation = 'unset';
                }
                l.append(img);
            }
            wrapper.append(l);
        }
        dur = Math.round(dur * 0.9);
    }
};
makeBg();

SlashCommandParser.addCommandObject(SlashCommand.fromProps({ name: 'parallax',
    callback: (args, value)=>{
        const num = Number(value);
        localStorage.setItem('stpb--bg', JSON.stringify(num));
        makeBg();
    },
    unnamedArgumentList: [
        SlashCommandArgument.fromProps({ description: 'which background to show',
            typeList: [ARGUMENT_TYPE.NUMBER],
            enumList: ['0', '1'],
        }),
    ],
    helpString: 'Set which parallax background to show (0 or 1)',
}));
