import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {RegularText, SemiBoldText} from './CustomText';
import {AppImages} from '../utils/AppImages';
import {AppColors} from '../utils/AppColors';
import {AppConstants} from '../utils/AppCinstants';

interface ToolbarProps {
  leftTitle: string;
  leftdescription?: string | null;
  showBack?: boolean | false;
  navigation?: any;
}

const Toolbar: React.FC<ToolbarProps> = ({
  leftTitle,
  leftdescription,
  showBack,
  navigation,
}) => {
  return (
    <View style={[styles.container, {paddingHorizontal: showBack ? 0 : 16}]}>
      {showBack && (
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={AppConstants.ButtonOpacity}
          onPress={() => navigation?.goBack()}>
          <Image style={styles.backImage} source={AppImages.BACK_ICON} />
        </TouchableOpacity>
      )}
      <View>
        <SemiBoldText size={22} text={leftTitle} />
        {leftdescription && (
          <RegularText
            color={AppColors.GRAY_HEADING}
            style={{marginTop: 8}}
            text={leftdescription}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 55,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.WHITE_BACKGROUND,
    paddingBottom: 10,
  },
  backButton: {
    // height: '100%',
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backImage: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
});

export default Toolbar;
