import React, { useCallback } from 'react';
import { useRef } from 'react';
import { useMemo } from 'react';
import { Animated, ScrollView, View } from 'react-native';
import { setPages, setAnimated, scrollSetting, SwiperProps } from './_swiper';
import { Style } from './swiper.style';

export const SwiperR: React.FC<SwiperProps> = ({
  children,
  style,
  isAutoPlay = true,
}) => {
  const timerSign = useRef<NodeJS.Timer>();
  const scrollViewRef = useRef<ScrollView>(null);
  let scrollIndex = useRef(2);
  let currentPageFloat = 2;
  let contentOffset = 0;
  const Pages = React.Children.toArray(children);

  setPages(Pages);
  const transformAnimList = useRef(
    React.Children.map(Pages, () => new Animated.Value(0)),
  ).current;
  const pageTotal = Pages.length - 1;

  setAnimated(transformAnimList, scrollIndex.current, currentPageFloat);
  const previewChildren = useMemo(
    () =>
      Pages.map((child, index) => {
        return (
          <Animated.View
            key={index}
            style={{
              ...Style.childContainerStyle,
              transform: [
                {
                  translateX: transformAnimList![index],
                },
              ],
            }}>
            <View
              style={{ width: 40, height: 100, backgroundColor: 'transparent' }}
            />
            {child}
            <View
              style={{ width: 40, height: 100, backgroundColor: 'transparent' }}
            />
          </Animated.View>
        );
      }),
    [Pages, transformAnimList],
  );

  const isStartOrEnd = useCallback(() => {
    const offset = contentOffset;
    if ((pageTotal - 1) * 300 - offset < 30) {
      scrollViewRef.current?.scrollTo({
        x: 600,
        y: 0,
        animated: false,
      });
    } else if (offset - 300 < 30) {
      scrollViewRef.current?.scrollTo({
        x: 300 * (pageTotal - 2),
        y: 0,
        animated: false,
      });
    }
  }, [contentOffset, pageTotal]);

  const autoPlay = () => {
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
        x: (scrollIndex.current + 1) * 300,
      });
    }, 2000);
  };

  autoPlay();

  return (
    <View style={style}>
      <ScrollView
        ref={scrollViewRef}
        horizontal={true}
        contentContainerStyle={[Style.contentContainerStyle]}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentOffset={{ x: 600, y: 0 }}
        scrollEventThrottle={0}
        pagingEnabled={true}
        onScrollBeginDrag={() => {
          if (timerSign.current) {
            clearInterval(timerSign.current);
          }
        }}
        onScrollEndDrag={() => {
          autoPlay();
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
          setAnimated(transformAnimList, scrollIndex.current, currentPageFloat);
        }}>
        {previewChildren}
      </ScrollView>
    </View>
  );
};
