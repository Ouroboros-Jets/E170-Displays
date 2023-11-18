type T_ReverseVideo = {
  color: string;
  backgroundColor: string;
  reverse: boolean;
};

export const reverseVideo = ({ color, backgroundColor, reverse }: T_ReverseVideo) => {
  if (reverse) {
    return {
      color: backgroundColor,
      backgroundColor: color,
    };
  }
  return {
    color,
    backgroundColor,
  };
};
