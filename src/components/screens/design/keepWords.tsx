import React from 'react';

export const keepWords = (text?: string | null) => {
    if (!text) return text;

    return text.split(/(\s+)/).map((part, index) => (
        /^\s+$/.test(part)
            ? part
            : <span key={`${part}-${index}`} style={{ whiteSpace: 'nowrap' }}>{part}</span>
    ));
};
