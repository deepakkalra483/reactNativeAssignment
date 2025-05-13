import moment from 'moment';
import Toolbar from '../components/Toolbar';
import {DashboardScreenProps} from '../navigation/NavigationTypes';
import {Alert, FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import {AppStyles} from '../utils/AppStyle';
import {filterData, loadingProps, taskModal} from '../utils/StaticArray';
import {FilterCell, TaskCell} from '../components/DashboardComponent';
import {AppColors} from '../utils/AppColors';
import {useCallback, useEffect, useState} from 'react';
import {IconButton} from '../components/CustomButton';
import {AppImages} from '../utils/AppImages';
import {getTasks} from '../networking/Tasks';
import TaskLoader from '../components/shimmer/TaskLoader';
import {
  addMoreTask,
  deleteTask,
  setAllTasks,
  toggleTaskComplete,
} from '../redux/slices/TaskSlice';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {
  getLocalTask,
  getPage,
  setPageToLocal,
  storeTask,
} from '../storage/AsyncStorage';
import {Toast} from '../utils/AppFunctions';

const DashboardScreen: React.FC<DashboardScreenProps> = ({navigation}) => {
  const currentMoment = moment();
  // get curent month and year
  const currentMonthYear = currentMoment.format('MMMM YYYY');

  // get full date with day month
  const fullDate = currentMoment.format('dddd, MMMM DD, YYYY');

  const [selectTab, setSelectedTab] = useState<any>({id: 1, name: 'All'});
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(5);
  const [loading, setLoading] = useState<loadingProps>({
    refreshing: false,
    fetching: false,
    more: false,
  });
  const dispatch = useDispatch();
  const taskList = useSelector((state: RootState) => state?.task?.allTask);

  const filterdList = taskList?.filter(task => {
    if (selectTab?.name === 'Complete') return task?.completed;
    if (selectTab?.name === 'Pending') return !task?.completed;
  });

  // Delete task
  const handleDelete = useCallback((id: number) => {
    Alert.alert('Delete Task', 'Are you sure you want to delete this task?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => {
          dispatch(deleteTask(id));
          Toast({type: 'success', message: 'Task deleted successfully'});
        },
      },
    ]);
  }, []);

  // Edit task
  const handleEdit = useCallback((item: taskModal) => {
    navigation.navigate('TaskCreate', {item: item, screen: 1});
  }, []);

  // view tasK detail screen
  const handleView = useCallback((item: taskModal) => {
    navigation.navigate('TaskDetail', {item: item});
  }, []);

  const handleToggle = useCallback((id: number) => {
    dispatch(toggleTaskComplete(id));
  }, []);

  // rferesh list by pull
  const onRefresh = useCallback(() => {
    setLoading(prev => ({...prev, refreshing: true}));
    fetchTasks();
  }, []);

  const sortByDueDate = (tasks: taskModal[]) => {
    return [...tasks].sort((a, b) => {
      const aDate = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
      const bDate = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
      return aDate - bDate;
    });
  };

  const fetchTasks = async () => {
    if (page == 1) {
      const currentPage = await getPage();
      if (currentPage) {
        setPage(currentPage);
      } else {
        setPageToLocal(1);
      }
    }

    const result = await getLocalTask();
    // if task not avialble in local storage
    if (!result) {
      getTasks({
        onLoading: load => null,
        params: {_page: page},
        onSuccess: data => {
          dispatch(setAllTasks(data));
          setLoading(prev => ({...prev, refreshing: false, fetching: false}));
        },
        onError: errror => console.log('error---', errror),
      });
    } else {
      dispatch(setAllTasks(result));
      setLoading(prev => ({...prev, fetching: false, refreshing: false}));
    }
  };

  useEffect(() => {
    setLoading(prev => ({...prev, fetching: true}));
    fetchTasks();
  }, []);

  const LoadMore = async () => {
    if (!loading?.more) {
      console.log('load more');
      setLoading(prev => ({...prev, more: true}));
      getTasks({
        onLoading: load => setLoading(prev => ({...prev, more: load})),
        params: {_page: page + 1},
        onSuccess: data => {
          dispatch(addMoreTask(data));
          setPageToLocal(page + 1);
          setPage(page + 1);
        },
        onError: errror => console.log('error---', errror),
      });
    }
  };

  // update list in local storage whenever edit or toggle
  useEffect(() => {
    if (taskList?.length > 0) {
      storeTask(taskList);
    }
  }, [taskList]);

  const renderTaskCell = useCallback(
    ({item}: {item: taskModal}) => (
      <TaskCell
        item={item}
        onDelete={() => handleDelete(item.id)}
        onEdit={() => handleEdit(item)}
        onView={() => handleView(item)}
        onToggle={() => handleToggle(item?.id)}
      />
    ),
    [handleDelete, handleEdit, handleView, handleToggle],
  );

  const renderFooter = () => {
    return loading?.more ? <TaskLoader /> : null;
  };
  return (
    <View style={AppStyles.container}>
      <Toolbar leftdescription={fullDate} leftTitle={currentMonthYear} />

      <View style={styles.content_container}>
        {/* Filter Conatiner  */}
        <View style={styles.filterContainer}>
          {filterData.map(item => (
            <FilterCell
              isEnabled={selectTab?.id == item?.id}
              item={item}
              onPress={() => setSelectedTab(item)}
            />
          ))}
        </View>

        {/* task List and shimmer loader while fetching  */}
        {taskList?.length > 0 && !loading?.fetching ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.task_list}
            data={
              selectTab?.name == 'All'
                ? sortByDueDate(taskList)
                : sortByDueDate(filterdList)
            }
            renderItem={renderTaskCell}
            onEndReached={LoadMore}
            ListFooterComponent={renderFooter}
            keyExtractor={item => item.id.toString()}
            refreshControl={
              <RefreshControl
                refreshing={loading.refreshing}
                onRefresh={onRefresh}
              />
            }
          />
        ) : (
          Array.from({length: 7}).map((_, index) => (
            <View style={styles.shimmer_container}>
              <TaskLoader index={index} />
            </View>
          ))
        )}

        {/* craete new task button  */}
        <IconButton
          src={AppImages.CREATE_ICON}
          onPress={() => navigation.navigate('TaskCreate')}
          buttonStyle={styles.create_button}
          imageStyle={styles.create_icon}
        />
      </View>
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  content_container: {
    flex: 1,
    backgroundColor: AppColors.LIGHT_BACKGROUND,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  task_list: {
    paddingHorizontal: 16,
    paddingBottom: 15,
  },
  create_button: {
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
  create_icon: {
    height: 40,
    width: 40,
  },
  shimmer_container: {
    marginHorizontal: 16,
    elevation: 1,
    borderRadius: 15,
    backgroundColor: AppColors.WHITE_BACKGROUND,
    marginTop: 15,
  },
});
