export interface socialNetwork {
    facebook: (props: { size: string | number; fill: string | number } | any) => JSX.Element;
    instagram: ({ size, fill }: { size: string | number; fill: string | number } | any) => JSX.Element;
    gmail: ({ size, fill }: { size: string | number; fill: string | number } | any) => JSX.Element;
    linkedin: ({ size, fill }: { size: string | number; fill: string | number } | any) => JSX.Element;
};








