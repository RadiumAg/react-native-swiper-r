import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {SwiperR} from './src/swiper/swiper';
import Swiper from 'react-native-swiper-hooks';

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

const _renderList = () => {
  let listData = [
    {
      title: '1',
      bgColor: '#f00',
    },
    {
      title: '2',
      bgColor: '#0f0',
    },
    {
      title: '3',
      bgColor: '#00f',
    },
  ];
  return listData.map((item, idx) => {
    return (
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          width: 300,
          height: 300,
          backgroundColor: item.bgColor,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        key={idx}>
        <Text>{item.title}</Text>
      </View>
    );
  });
};

const App = () => {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <SafeAreaView style={{flex: 1}}>
      <SwiperR style={{width: 300, height: 100}}>
        <View style={{backgroundColor: 'pink', width: 220, height: 100}} />
        <View style={{backgroundColor: 'black', width: 220, height: 100}} />
        <View style={{backgroundColor: 'blue', width: 220, height: 100}} />
        <View style={{backgroundColor: 'green', width: 220, height: 100}} />
      </SwiperR>
      <Swiper
        width={300}
        height={300}
        paginationSelectedColor={'#CCFF66'}
        autoplay={false}
        direction={'row'}>
        {_renderList()}
      </Swiper>
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
