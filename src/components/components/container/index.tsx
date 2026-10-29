interface Props {
    children: React.ReactNode;
    className: string;
};

export default function Container({ children, className }: Readonly<Props>) {
    return <div className={className}>{children}</div>;
};