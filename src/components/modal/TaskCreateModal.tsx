import {StyleSheet, View} from 'react-native';
import Modal from 'react-native-modal';
import {IconButton, PressableButton} from '../CustomButton';
import {AppImages} from '../../utils/AppImages';
import CustomInput from '../CustomInput';
import {useState} from 'react';
import {CreateErrorProps, taskModal} from '../../utils/StaticArray';
import moment from 'moment';

interface modalProps {
  isVisible: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  onCreate?: (item: taskModal) => void;
}

const TaskCreateModal: React.FC<modalProps> = ({
  isVisible,
  onClose,
  onCreate,
}) => {
  const [error, setError] = useState<CreateErrorProps>({});
  const [title, setTitle] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);

  const handlePress = () => {
    if (!isValid()) return null;
    onCreate?.({
      title: title,
      description: description,
      completed: false,
      id: moment().valueOf(),
    });
    onClose();
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
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={styles.modal}
      swipeDirection="down"
      onSwipeComplete={onClose}
      backdropOpacity={0.3}>
      <View style={styles.container}>
        <IconButton
          imageStyle={{height: 30, width: 30}}
          src={AppImages.CROSS_ICON}
          onPress={onClose}
        />
        <CustomInput
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
        <PressableButton
          active={title && description ? true : false}
          buttonStyle={{marginTop: 20}}
          title="Create Task"
          onPress={handlePress}
        />
      </View>
    </Modal>
  );
};

export default TaskCreateModal;

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    minHeight: 200,
  },
  dragIndicator: {
    width: 40,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#ccc',
    alignSelf: 'center',
    marginBottom: 10,
  },
});
