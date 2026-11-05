import dynamic from 'next/dynamic';

import HomeSectionFallback from './HomeSectionFallback';


const HomeClient = dynamic(() => import('./HomeClient'), {
    loading: () => <HomeSectionFallback tall />,
});

interface Props {
    data: HOME_DETALIS_QUERYResult;
};

const EducationalCenterHome = ({ data }: Readonly<Props>) => (
    <HomeClient data={data} />
);

export default EducationalCenterHome;
