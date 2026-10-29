import Link from 'next/link';

import Container from '@/src/components/components/container';

import { ArianAMU } from '@/src/constants/font';
import { Pages } from '@/src/constants/pages';

import cn from 'classnames';

import '@/src/styles/globals.sass';

import styles from './(websites)/[...not-found]/styles.module.sass';

export default function NotFound() {
    return (
        <html lang="en">
            <head>
                <title>Page Not found</title>
            </head>
            <body className={cn(styles.link, ArianAMU.className)}>
                <Container className="container">
                    <div className={styles.not_found}>
                        <div className={styles.left}>
                            <h2 className={styles.title}>404</h2>
                            <h2 className={styles.subtitle}>
                                <span>Lost</span> in Space
                            </h2>
                            <p className={styles.warning}>
                                You have reached the edge of the universe. The page you
                                requested could not be found. Don&apos;t worry and return to the previous page.
                            </p>
                            <div>
                                <Link href={Pages.HOME} prefetch={false} className={styles.button}>
                                    GO HOME
                                </Link>
                            </div>
                        </div>
                        <div className={styles.right}>
                            <div className={styles.astronautas} />
                        </div>
                    </div>
                </Container>
            </body>
        </html>
    );
}
