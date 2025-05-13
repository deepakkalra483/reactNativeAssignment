import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {taskModal} from '../utils/StaticArray';

export type RootStackParamList = {
  Dashboard: undefined;
  TaskCreate: {item?: taskModal,screen:number} | undefined;
  TaskDetail: {item: taskModal};
};

export type DashboardScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Dashboard'
>;

export type TaskCreateScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'TaskCreate'
>;

export type TaskDetailScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'TaskDetail'
>;
