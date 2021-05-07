import React, { memo, useCallback, useEffect, useState } from 'react';
import { useRef } from 'react';
import { useMemo } from 'react';
import { Animated, ScrollView, View } from 'react-native';
import {
  setPages,
  setAnimated,
  scrollSetting,
  SwiperProps,
  setCardSetting,
} from './_swiper';
import { Style } from './swiper.style';

export const SwiperR: React.FC<SwiperProps> = memo(
  ({
    children,
    style,
    isAutoPlay = false,
    cardSetting = { cardSmallSide: 0 },
    contentOffset,
    mode = 'normal',
  }) => {
    const timerSign = useRef<NodeJS.Timer>();
    const scrollViewRef = useRef<ScrollView>(null);
    let scrollIndex = useRef(2);
    let currentPageFloat = 2;
    let currentContentOffset = 0;
    let containerRef = useRef<View>();
    const [containerWidthState, setContainerWidthState] = useState(0);
    const Pages = React.Children.toArray(children);
    setPages(Pages);
    const transformAnimList = useRef(
      React.Children.map(Pages, () => new Animated.Value(0)),
    ).current;
    const pageTotal = Pages.length - 1;

    setCardSetting(mode, cardSetting);

    const setInitialContentOffset = () => {
      if (contentOffset) {
        scrollViewRef.current.scrollTo({
          y: 0,
          x: contentOffset,
          animated: false,
        });
      } else {
        scrollViewRef.current.scrollTo({
          y: 0,
          x: containerWidthState * 2,
          animated: false,
        });
      }
    };

    const getCardWidth = useCallback(() => {
      if (mode === 'normal') {
        return containerWidthState;
      } else if (mode === 'cardSide') {
        return cardSetting.cardSide || containerWidthState;
      }
    }, [cardSetting.cardSide, containerWidthState, mode]);

    const whiteSpace = useMemo(() => {
      return (containerWidthState - getCardWidth()) / 2;
    }, [getCardWidth, containerWidthState]);

    setAnimated(
      transformAnimList,
      scrollIndex.current,
      currentPageFloat,
      whiteSpace,
      cardSetting,
    );

    const previewChildren = useMemo(() => {
      return Pages.map((child, index) => {
        return (
          <Animated.View
            key={index}
            style={[
              Style.childContainerStyle,
              {
                width: containerWidthState,
              },
              {
                transform: [
                  {
                    translateX: transformAnimList![index],
                  },
                ],
              },
            ]}>
            <View style={[Style.cardStyle, { width: whiteSpace }]} />
            {child}
            <View style={[Style.cardStyle, { width: whiteSpace }]} />
          </Animated.View>
        );
      });
    }, [Pages, containerWidthState, transformAnimList, whiteSpace]);

    const isStartOrEnd = useCallback(() => {
      const offset = currentContentOffset;
      if (
        (pageTotal - 1) * containerWidthState - offset <=
        cardSetting.cardSmallSide
      ) {
        scrollViewRef.current?.scrollTo({
          x: containerWidthState * 2,
          y: 0,
          animated: false,
        });
      } else if (offset - containerWidthState <= cardSetting.cardSmallSide) {
        scrollViewRef.current?.scrollTo({
          x: containerWidthState * (pageTotal - 2),
          y: 0,
          animated: false,
        });
      }
    }, [
      cardSetting.cardSmallSide,
      containerWidthState,
      currentContentOffset,
      pageTotal,
    ]);

    const autoPlay = () => {
      if (timerSign.current) {
        clearInterval(timerSign.current);
      }
      if (!isAutoPlay) {
        return;
      }
      timerSign.current = setInterval(() => {
        if (scrollIndex.current === pageTotal - 1) {
          isStartOrEnd();
          scrollIndex.current = 2;
        }
        scrollViewRef.current?.scrollTo({
          y: 0,
          x: (scrollIndex.current + 1) * containerWidthState,
        });
      }, 2000);
    };

    useEffect(() => {
      setInitialContentOffset();
      if (isAutoPlay) {
        autoPlay();
      }
      return () => {
        clearInterval(timerSign.current);
      };
    });

    return (
      <View
        onLayout={e => {
          setContainerWidthState(e.nativeEvent.layout.width);
        }}
        ref={containerRef}
        style={style}>
        <ScrollView
          ref={scrollViewRef}
          horizontal={true}
          contentContainerStyle={[Style.contentContainerStyle]}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          pagingEnabled={true}
          onScrollBeginDrag={() => {
            if (timerSign.current) {
              clearInterval(timerSign.current);
            }
          }}
          onScrollEndDrag={() => {
            if (isAutoPlay) {
              autoPlay();
            }
          }}
          onMomentumScrollEnd={() => {
            isStartOrEnd();
          }}
          onScroll={e => {
            ({
              contentOffset: currentContentOffset,
              currentPageFloat,
              scrollIndex,
            } = scrollSetting(
              currentContentOffset,
              e,
              currentPageFloat,
              scrollIndex,
              containerWidthState,
            ));
            setAnimated(
              transformAnimList,
              scrollIndex.current,
              currentPageFloat,
              whiteSpace,
              cardSetting,
            );
          }}>
          {previewChildren}
        </ScrollView>
      </View>
    );
  },
);
