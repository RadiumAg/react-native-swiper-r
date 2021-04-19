import React from 'react';
import {ScrollView, StyleProp, View, ViewStyle} from 'react-native';

import {Style} from './swiper.style';

export const SwiperR: React.FC<{style?:StyleProp<ViewStyle>}> = ({children,style}) => {
  // const childrenCount = React.Children.count(children);
  // let childWidth: string | undefined | number = getChildStyle(style as ViewStyle,childrenCount);

  const  previewChildren = React.Children.map(children,(child, index)=>{
    return <View key={index}>
             {child}
          </View>;
  });

  return  (
     <View style={style}>
        <ScrollView
        horizontal={true}
        contentContainerStyle={Style.contentContainerStyle}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        pagingEnabled = {true}
        >
         {previewChildren}
        </ScrollView>
      </View>);
};


function getChildStyle(style: ViewStyle,childrenCount: number) {
  let childWidth: string | undefined | number;
  if (typeof style.width === 'string') {
    childWidth = parseInt(style.width,10) / childrenCount + '%';
  } else if (typeof style.width === 'number') {
    childWidth = style.width / childrenCount;
  }
  return childWidth;
}

