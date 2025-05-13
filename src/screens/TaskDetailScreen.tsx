import {Alert, ScrollView, StyleSheet, View} from 'react-native';
import {TaskDetailScreenProps} from '../navigation/NavigationTypes';
import Toolbar from '../components/Toolbar';
import {AppStyles} from '../utils/AppStyle';
import {AppColors} from '../utils/AppColors';
import {RegularText, SemiBoldText} from '../components/CustomText';
import moment from 'moment';
import {useState} from 'react';
import {taskModal} from '../utils/StaticArray';
import {PressableButton} from '../components/CustomButton';
import {useDispatch} from 'react-redux';
import {deleteTask} from '../redux/slices/TaskSlice';
import {Toast} from '../utils/AppFunctions';

const TaskDetailScreen: React.FC<TaskDetailScreenProps> = ({
  navigation,
  route,
}) => {
  const item = route?.params?.item;
  const dispatch = useDispatch();

  const handleDeleteTask = () => {
    Alert.alert('Delete Task', 'Are you sure you want to delete this task?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => {
          dispatch(deleteTask(item?.id));
          Toast({type: 'success', message: 'Task deleted successfully'});
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <View style={AppStyles.container}>
      <Toolbar
        leftTitle={'Task Information'}
        showBack
        navigation={navigation}
      />
      <ScrollView style={styles.content_container}>
        <SemiBoldText size={18} text={item?.title || ''} />
        <RegularText
          style={styles.descrption_style}
          size={16}
          text={item?.description || ``}
        />
        <RegularText
          style={styles.descrption_style}
          text={`Due on: ${moment(item?.dueDate).format(
            'MMM DD, YYYY hh:mm A',
          )}`}
        />
        <View style={styles.button_container}>
          <PressableButton
            active
            buttonStyle={{height: 40, width: '45%'}}
            title="Edit Task"
            onPress={() =>
              navigation.navigate('TaskCreate', {item: item, screen: 2})
            }
          />
          <PressableButton
            active
            buttonStyle={{height: 40, width: '45%'}}
            title="Delete Task"
            onPress={handleDeleteTask}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default TaskDetailScreen;

const styles = StyleSheet.create({
  content_container: {
    flexGrow: 1,
    backgroundColor: AppColors.LIGHT_BACKGROUND,
    paddingHorizontal: 16,
    paddingTop: 15,
  },
  descrption_style: {
    marginTop: 8,
  },
  button_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
  },
});
