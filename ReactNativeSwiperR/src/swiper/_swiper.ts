import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ViewStyle,
} from 'react-native';
import { Animated } from 'react-native';

export interface SwiperProps {
  style?: ViewStyle;
  isAutoPlay?: boolean;
  cardSetting: {
    width: number;
  };
}

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
  cardSetting: { width: number },
) {
  for (let index = 0; index < transformAnimList!.length; index++) {
    if (index === scrollIndex) {
      transformAnimList![index].setValue(
        (currentPageFloat - scrollIndex) * cardSetting.width * 2,
      );
    } else if (index === scrollIndex - 1 || index === scrollIndex + 1) {
      transformAnimList![index].setValue(
        (currentPageFloat - index) * cardSetting.width * 2,
      );
    } else {
      transformAnimList![index].setValue(
        (currentPageFloat - index) * cardSetting.width * 2,
      );
    }
  }
}

export function scrollSetting(
  contentOffset: number,
  e: NativeSyntheticEvent<NativeScrollEvent>,
  currentPageFloat: number,
  scrollIndex: React.MutableRefObject<number>,
) {
  const offset = (contentOffset = e.nativeEvent.contentOffset.x);
  const PageFloat = offset / 300;
  currentPageFloat = PageFloat;
  const currentPageInt = currentPageFloat % 1;
  if (currentPageInt === 0 || currentPageInt >= 0.9) {
    scrollIndex.current = Math.ceil(currentPageFloat);
  }
  return { contentOffset, currentPageFloat, scrollIndex };
}

export function getSwiperWidth(style: ViewStyle) {
  if (typeof style.width === 'string') {
    if (style.width.includes('%')) {
    }
  }
}
