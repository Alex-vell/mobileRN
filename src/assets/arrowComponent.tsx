import React, {memo} from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

const SvgArrowComponent = (props: SvgProps) => (
  <Svg
    width={27}
    height={24}
    fill="none"
    // xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="m10.139 10.74 3.828 3.52 3.83-3.52"
      stroke="#000"
      strokeWidth={0.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const MemoSvgArrowComponent = memo(SvgArrowComponent);
