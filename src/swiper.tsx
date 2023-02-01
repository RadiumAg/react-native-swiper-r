import React, { Children, FC, PropsWithChildren, memo, useMemo } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { View } from 'react-native';
import { SwiperProps } from './_swiper';
import { Style } from './swiper-style';

const Swiper: FC<PropsWithChildren<SwiperProps>> = memo(
  ({ children, style, autoPlay = false, mode = 'normal' }) => {
    const offset = useSharedValue({ x: 0, y: 0 });
    const isPressed = useSharedValue(false);
    const animatedStyles = useAnimatedStyle(() => {
      return {
        transform: [{ translateX: offset.value.x }],
      };
    }, []);

    const gesture = useMemo(
      () =>
        Gesture.Pan()
          .onBegin(() => {
            isPressed.value = true;
          })
          .onUpdate(e => {
            console.log(e);
          })
          .onEnd(() => {})
          .onFinalize(() => {
            isPressed.value = false;
          }),
      [],
    );

    const carouselItems = Children.map(children, children => {
      return <Animated.View style={animatedStyles}>{children}</Animated.View>;
    });

    console.log(carouselItems);

    return (
      <GestureDetector gesture={gesture}>
        <View style={Style.contentContainerStyle}>{carouselItems}</View>
      </GestureDetector>
    );
  },
);

export default Swiper;
