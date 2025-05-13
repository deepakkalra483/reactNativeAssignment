import {showMessage} from 'react-native-flash-message';
import {ToastProps} from './StaticArray';

export const Toast = ({type = 'none', message}: ToastProps) => {
  showMessage({
    type: type,
    message: message,
  });
};
