import React from 'react';
import {useRef} from 'react';
import {useMemo} from 'react';
import {Animated, ScrollView, StyleProp, View, ViewStyle} from 'react-native';

import {Style} from './swiper.style';

export const SwiperR: React.FC<{style?: StyleProp<ViewStyle>}> = ({
  children,
  style,
}) => {
  const transformAnimList = useRef(
    React.Children.map(children, () => new Animated.Value(0)),
  ).current;
  let scrollIndex = 0;
  let currentPageFloat = 0;
  console.log('update');

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
      React.Children.map(children, (child, index) => {
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
    [children, transformAnimList],
  );

  return (
    <View style={style}>
      <ScrollView
        horizontal={true}
        contentContainerStyle={Style.contentContainerStyle}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        pagingEnabled={true}
        onScroll={e => {
          const offset = e.nativeEvent.contentOffset.x;
          let PageFloat = offset / 300;
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
