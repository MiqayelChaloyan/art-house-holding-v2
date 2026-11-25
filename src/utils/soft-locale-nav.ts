const STORAGE_KEY = 'soft-locale-nav';
const OVERLAY_ID = 'soft-locale-nav-freeze';
const SAFETY_MS = 10000;

let safetyTimer: number | undefined;

const clearSafetyTimer = () => {
    if (safetyTimer !== undefined) {
        window.clearTimeout(safetyTimer);
        safetyTimer = undefined;
    }
};

export const isSoftLocaleNav = (): boolean => {
    if (typeof window === 'undefined') return false;
    try {
        return sessionStorage.getItem(STORAGE_KEY) === '1'
            || document.documentElement.dataset.localeSwitching === '1';
    } catch {
        return document.documentElement.dataset.localeSwitching === '1';
    }
};

export const beginSoftLocaleNav = (): void => {
    if (typeof window === 'undefined') return;
    if (document.getElementById(OVERLAY_ID)) return;

    const source = document.body;
    const overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    overlay.setAttribute('aria-hidden', 'true');
    Object.assign(overlay.style, {
        position: 'fixed',
        inset: '0',
        zIndex: '2147483646',
        overflow: 'hidden',
        pointerEvents: 'all',
        cursor: 'wait',
        background: getComputedStyle(source).backgroundColor || '#090909',
    });

    const clone = source.cloneNode(true) as HTMLElement;
    clone.querySelectorAll('script, iframe, video, audio').forEach((node) => node.remove());
    clone.querySelectorAll('[id]').forEach((node) => node.removeAttribute('id'));
    Object.assign(clone.style, {
        position: 'relative',
        top: `${-window.scrollY}px`,
        left: '0',
        width: '100%',
        margin: '0',
        transform: 'none',
        animation: 'none',
        pointerEvents: 'none',
    });

    overlay.appendChild(clone);
    document.documentElement.appendChild(overlay);
    document.documentElement.dataset.localeSwitching = '1';

    try {
        sessionStorage.setItem(STORAGE_KEY, '1');
    } catch {
        // ignore quota / private mode
    }

    clearSafetyTimer();
    safetyTimer = window.setTimeout(() => {
        endSoftLocaleNav();
    }, SAFETY_MS);
};

export const endSoftLocaleNav = (): void => {
    if (typeof window === 'undefined') return;

    clearSafetyTimer();
    document.documentElement.removeAttribute('data-locale-switching');

    try {
        sessionStorage.removeItem(STORAGE_KEY);
    } catch {
        // ignore
    }

    const overlay = document.getElementById(OVERLAY_ID);
    if (!overlay) return;

    overlay.style.transition = 'opacity 160ms ease';
    overlay.style.opacity = '0';
    window.setTimeout(() => {
        overlay.remove();
    }, 180);
};
