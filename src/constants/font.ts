import localFont from 'next/font/local';

const ArianAMU = localFont({ src: '../../public/font/arnamu.ttf', display: 'swap', preload: false });
const Vrdznagir = localFont({ src: '../../public/font/Vrdznagir.otf', display: 'swap', preload: false });
const Inter = localFont({ src: '../../public/font/Inter.ttf', display: 'swap', preload: true });
const Arial = localFont({ src: '../../public/font/arial.ttf', display: 'swap', preload: false });
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
});

export {
    ArianAMU,
    Inter,
    Vrdznagir,
    Arial,
    Calibri,
    Belleza,
    MMArmenU,
    InstrumentSerif,
};
