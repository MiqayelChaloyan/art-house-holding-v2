const SLATE_DOM_ERRORS = [
    'Cannot resolve a DOM node from Slate node',
    'Cannot resolve a DOM point from Slate point',
    'Cannot resolve a Slate point from DOM point',
    'Cannot resolve a Slate node from DOM node',
    'Cannot resolve a Slate range',
];

const isSlateDomError = (value: unknown) => {
    const message = typeof value === 'string'
        ? value
        : value instanceof Error
            ? value.message
            : '';

    return SLATE_DOM_ERRORS.some((part) => message.includes(part));
};

if (typeof window !== 'undefined') {
    const originalConsoleError = console.error.bind(console);
    console.error = (...args: unknown[]) => {
        if (args.some((arg) => isSlateDomError(arg) || isSlateDomError((arg as { message?: string })?.message))) {
            return;
        }

        originalConsoleError(...args);
    };

    window.addEventListener(
        'error',
        (event) => {
            if (isSlateDomError(event.error) || isSlateDomError(event.message)) {
                event.preventDefault();
                event.stopImmediatePropagation();
            }
        },
        true,
    );

    window.addEventListener(
        'unhandledrejection',
        (event) => {
            if (isSlateDomError(event.reason)) {
                event.preventDefault();
                event.stopImmediatePropagation();
            }
        },
        true,
    );

    const hideOverlay = () => {
        document.querySelectorAll('nextjs-portal').forEach((node) => {
            const text = node.shadowRoot?.textContent || node.textContent || '';
            if (SLATE_DOM_ERRORS.some((part) => text.includes(part))) {
                node.remove();
            }
        });
    };

    const observer = new MutationObserver(hideOverlay);
    observer.observe(document.documentElement, { childList: true, subtree: true });
    hideOverlay();
}

export {};
