import { PortableTextComponents } from '@portabletext/react';
import styles from './styles.module.sass';

const components: PortableTextComponents = {
    marks: {
        code: ({ children }) => <code className={styles.code}>{children}</code>,
        em: ({ children }) => <em className={styles.em}>{children}</em>,
        internalLink: ({ value, children }) => {
            const { slug = {} } = value;
            const href = `/${slug.current}`;
            return <a href={href} target="_blank" className={styles.link}>{children}</a>;
        },
        link: ({ value, children }) => {
            const { blank, href } = value;
            return blank ?
                <a href={href} target="_blank" rel="noopener" className={styles.link}>{children}</a>
                : <a href={href} target="_blank" className={styles.link}>{children}</a>;
        },
    },
    block: {
        blockquote: ({ children }) => <blockquote className={styles.blockquote}>{children}</blockquote>,
        normal: ({ children }) => <p className={styles.p}>{children}</p>,
        h1: ({ children }) => <h1 className={styles.h1}>{children}</h1>,
        h2: ({ children }) => <h2 className={styles.h2}>{children}</h2>,
        h3: ({ children }) => <h3 className={styles.h3}>{children}</h3>,
        h4: ({ children }) => <h4 className={styles.h4}>{children}</h4>,
        h5: ({ children }) => <h5 className={styles.h5}>{children}</h5>,
        h6: ({ children }) => <h6 className={styles.h6}>{children}</h6>,
    },
    list: {
        bullet: ({ children }) => <ul className={styles.bullet}>{children}</ul>,
        number: ({ children }) => <ol className={styles.number}>{children}</ol>,
    },
};

export default components;