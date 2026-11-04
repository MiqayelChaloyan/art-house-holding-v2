import type { SlugSourceContext } from 'sanity';

/** Slug source for slugs nested in array items, where a string `source` would resolve from the document root. */
export const slugFromParent = (path: string) => (_document: unknown, { parent }: SlugSourceContext): string => {
    const value = path
        .split('.')
        .reduce<unknown>((current, key) => (current as Record<string, unknown> | undefined)?.[key], parent);

    return typeof value === 'string' ? value : '';
};
