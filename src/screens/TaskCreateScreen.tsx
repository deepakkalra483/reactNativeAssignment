import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {TaskCreateScreenProps} from '../navigation/NavigationTypes';
import Toolbar from '../components/Toolbar';
import {AppStyles} from '../utils/AppStyle';
import {AppColors} from '../utils/AppColors';
import CustomInput from '../components/CustomInput';
import {PressableButton} from '../components/CustomButton';
import {useState} from 'react';
import {CreateErrorProps, taskModal} from '../utils/StaticArray';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import {addTask, editTask} from '../redux/slices/TaskSlice';
import {RegularText, SemiBoldText} from '../components/CustomText';
import {AppConstants} from '../utils/AppCinstants';
import DatePicker from 'react-native-date-picker';
import {Toast} from '../utils/AppFunctions';

const TaskCreateScreen: React.FC<TaskCreateScreenProps> = ({
  route,
  navigation,
}) => {
  const item = route?.params?.item;
  const popNumber = route?.params?.screen;
  const dispatch = useDispatch();

  const [open, setOpen] = useState<boolean>(false);
  const [error, setError] = useState<CreateErrorProps>({});
  const [title, setTitle] = useState<string | null>(item?.title || null);
  const [description, setDescription] = useState<string | null>(
    item?.description || null,
  );
  const [date, setDate] = useState(
    item?.dueDate ? new Date(item?.dueDate) : new Date(),
  );

  const createNewTask = (item: taskModal) => {
    dispatch(addTask(item));
    Toast({type: 'success', message: 'Task created successfully'});
  };

  const updateTask = (id: number, item: Partial<taskModal>) => {
    dispatch(editTask({id, updatedTask: item}));
    Toast({type: 'success', message: 'Task updated successfully'});
  };

  const handlePress = () => {
    if (!isValid()) return null;
    item
      ? updateTask(item?.id, {
          title: title,
          description: description,
          completed: false,
          id: item?.id,
          dueDate: date.toISOString(),
        })
      : createNewTask({
          title: title,
          description: description,
          completed: false,
          id: moment().valueOf(),
          dueDate: date.toISOString(),
        });
    popNumber == 1 ? navigation.goBack() : navigation.popToTop();
  };

  const isValid = () => {
    const errors: {
      title_error: string | null;
      description_error: string | null;
    } = {
      title_error: null,
      description_error: null,
    };

    if (!title) {
      errors.title_error = 'Please select title';
    }
    if (!description) {
      errors.description_error = 'Please select description';
    }

    setError(errors);

    return !errors.title_error && !errors.description_error;
  };
  return (
    <View style={AppStyles.container}>
      <Toolbar
        leftTitle={item ? 'Edit Task' : 'Add New Task'}
        showBack
        navigation={navigation}
      />
      <ScrollView contentContainerStyle={styles.content_container}>
        <CustomInput
          value={title}
          title="Task Title"
          placeholder="Go for a walk!"
          error={error?.title_error}
          onChnage={i => {
            if (i.trim()?.length > 0) {
              setTitle(i);
            } else {
              setTitle(null);
            }
          }}
        />
        <CustomInput
          value={description}
          title="Task Description"
          placeholder="Go for a walk!"
          error={error?.description_error}
          onChnage={i => {
            if (i.trim()?.length > 0) {
              setDescription(i);
            } else {
              setDescription(null);
            }
          }}
        />

        {/* Date picker  */}
        <View style={styles.date_container}>
          <RegularText style={styles.date_title} text={'Task due date'} />
          <View style={styles.date_time_button}>
            <TouchableOpacity
              style={styles.date_button}
              activeOpacity={AppConstants.ButtonOpacity}
              onPress={() => setOpen(true)}>
              <SemiBoldText
                text={moment(date).format('MMMM DD, yyyy hh:mm A')}
              />
            </TouchableOpacity>
          </View>
        </View>

        <PressableButton
          active={title && description ? true : false}
          buttonStyle={{marginTop: 20}}
          title={item ? 'Update task' : 'Create Task'}
          onPress={handlePress}
        />

        <DatePicker
          modal
          open={open}
          date={date}
          onConfirm={date => {
            setOpen(false);
            setDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
          minimumDate={new Date()}
          mode="datetime"
        />
      </ScrollView>
    </View>
  );
};

export default TaskCreateScreen;

const styles = StyleSheet.create({
  content_container: {
    flexGrow: 1,
    backgroundColor: AppColors.LIGHT_BACKGROUND,
    paddingHorizontal: 16,
  },
  date_container: {
    marginTop: 15,
    minHeight: 80,
  },
  date_title: {
    marginBottom: 8,
    fontSize: 12,
  },
  date_time_button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date_button: {
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.GRAY_BACKGROUND,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginRight: 15,
  },
});
