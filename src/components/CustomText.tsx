import {Text, TextStyle} from 'react-native';
import {AppColors} from '../utils/AppColors';
import { AppFonts } from '../utils/AppFonts';

interface textProps {
  text: string;
  color?: string;
  size?: number;
  style?: TextStyle;
}

export const SemiBoldText: React.FC<textProps> = ({
  text,
  color,
  size,
  style,
}) => {
  return (
    <Text
      style={{
        color: color || AppColors.BLACK_HEADING,
        fontSize: size || 14,
        fontFamily:AppFonts.SEMI_BOLD,
        ...style,
      }}>
      {text}
    </Text>
  );
};

export const RegularText: React.FC<textProps> = ({text, color, size,style}) => {
  return (
    <Text
      style={{
        color: color || AppColors.BLACK_HEADING,
        fontSize: size || 14,
        fontFamily: AppFonts.REGULAR,
        ...style
      }}>
      {text}
    </Text>
  );
};
