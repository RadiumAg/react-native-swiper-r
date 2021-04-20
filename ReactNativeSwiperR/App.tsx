import React from 'react';
import {SafeAreaView, View} from 'react-native';
import {SwiperR} from './src/swiper/swiper';
const App = () => {
  return (
    <SafeAreaView>
      <SwiperR style={{width: 300, height: 100}}>
        <View style={{backgroundColor: 'pink', width: 220, height: 100}} />
        <View style={{backgroundColor: 'black', width: 220, height: 100}} />
        <View style={{backgroundColor: 'blue', width: 220, height: 100}} />
        <View style={{backgroundColor: 'green', width: 220, height: 100}} />
      </SwiperR>
    </SafeAreaView>
  );
};

export default App;
