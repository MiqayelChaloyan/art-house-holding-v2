interface Props {
    data: object;
};

/** Escaping `<` keeps CMS-authored text from breaking out of the script element. */
const JsonLd = ({ data }: Readonly<Props>) => (
    <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
);

export default JsonLd;
