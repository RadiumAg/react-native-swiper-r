import React, { memo, useCallback, useEffect, useState } from 'react';
import { useRef } from 'react';
import { useMemo } from 'react';
import { Animated, ScrollView, View } from 'react-native';
import { setPages, setAnimated, scrollSetting, SwiperProps } from './_swiper';
import { Style } from './swiper.style';

export const SwiperR: React.FC<SwiperProps> = memo(
  ({ children, style, isAutoPlay = true, cardSetting = { width: 0 } }) => {
    const timerSign = useRef<NodeJS.Timer>();
    const scrollViewRef = useRef<ScrollView>(null);
    let scrollIndex = useRef(2);
    let currentPageFloat = 2;
    let contentOffset = 0;
    let containerRef = useRef<View>();
    const [containerWidthState, setContainerWidthState] = useState(0);
    const Pages = React.Children.toArray(children);
    setPages(Pages);
    const transformAnimList = useRef(
      React.Children.map(Pages, () => new Animated.Value(0)),
    ).current;
    const pageTotal = Pages.length - 1;

    setAnimated(
      transformAnimList,
      scrollIndex.current,
      currentPageFloat,
      cardSetting,
    );

    const previewChildren = useMemo(
      () =>
        Pages.map((child, index) => {
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
              <View style={[Style.cardStyle, { width: cardSetting?.width }]} />
              {child}
              <View style={[Style.cardStyle, { width: cardSetting?.width }]} />
            </Animated.View>
          );
        }),
      [Pages, cardSetting?.width, containerWidthState, transformAnimList],
    );

    const isStartOrEnd = useCallback(() => {
      const offset = contentOffset;
      if ((pageTotal - 1) * containerWidthState - offset < cardSetting.width) {
        scrollViewRef.current?.scrollTo({
          x: containerWidthState,
          y: 0,
          animated: false,
        });
      } else if (offset - containerWidthState < cardSetting.width) {
        scrollViewRef.current?.scrollTo({
          x: containerWidthState * (pageTotal - 2),
          y: 0,
          animated: false,
        });
      }
    }, [cardSetting.width, containerWidthState, contentOffset, pageTotal]);

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

    // autoPlay();
    console.log(containerWidthState);

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
          contentOffset={{ x: containerWidthState * 2, y: 0 }}
          scrollEventThrottle={16}
          pagingEnabled={true}
          onScrollBeginDrag={() => {
            if (timerSign.current) {
              clearInterval(timerSign.current);
            }
          }}
          onScrollEndDrag={() => {
            // autoPlay();
          }}
          onMomentumScrollEnd={() => {
            isStartOrEnd();
          }}
          onScroll={e => {
            ({ contentOffset, currentPageFloat, scrollIndex } = scrollSetting(
              contentOffset,
              e,
              currentPageFloat,
              scrollIndex,
            ));
            console.log(contentOffset);
            setAnimated(
              transformAnimList,
              scrollIndex.current,
              currentPageFloat,
              cardSetting,
            );
          }}>
          {previewChildren}
        </ScrollView>
      </View>
    );
  },
);
