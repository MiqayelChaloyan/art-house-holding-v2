import HomeClient from './HomeClient';


interface Props {
    data: HOME_DETALIS_QUERYResult;
};

const EducationalCenterHome = ({ data }: Readonly<Props>) => (
    <HomeClient data={data} />
);

export default EducationalCenterHome;
