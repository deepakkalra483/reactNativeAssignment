import {View} from 'react-native';
import RootNavigation from './src/navigation/RootNavigation';
import {AppStyles} from './src/utils/AppStyle';
import FlashMessage from 'react-native-flash-message';
import {AppFonts} from './src/utils/AppFonts';
import {AppColors} from './src/utils/AppColors';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <RootNavigation />
      <FlashMessage
        position={'top'}
        statusBarHeight={0}
        titleStyle={{
          marginTop: 5,
          fontSize: 14,
          fontFamily: AppFonts.MEDIUM,
        }}
        icon={'auto'}
        color={AppColors.BLACK_HEADING}
        style={{marginTop: 20, borderRadius: 10, marginHorizontal: 16}}
      />
    </Provider>
  );
};

export default App;
