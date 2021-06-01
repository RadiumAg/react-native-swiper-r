# react-native-swiper-r :1st_place_medal:

一个基于用于react-native的轮播组件,参考[react-native-ezswiper]([easyui/react-native-ezswiper: swiper component for react-native (github.com)](https://github.com/easyui/react-native-ezswiper)) 的概念，并改用hook重写，修复闪屏问题。动画方面做了点改进，但是仍有问题，欢迎issues。

## Api :car:

| 参数        | 说明                      | 类型                                                    | 默认值                                   |
| ----------- | :------------------------ | ------------------------------------------------------- | ---------------------------------------- |
| autoplay    | 是否自动切换              | boolean                                                 | true                                     |
| cardSetting | 卡片设置，详见下图        | {cardSide:number;cardSpace:number;cardSmallSide:number} | {cardSide:0,cardSpace:0;cardSmallSide:0} |
| mode        | normal和cardSide,详见下图 | 'normal' \|'cardSide'                                   | 'normal'                                 |

#### cardSetting参数说明

![](https://raw.githubusercontent.com/RadiumAg/react-native-swiper-r/master/cardParams.png)

mode模式分为"normal"和"CardSide",normal下默认平铺，以下是演示

#### "normal"模式

![演示1](..\react-native-swiper-r\演示1.gif)

###### 演示代码

```typescript
...
const App = () => {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <SafeAreaView style={{ flex: 1 }}>
      <SwiperR
        autoPlay={true}
        mode={'normal'}
        style={{ width: '100%', height: 100 }}>
        <View
          style={{
            backgroundColor: 'pink',
            flex: 1,
            height: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>1</Text>
        </View>
        <View
          style={{
            backgroundColor: 'black',
            flex: 1,
            height: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{ color: 'white' }}>2</Text>
        </View>
        <View
          style={{
            backgroundColor: 'blue',
            flex: 1,
            height: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{ color: 'white' }}>3</Text>
        </View>
        <View
          style={{
            backgroundColor: 'green',
            flex: 1,
            height: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{ color: 'white' }}>4</Text>
        </View>
      </SwiperR>
    </SafeAreaView>
  );
};
...
```

#### "cardSide"模式

![演示2](..\react-native-swiper-r\演示2.gif)

###### 演示代码

```typescript
const App = () => {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <SafeAreaView style={{ flex: 1 }}>
      <SwiperR
        autoPlay={true}
        cardSetting={{ cardSpace: 90, cardSmallSide: 40, cardSide: 250 }}
        mode={'cardSide'}
        style={{ width: '100%', height: 100 }}>
        <View
          style={{
            backgroundColor: 'pink',
            flex: 1,
            height: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>1</Text>
        </View>
        <View
          style={{
            backgroundColor: 'black',
            flex: 1,
            height: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{ color: 'white' }}>2</Text>
        </View>
        <View
          style={{
            backgroundColor: 'blue',
            flex: 1,
            height: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{ color: 'white' }}>3</Text>
        </View>
        <View
          style={{
            backgroundColor: 'green',
            flex: 1,
            height: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{ color: 'white' }}>4</Text>
        </View>
      </SwiperR>
    </SafeAreaView>
  );
};
```

接下来要做的

- [ ] 添加滚动指示器

- [ ] 考虑加入竖向滚动

  

## 开源协议:fire:

MIT