import { Options } from '@/src/types/general';

export const options: Options = {
    compact: false,
    hideScrollbar: false,
    Toolbar: {
        display: {
            left: [
                "infobar",
            ],
            middle: [],
            right: [
                "close",
                "fullScreen"
            ],
        }
    },
    Images: {
        zoom: false,
    },
};