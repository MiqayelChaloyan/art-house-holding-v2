import { keepWords } from '@/src/components/screens/design/keepWords';

export const withRedQuestion = (text: string) => {
    if (!text.includes('՞')) return keepWords(text);

    return text.split('՞').map((part, index) => (
        <span key={`${part}-${index}`}>
            {index > 0 && <span className="designTitlePeriod">՞</span>}
            {keepWords(part)}
        </span>
    ));
};

export const splitTitlePeriod = (value: string) => {
    const match = value.match(/([.․։])\s*$/);
    if (!match || match.index === undefined) {
        return { body: value, period: '' };
    }

    return {
        body: value.slice(0, match.index),
        period: match[1],
    };
};

export const TitlePeriod = ({ mark }: { mark: string }) => {
    if (!mark) return null;
    return <span className="designTitlePeriod">{mark}</span>;
};

export const TitleLine = ({
    line,
    emphasis,
    emphasisClassName,
}: {
    line: string;
    emphasis?: string;
    emphasisClassName?: string;
}) => {
    const { body, period } = splitTitlePeriod(line);
    const phrase = (emphasis || '').replace(/[.․։]\s*$/, '');
    const index = phrase ? body.indexOf(phrase) : -1;

    if (index < 0) {
        return (
            <>
                {body}
                <TitlePeriod mark={period} />
            </>
        );
    }

    return (
        <>
            {body.slice(0, index)}
            <em className={emphasisClassName}>{phrase}</em>
            {body.slice(index + phrase.length)}
            <TitlePeriod mark={period} />
        </>
    );
};
