import React, {
  PropsWithChildren,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Animated, ScrollView, View } from 'react-native';
import {
  SwiperProps,
  scrollSetting,
  setAnimated,
  setCardSetting,
  setPages,
} from './_swiper';
import { Style } from './swiper.style';

export const SwiperR: React.FC<PropsWithChildren<SwiperProps>> = memo(
  ({
    children,
    style,
    autoPlay = false,
    cardSetting = { cardSmallSide: 0, cardSpace: 0 },
    mode = 'normal',
  }) => {
    const isAutoPlay = autoPlay;
    const timerSign = useRef<number>();
    const scrollViewRef = useRef<ScrollView>(null);
    let scrollIndex = useRef(2);
    let currentPageFloat = 2;
    let currentContentOffset = 0;
    const containerRef = useRef<View>();
    const [containerWidthState, setContainerWidthState] = useState(0);
    const [containerHeightState, setContainerHeightState] = useState(0);
    const Pages = React.Children.toArray(children);
    // set the header and foorter page
    setPages(Pages);
    const translateAnimList = useRef(
      React.Children.map(Pages, () => new Animated.Value(0)),
    ).current;
    const scaleAnimList = useRef(
      React.Children.map(Pages, () => new Animated.Value(1)),
    ).current;
    const pageTotal = Pages.length - 1;
    const scaleRate = useMemo(() => {
      return cardSetting.cardSpace / (containerHeightState || 2);
    }, [cardSetting.cardSpace, containerHeightState]);
    setCardSetting(mode, cardSetting);

    const setInitialContentOffset = useCallback(() => {
      scrollViewRef.current.scrollTo({
        y: 0,
        x: containerWidthState * 2,
        animated: false,
      });
    }, [containerWidthState]);

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
      translateAnimList,
      scaleAnimList,
      scrollIndex.current,
      currentPageFloat,
      whiteSpace,
      scaleRate,
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
                    translateX: translateAnimList[index],
                  },
                  {
                    scaleY: scaleAnimList[index],
                  },
                ],
              },
            ]}
          >
            <View style={[Style.cardStyle, { width: whiteSpace }]} />
            {child}
            <View style={[Style.cardStyle, { width: whiteSpace }]} />
          </Animated.View>
        );
      });
    }, [
      Pages,
      containerWidthState,
      scaleAnimList,
      translateAnimList,
      whiteSpace,
    ]);

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

    const AutoPlay = useCallback(() => {
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
      }, 3000);
    }, [containerWidthState, isAutoPlay, isStartOrEnd, pageTotal]);

    useEffect(() => {
      setInitialContentOffset();
      if (isAutoPlay) {
        AutoPlay();
      }
      return () => {
        clearInterval(timerSign.current);
      };
    }, [AutoPlay, isAutoPlay, setInitialContentOffset]);

    return (
      <View ref={containerRef} style={style}>
        <ScrollView
          onLayout={e => {
            setContainerWidthState(e.nativeEvent.layout.width);
            setContainerHeightState(e.nativeEvent.layout.height);
          }}
          ref={scrollViewRef}
          horizontal={true}
          contentContainerStyle={[Style.contentContainerStyle]}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={3}
          pagingEnabled={true}
          contentOffset={{ x: containerWidthState * scrollIndex.current, y: 0 }}
          onScrollBeginDrag={() => {
            if (timerSign.current) {
              clearInterval(timerSign.current);
            }
          }}
          onScrollEndDrag={() => {
            if (isAutoPlay) {
              AutoPlay();
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
              translateAnimList,
              scaleAnimList,
              scrollIndex.current,
              currentPageFloat,
              whiteSpace,
              scaleRate,
              cardSetting,
            );
          }}
        >
          {previewChildren}
        </ScrollView>
      </View>
    );
  },
);
