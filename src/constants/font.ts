import localFont from 'next/font/local';

const ArianAMU = localFont({
    src: '../../public/font/arnamu.ttf',
    display: 'swap',
    preload: false,
    variable: '--font-arian-amu',
});
const Vrdznagir = localFont({ src: '../../public/font/Vrdznagir.otf', display: 'swap', preload: false });
const Inter = localFont({
    src: [
        { path: '../../public/font/Inter.ttf', weight: '100 900', style: 'normal' },
        { path: '../../public/font/Inter.ttf', weight: '100 900', style: 'italic' },
    ],
    display: 'swap',
    preload: true,
    variable: '--font-inter',
});
const Arial = localFont({
    src: '../../public/font/arial.ttf',
    display: 'swap',
    preload: false,
    variable: '--font-arial',
});
const Calibri = localFont({ src: '../../public/font/calibri.ttf', display: 'swap', preload: false });
const Belleza = localFont({ src: '../../public/font/belleza.ttf', display: 'swap', preload: false });
const MMArmenU = localFont({ src: '../../public/font/MMArmenU.ttf', display: 'swap', preload: false });
const InstrumentSerif = localFont({
    src: [
        { path: '../../public/font/InstrumentSerif-Regular.ttf', weight: '400', style: 'normal' },
        { path: '../../public/font/InstrumentSerif-Italic.ttf', weight: '400', style: 'italic' },
    ],
    display: 'swap',
    preload: false,
    adjustFontFallback: false,
    variable: '--font-instrument-serif',
});
const MontserratArm = localFont({
    src: [
        {
            path: '../../public/font/Montserratarm-Regular.otf',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../../public/font/Montserratarm-Medium.otf',
            weight: '500',
            style: 'normal',
        },
    ],
    display: 'swap',
    preload: true,
    variable: '--font-montserrat-arm',
});
const JetBrainsMono = localFont({
    src: '../../public/font/JetBrainsMono-Regular.ttf',
    weight: '400',
    display: 'swap',
    preload: false,
    variable: '--font-jetbrains',
});

const designFont = {
    vars: `${InstrumentSerif.variable} ${MontserratArm.variable} ${Arial.variable} ${JetBrainsMono.variable}`,
    ui: 'designFontUi',
    serif: 'designFontSerif',
    medium: 'designFontMedium',
    mono: 'designFontMono',
};

export {
    ArianAMU,
    Inter,
    Vrdznagir,
    Arial,
    Calibri,
    Belleza,
    MMArmenU,
    InstrumentSerif,
    MontserratArm,
    JetBrainsMono,
    designFont,
};
