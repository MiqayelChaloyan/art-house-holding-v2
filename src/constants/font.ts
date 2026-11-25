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
const Hanragitaran = localFont({
    src: [
        { path: '../../public/font/FMBF_Hanragitaran.ttf', weight: '400', style: 'normal' },
        { path: '../../public/font/FMBF_Hanragitaran_i.ttf', weight: '400', style: 'italic' },
    ],
    display: 'swap',
    preload: true,
    adjustFontFallback: false,
    variable: '--font-hanragitaran',
});
const PTSerif = localFont({
    src: [
        { path: '../../public/font/PTSerif-Regular.ttf', weight: '400', style: 'normal' },
        { path: '../../public/font/PTSerif-Italic.ttf', weight: '400', style: 'italic' },
    ],
    display: 'swap',
    preload: true,
    adjustFontFallback: false,
    variable: '--font-pt-serif',
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
const MontserratRegular = localFont({
    src: '../../public/font/Montserrat-Regular.ttf',
    weight: '400',
    style: 'normal',
    display: 'swap',
    preload: false,
    variable: '--font-montserrat-regular',
});
const MontserratLight = localFont({
    src: '../../public/font/Montserrat-Light.ttf',
    weight: '300',
    style: 'normal',
    display: 'swap',
    preload: false,
    variable: '--font-montserrat-light',
});
const MontserratMedium = localFont({
    src: '../../public/font/Montserrat-Medium.ttf',
    weight: '500',
    style: 'normal',
    display: 'swap',
    preload: false,
    variable: '--font-montserrat-medium',
});
const MontserratSemiBold = localFont({
    src: '../../public/font/Montserrat-SemiBold.ttf',
    weight: '600',
    style: 'normal',
    display: 'swap',
    preload: false,
    variable: '--font-montserrat-semibold',
});
const JetBrainsMono = localFont({
    src: '../../public/font/JetBrainsMono-Regular.ttf',
    weight: '400',
    display: 'swap',
    preload: false,
    variable: '--font-jetbrains',
});

const designFont = {
    vars: `${InstrumentSerif.variable} ${Hanragitaran.variable} ${PTSerif.variable} ${MontserratArm.variable} ${MontserratRegular.variable} ${MontserratLight.variable} ${MontserratMedium.variable} ${MontserratSemiBold.variable} ${Arial.variable} ${JetBrainsMono.variable}`,
    ui: 'designFontUi',
    regular: 'designFontRegular',
    serif: 'designFontSerif',
    medium: 'designFontMedium',
    light: 'designFontLight',
    semiBold: 'designFontSemiBold',
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
    Hanragitaran,
    PTSerif,
    MontserratArm,
    MontserratRegular,
    MontserratLight,
    MontserratMedium,
    MontserratSemiBold,
    JetBrainsMono,
    designFont,
};
