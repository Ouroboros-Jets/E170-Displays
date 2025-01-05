import React from "react";
import { useMousePosition } from "common/Hooks/getMousePosition";
import "./mouse.scss";

export const Mouse = (): JSX.Element => {
  const { x, y } = useMousePosition();

  type T_MouseIconProps = {
    width: number;
  };
  const MouseIcon: React.FC<T_MouseIconProps> = (
    props: T_MouseIconProps
  ): JSX.Element => {
    return (
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 1080 1080"
        fill="transparent"
        width={props.width}
      >
        <g opacity={0.8}>
          <polygon
            fill="#8c8c8c"
            points="570.79,440.06 509.28,440.05 485.56,0 528.28,0 531.44,55.05 548.44,55.05 551.42,0 594.44,0.01 			
				"
          />
          <polygon
            fill="#8c8c8c"
            points="509.22,639.94 570.72,639.95 594.44,1080 551.72,1080 548.56,1024.95 531.56,1024.95 528.58,1080 
				485.56,1079.99 			"
          />
          <polygon
            fill="#8c8c8c"
            points="639.94,570.79 639.95,509.28 1080,485.56 1080,528.28 1024.95,531.44 1024.95,548.44 1080,551.42 
				1079.99,594.44 			"
          />
          <polygon
            fill="#8c8c8c"
            points="440.06,509.22 440.05,570.72 0,594.44 0,551.72 55.05,548.56 55.05,531.56 0,528.58 0.01,485.56 			
				"
          />
        </g>
        <path
          fill="white"
          d="M534.33,984l11.44,0c8.08-45,14.94-94.03,19.53-146.67c6.25-71.66,7.25-137.79,5.25-197.07h-61
				c-2.11,59.06-1.21,125.09,5.05,196.74C519.21,889.85,526.15,938.99,534.33,984z"
        />
        <path
          fill="white"
          d="M545.7,95.1h-11.44c-8.08,45-14.94,94.03-19.53,146.67c-6.25,71.66-7.25,137.79-5.25,197.07h61
				c2.11-59.06,1.21-125.09-5.05-196.74C560.82,189.26,553.88,140.12,545.7,95.1z"
        />
        <path
          fill="white"
          d="M95.57,534.33l0,11.44c45,8.08,94.03,14.94,146.67,19.53c71.66,6.25,137.79,7.25,197.07,5.25l0-61
				c-59.06-2.11-125.09-1.21-196.74,5.05C189.72,519.21,140.58,526.15,95.57,534.33z"
        />
        <path
          fill="white"
          d="M984.46,545.67v-11.44c-45-8.08-94.03-14.94-146.67-19.53c-71.66-6.25-137.79-7.25-197.07-5.25v61
			c59.06,2.11,125.09,1.21,196.74-5.05C890.31,560.79,939.45,553.85,984.46,545.67z"
        />
      </svg>
    );
  };

  return (
    <div className="mouse" style={{ top: y - 25, left: x - 25 }}>
      <MouseIcon width={50} />
    </div>
  );
};
