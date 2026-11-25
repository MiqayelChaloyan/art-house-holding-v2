'use client';

import React from 'react';

interface Props {
    reset: () => void;
};

export default function GlobalError({ reset }: Readonly<Props>) {
    return (
        <html lang="en">
            <body
                style={{
                    margin: 0,
                    minHeight: '100vh',
                    display: 'grid',
                    placeContent: 'center',
                    gap: 16,
                    padding: '48px 20px',
                    textAlign: 'center',
                    fontFamily: 'system-ui, sans-serif',
                    background: '#090909',
                    color: '#ffffff',
                }}
            >
                <h2 style={{ margin: 0 }}>Something went wrong</h2>
                <p style={{ margin: 0, opacity: 0.8 }}>
                    An unexpected error occurred. You can try again or return home.
                </p>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button
                        type="button"
                        onClick={reset}
                        style={{
                            padding: '10px 18px',
                            borderRadius: 8,
                            border: '1px solid currentColor',
                            background: 'transparent',
                            color: 'inherit',
                            cursor: 'pointer',
                        }}
                    >
                        Try again
                    </button>
                    <a
                        href="/"
                        style={{
                            padding: '10px 18px',
                            borderRadius: 8,
                            border: '1px solid currentColor',
                            textDecoration: 'none',
                            color: 'inherit',
                        }}
                    >
                        Go home
                    </a>
                </div>
            </body>
        </html>
    );
}
