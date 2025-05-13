import React from 'react';
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import {AppConstants} from '../utils/AppCinstants';
import {AppImages} from '../utils/AppImages';
import {SemiBoldText} from './CustomText';
import {AppColors} from '../utils/AppColors';

interface ButtonProps {
  src?: ImageSourcePropType;
  onPress: () => void;
  buttonStyle?: ViewStyle;
  imageStyle?: ImageStyle;
  title?: string;
  active?: boolean;
}

export const IconButton: React.FC<ButtonProps> = ({
  src,
  buttonStyle,
  imageStyle,
  onPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={AppConstants.ButtonOpacity}
      style={[styles.button_style, buttonStyle]}
      onPress={onPress}>
      <Image style={[styles.img_style, imageStyle]} source={src} />
    </TouchableOpacity>
  );
};

export const PressableButton: React.FC<ButtonProps> = ({
  title,
  onPress,
  active,
  buttonStyle,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={AppConstants.ButtonOpacity}
      style={[
        styles.pressabe,
        {
          backgroundColor: active
            ? AppColors.BUTTON_ENABLE
            : AppColors.BUTTON_DISABLE,
          ...buttonStyle,
        },
      ]}
      onPress={onPress}>
      <SemiBoldText
        style={{
          color: active ? AppColors.WHITE_BACKGROUND : AppColors.TEXT_DISABLE,
        }}
        size={16}
        text={title || ''}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button_style: {
    padding: 5,
  },
  img_style: {
    height: 15,
    width: 15,
    resizeMode: 'contain',
  },
  pressabe: {
    height: 55,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
