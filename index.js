const layers = [
    '00_Train',
    '01_Mist',
    '02_Bushes',
    '03_Particles',
    '04_Forest',
    '05_Particles',
    '06_Forest',
    '07_Forest',
    '08_Forest',
    '09_Forest',
    '10_Sky',
];

const wrapper = document.createElement('div'); {
    wrapper.classList.add('stpb--wrapper');
    let dur = 10000;
    for (const layer of layers.toReversed()) {
        const l = document.createElement('div'); {
            l.classList.add('stpb--layer');
            const img = document.createElement('div'); {
                img.classList.add('stpb--img');
                img.style.backgroundImage = `url(/scripts/extensions/third-party/SillyTavern-ParallaxBackgrounds/parallax-01/${layer}.png)`;
                img.style.setProperty('--stpb--duration', `${dur}ms`);
                l.append(img);
            }
            wrapper.append(l);
        }
        dur = Math.round(dur * 0.9);
    }
    document.body.append(wrapper);
}
