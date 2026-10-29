import { RotatingLines } from 'react-loader-spinner';
import colors from '@/src/themes';

function Loader() {
  return (
    <RotatingLines
      strokeColor={colors.brown}
      strokeWidth="5"
      animationDuration="0.75"
      width="70"
      visible={true}
    />
  )
}

export default Loader;