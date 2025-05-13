import AsyncStorage from '@react-native-community/async-storage';
import {taskModal} from '../utils/StaticArray';
import {Toast} from '../utils/AppFunctions';

export const storeTask = async (data: taskModal[]) => {
  try {
    await AsyncStorage.setItem(
      AsyncStorageConstants.task,
      JSON.stringify(data),
    );
  } catch (error) {
    console.log('error in async store--', error);
  }
};

export const getLocalTask = async () => {
  try {
    const result = await AsyncStorage.getItem(AsyncStorageConstants.task);
    return result != null ? JSON.parse(result) : null;
  } catch (error) {
    console.log('get async data error--', error);
    return null;
  }
};

export const setPageToLocal = async (page: number) => {
  try {
    AsyncStorage.setItem(AsyncStorageConstants.page, page.toString());
  } catch (error) {
    Toast({
      type: 'danger',
      message: JSON.stringify(error) || 'Something went wrong',
    });
  }
};

export const getPage = async () => {
  try {
    const page = await AsyncStorage.getItem(AsyncStorageConstants.page);
    if (page) {
      return parseInt(page);
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

export class AsyncStorageConstants {
  static task = 'task';
  static page = 'page';
}
