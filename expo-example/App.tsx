import { Swiper } from 'react-native-swiper-r';
import { SafeAreaView, Text, View } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Swiper
        autoPlay={true}
        mode={'normal'}
        style={{ width: '100%', height: 100 }}
      >
        <View
          style={{
            backgroundColor: 'pink',
            flex: 1,
            height: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text>1</Text>
        </View>

        <View
          style={{
            backgroundColor: 'black',
            flex: 1,
            height: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'white' }}>2</Text>
        </View>

        <View
          style={{
            backgroundColor: 'blue',
            flex: 1,
            height: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'white' }}>3</Text>
        </View>

        <View
          style={{
            backgroundColor: 'green',
            flex: 1,
            height: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'white' }}>4</Text>
        </View>
      </Swiper>
    </SafeAreaView>
  );
}
