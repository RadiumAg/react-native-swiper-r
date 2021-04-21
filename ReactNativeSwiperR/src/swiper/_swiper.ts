import { Animated } from 'react-native';

export function setPages(
  Pages: (React.ReactChild | React.ReactFragment | React.ReactPortal)[],
) {
  Pages.unshift(Pages[Pages.length - 1]);
  Pages.unshift(Pages[Pages.length - 2]);
  Pages.push(Pages[2]);
  Pages.push(Pages[3]);
}

export function setAnimated(
  transformAnimList: Animated.Value[],
  scrollIndex: number,
  currentPageFloat: number,
) {
  for (let index = 0; index < transformAnimList!.length; index++) {
    if (index === scrollIndex) {
      transformAnimList![index].setValue((currentPageFloat - scrollIndex) * 60);
    } else if (index === scrollIndex - 1 || index === scrollIndex + 1) {
      transformAnimList![index].setValue((currentPageFloat - index) * 60);
    } else {
      transformAnimList![index].setValue((currentPageFloat - index) * 60);
    }
  }
}
