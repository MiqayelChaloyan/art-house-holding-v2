import React from 'react';

const ARMENIAN = /[\u0530-\u058F]/;
const CYRILLIC = /[\u0400-\u04FF]/;

export const keepWords = (text?: string | null) => {
    if (!text) return text;

    return text.split(/(\s+)/).map((part, index) => {
        if (/^\s+$/.test(part)) return part;

        const tooLong = (ARMENIAN.test(part) && part.length > 10)
            || (CYRILLIC.test(part) && part.length > 12)
            || part.length > 16;

        return (
            <span
                key={`${part}-${index}`}
                style={tooLong
                    ? { overflowWrap: 'break-word', wordBreak: 'break-word' }
                    : { whiteSpace: 'nowrap' }}
            >
                {part}
            </span>
        );
    });
};
