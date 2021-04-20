import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Swiper from 'react-native-swiper';
import {SwiperR} from './src/swiper/swiper';

var styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'blue',
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <SwiperR style={{width: 300, height: 100}}>
        <View style={{backgroundColor: 'pink', width: 220, height: 100}} />
        <View style={{backgroundColor: 'black', width: 220, height: 100}} />
        <View style={{backgroundColor: 'blue', width: 220, height: 100}} />
        <View style={{backgroundColor: 'green', width: 220, height: 100}} />
      </SwiperR>

      {/* <Swiper style={styles.wrapper} showsButtons loop={true}>
        <View testID="Hello" style={styles.slide1}>
          <Text style={styles.text}>Hello Swiper</Text>
        </View>
        <View testID="Beautiful" style={styles.slide2}>
          <Text style={styles.text}>Beautiful</Text>
        </View>
        <View testID="Simple" style={styles.slide3}>
          <Text style={styles.text}>And simple</Text>
        </View>
      </Swiper> */}
    </SafeAreaView>
  );
};

export default App;
