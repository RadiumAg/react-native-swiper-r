import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ViewStyle,
} from 'react-native';
import { Animated } from 'react-native';

export interface SwiperProps {
  style?: ViewStyle;
  autoPlay?: boolean;
  contentOffset?: number;
  mode: 'normal' | 'cardSide';
  cardSetting?: {
    cardSide?: number;
    cardSmallSide?: number;
    cardSpace?: number;
  };
}

function isOverRate(currentScaleRate: number, scaleRate: number) {
  if (currentScaleRate > 1) {
    currentScaleRate = 1;
  } else if (currentScaleRate < scaleRate) {
    currentScaleRate = 0.5;
  }
  return currentScaleRate;
}

export function setCardSetting(
  mode: string,
  cardSetting: {
    cardSide?: number;
    cardSmallSide?: number;
    cardSpace?: number;
  },
) {
  if (mode === 'normal') {
    cardSetting.cardSmallSide = 0;
  }
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
  translateAnimList: Animated.Value[],
  scaleAnimList: Animated.Value[],
  scrollIndex: number,
  currentPageFloat: number,
  whiteSpace: number,
  scaleRate: number,
  cardSetting: {
    cardSide?: number;
    cardSmallSide?: number;
    cardSpace?: number;
  },
) {
  for (let index = 0; index < translateAnimList.length; index++) {
    let currentScaleRate;
    if (index === scrollIndex) {
      translateAnimList![index].setValue(
        whiteSpace
          ? (currentPageFloat - scrollIndex) *
              (whiteSpace * 2 - cardSetting.cardSmallSide)
          : 0,
      );

      if (!cardSetting.cardSpace) {
        continue;
      }

      if (currentPageFloat > scrollIndex) {
        currentScaleRate = 1 - currentPageFloat + scrollIndex;
      } else if (currentPageFloat < scrollIndex) {
        currentScaleRate = scrollIndex - currentPageFloat;
      } else if (currentPageFloat === scrollIndex) {
        currentScaleRate = 1;
      }
      if (currentScaleRate < scaleRate) {
        currentScaleRate = scaleRate;
      }
      scaleAnimList[index].setValue(currentScaleRate);
    } else if (index === scrollIndex - 1 || index === scrollIndex + 1) {
      translateAnimList![index].setValue(
        whiteSpace
          ? (currentPageFloat - index) *
              (whiteSpace * 2 - cardSetting.cardSmallSide)
          : 0,
      );

      if (!cardSetting.cardSpace) {
        continue;
      }

      if (index === scrollIndex - 1) {
        currentScaleRate = Math.abs(currentPageFloat - index);
        currentScaleRate = isOverRate(currentScaleRate, scaleRate);
        scaleAnimList[scrollIndex + 1]?.setValue(currentScaleRate);
      } else if (index === scrollIndex + 1) {
        currentScaleRate = Math.abs(currentPageFloat - index);
        currentScaleRate = isOverRate(currentScaleRate, scaleRate);
        scaleAnimList[scrollIndex - 1]?.setValue(currentScaleRate);
      }
    } else {
      translateAnimList![index].setValue(
        whiteSpace
          ? (currentPageFloat - index) *
              (whiteSpace * 2 - cardSetting.cardSmallSide)
          : 0,
      );
      if (!cardSetting.cardSpace) {
        continue;
      }
      scaleAnimList[index].setValue(scaleRate);
    }
  }
}

export function scrollSetting(
  contentOffset: number,
  e: NativeSyntheticEvent<NativeScrollEvent>,
  currentPageFloat: number,
  scrollIndex: React.MutableRefObject<number>,
  containerWidth: number,
) {
  const offset = (contentOffset = e.nativeEvent.contentOffset.x);
  const PageFloat = offset / containerWidth;
  currentPageFloat = PageFloat;
  const currentPageInt = currentPageFloat % 1;
  if (currentPageInt === 0 || currentPageInt >= 0.9) {
    scrollIndex.current = Math.ceil(currentPageFloat);
  }
  scrollIndex.current = Math.floor(currentPageFloat);

  return { contentOffset, currentPageFloat, scrollIndex };
}

export function getSwiperWidth(style: ViewStyle) {
  if (typeof style.width === 'string') {
    if (style.width.includes('%')) {
    }
  }
}
