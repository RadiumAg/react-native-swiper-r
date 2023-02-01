import { ViewStyle } from 'react-native';

export interface SwiperProps {
  style?: ViewStyle;
  autoPlay?: boolean;
  contentOffset?: number;
  mode: 'normal' | 'cardSide';
}
