import {StyleSheet, TextInput, View} from 'react-native';
import {AppColors} from '../utils/AppColors';
import {RegularText} from './CustomText';

interface inputProps {
  title: string;
  placeholder: string;
  onChnage?: (i:string) => void;
  error?: string | null;
  value?: string | null;
}
const CustomInput: React.FC<inputProps> = ({
  title,
  placeholder,
  error,
  onChnage,
  value,
}) => {
  return (
    <View style={styles.container}>
      <RegularText style={styles.title} text={title} />
      <TextInput
        style={[
          styles.input,
          {
            borderColor: !error
              ? AppColors.BLACK_HEADING
              : AppColors?.ERROR_COLOR,
          },
        ]}
        placeholderTextColor={AppColors.GRAY_HEADING}
        placeholder={placeholder}
        onChangeText={onChnage}
        defaultValue={value}
        multiline
      />
      {error && (
        <RegularText
          size={12}
          color={AppColors.ERROR_COLOR}
          style={styles.error}
          text={error || 'Please select'}
        />
      )}
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    minHeight: 80,
  },
  title: {
    marginBottom: 8,
    fontSize: 12,
  },
  input: {
    borderRadius: 10,
    borderWidth: 1,
    flex: 1,
    color: AppColors.BLACK_HEADING,
    fontSize: 16,
    paddingLeft: 10,
    minHeight: 45,
  },
  error: {
    marginTop: 2,
  },
});
