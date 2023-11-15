import React from 'react';
import '../buttonBars.scss';
import { useObjLocalVar } from 'instruments/common/Hooks/simVars';

interface ButtonBarButtonProps {
  isSystemButton?: boolean;
  text: string;
  isTop?: boolean;
  routeTo: number;
}

export const ButtonBarButton: React.FC<ButtonBarButtonProps> = (props: ButtonBarButtonProps): JSX.Element => {
  const [topPage, setTopPage] = useObjLocalVar('MFD_ROUTER_TOP', 'Number');
  const [bottomPage, setBottomPage] = useObjLocalVar('MFD_ROUTER_BOTTOM', 'Number');
  const handleButtonClick = (to: number): void => {
    if (props.isTop) {
      setTopPage(to);
      return;
    } else {
      setBottomPage(to);
      return;
    }
  };

  return (
    <div onClick={() => handleButtonClick(props.routeTo)} className="button-container">
      <div className="button-center">
        <div className="button-children">{props.text}</div>
      </div>
      <div className="button-background" />
    </div>
  );
};
