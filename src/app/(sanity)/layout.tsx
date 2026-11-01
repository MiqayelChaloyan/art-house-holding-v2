import type { Metadata } from 'next';

/** Defence in depth: robots.txt already disallows /admin, this covers the case where it is reached anyway. */
export const metadata: Metadata = {
    robots: { index: false, follow: false },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning style={{ height: '100%' }}>
            <body
                suppressHydrationWarning
                style={{ height: '100%', margin: 0 }}
            >
                {children}
            </body>
        </html>
    )
};
