import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ViewStyle,
} from 'react-native';
import { Animated } from 'react-native';

export interface SwiperProps  {
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
    cardSetting.cardSide = 0;
    cardSetting.cardSpace = 0;
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
      currentScaleRate =
        (1 - currentPageFloat + scrollIndex) * (1 - scaleRate) + scaleRate;
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
        currentScaleRate =
          (1 - scaleRate) * (currentPageFloat - 1 - index) + scaleRate;
        console.log(currentScaleRate);
      } else if (index === scrollIndex + 1) {
        currentScaleRate =
          (1 - scaleRate) * (currentPageFloat + 1 - index) + scaleRate;
      }
      scaleAnimList[index].setValue(currentScaleRate);
    } else {
      if (!cardSetting.cardSpace) {
        continue;
      }
      translateAnimList![index].setValue(
        whiteSpace
          ? (currentPageFloat - index) *
              (whiteSpace * 2 - cardSetting.cardSmallSide)
          : 0,
      );
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
  currentPageFloat = offset / containerWidth;
  scrollIndex.current = Math.floor(currentPageFloat);
  return { contentOffset, currentPageFloat, scrollIndex };
}

export function getSwiperWidth(style: ViewStyle) {
  if (typeof style.width === 'string') {
    if (style.width.includes('%')) {
    }
  }
}
