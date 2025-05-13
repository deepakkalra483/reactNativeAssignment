import {View, ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';

interface ShimmerProps {
  style?: ViewStyle;
}

const ShimmerCustomView: React.FC<ShimmerProps> = props => {
  return (
    <View
      style={{
        backgroundColor: '#0000000',
        height: '100%',
        width: '100%',
      }}>
      <ShimmerPlaceholder
        duration={600}
        shimmerColors={['#ebebeb', '#dbdbdb', '#ebebeb']}
        height={50}
        LinearGradient={LinearGradient}
        shimmerStyle={[
          {width: '100%', height: '100%', borderRadius: 5},
          props.style,
        ]}
      />
    </View>
  );
};

export default ShimmerCustomView;
