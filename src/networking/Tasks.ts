import {Toast} from '../utils/AppFunctions';
import {BasciRequestProps} from '../utils/StaticArray';
import {ApiRequest} from './ApiRequest';

export const getTasks = ({
  onLoading,
  params,
  onSuccess,
  onError,
}: BasciRequestProps) => {
  ApiRequest(
    `/todos`,
    'get',
    params,
    isLoading => onLoading(isLoading),
    response => {
      onSuccess(response);
    },
    error => {
      Toast({
        type: 'danger',
        message: error?.message || 'Something went wrong',
      });
      onError(error);
    },
  );
};
