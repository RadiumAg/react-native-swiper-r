import React from 'react';
import {useRef} from 'react';
import {useMemo} from 'react';
import {Animated, ScrollView, StyleProp, View, ViewStyle} from 'react-native';
import {setPages} from './_swiper';

import {Style} from './swiper.style';

export const SwiperR: React.FC<{style?: StyleProp<ViewStyle>}> = ({
  children,
  style,
}) => {
  let scrollIndex = 1;
  let currentPageFloat = 0;
  let contentOffset = 0;
  const scrollViewRef = useRef<ScrollView>(null);
  console.log('update');
  const Pages = React.Children.toArray(children);
  setPages(Pages);
  const transformAnimList = useRef(
    React.Children.map(Pages, () => new Animated.Value(0)),
  ).current;
  const pageTotal = Pages.length - 1;

  function setAnimated() {
    for (let index = 0; index < transformAnimList!.length; index++) {
      if (index === scrollIndex) {
        transformAnimList![index].setValue(
          (currentPageFloat - scrollIndex) * 60,
        );
      } else if (index === scrollIndex - 1 || index === scrollIndex + 1) {
        transformAnimList![index].setValue((currentPageFloat - index) * 60);
      } else {
        transformAnimList![index].setValue((currentPageFloat - index) * 60);
      }
    }
  }

  setAnimated();
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
              style={{width: 40, height: 100, backgroundColor: 'transparent'}}
            />
            {child}
            <View
              style={{width: 40, height: 100, backgroundColor: 'transparent'}}
            />
          </Animated.View>
        );
      }),
    [Pages, transformAnimList],
  );

  return (
    <View style={style}>
      <ScrollView
        ref={scrollViewRef}
        horizontal={true}
        contentContainerStyle={Style.contentContainerStyle}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentOffset={{x: 600, y: 0}}
        scrollEventThrottle={0}
        pagingEnabled={true}
        onMomentumScrollEnd={() => {
          const offset = contentOffset;
          console.log((pageTotal - 1) * 300 - offset);
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
        }}
        onScroll={e => {
          const offset = (contentOffset = e.nativeEvent.contentOffset.x);
          const PageFloat = offset / 300;
          const currentPageInt = currentPageFloat % 1;
          if (currentPageInt === 0 || currentPageInt >= 0.9) {
            scrollIndex = Math.ceil(currentPageFloat);
          }
          currentPageFloat = PageFloat;
          setAnimated();
        }}>
        {previewChildren}
      </ScrollView>
    </View>
  );
};
