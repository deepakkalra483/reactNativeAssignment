import React, {useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {AppConstants} from '../utils/AppCinstants';
import {RegularText, SemiBoldText} from './CustomText';
import {AppColors} from '../utils/AppColors';
import {taskModal} from '../utils/StaticArray';
import {AppImages} from '../utils/AppImages';
import {IconButton} from './CustomButton';
import moment from 'moment';

interface filterCellProps {
  item: any;
  isEnabled: boolean | false;
  onPress: () => void;
}

export const FilterCell: React.FC<filterCellProps> = ({
  item,
  isEnabled,
  onPress,
}) => {
  return (
    <TouchableOpacity
      key={`aa_${item?.id}`}
      style={[
        styles.filter_cell_container,
        {
          backgroundColor: isEnabled
            ? AppColors.BUTTON_ENABLE
            : AppColors.BUTTON_DISABLE,
        },
      ]}
      activeOpacity={AppConstants.ButtonOpacity}
      onPress={onPress}>
      <SemiBoldText
        color={isEnabled ? AppColors.WHITE_BACKGROUND : AppColors.TEXT_DISABLE}
        text={item?.name}
      />
    </TouchableOpacity>
  );
};

interface TaskCellProps {
  item: taskModal;
  onEdit: () => void;
  onDelete: () => void;
  onView: () => void;
  onToggle: () => void;
}

export const TaskCell: React.FC<TaskCellProps> = React.memo(
  ({item, onEdit, onDelete, onView, onToggle}) => {
    return (
      <TouchableOpacity
        key={`bb_${item?.id}`}
        activeOpacity={AppConstants.ButtonOpacity}
        style={[
          styles.task_cell_container,
          {
            backgroundColor: item?.completed
              ? AppColors.COMPLETE_COLOR
              : AppColors.PENDING_COLOR,
          },
        ]}
        onPress={onView}>
        {/* Task detail view  */}
        <SemiBoldText size={20} text={item.title} />
        {item?.description && (
          <RegularText
            size={14}
            style={styles.description_text}
            text={item?.description}
          />
        )}

        <View style={styles.time_container}>
          <RegularText
            color={AppColors.BLACK_HEADING}
            text={`Status: ${item?.completed ? 'Completed' : 'Pending'}`}
          />
          {item?.dueDate && (
            <RegularText
              text={`Due on: ${moment(item?.dueDate).format(
                'MMMM DD, yyyy hh:mm A',
              )}`}
            />
          )}
        </View>

        {/* Bottom view container of chek box and actions  */}
        <View style={styles.bottom_view_container}>
          <TouchableOpacity
            activeOpacity={AppConstants.ButtonOpacity}
            style={styles.checkbox_container}
            onPress={onToggle}>
            {/* Check box for mark as complete  */}
            <View
              style={[
                styles.checkbox,
                {
                  backgroundColor: item.completed
                    ? AppColors.CHECK_BOX_ACTIVE
                    : 'transparent',
                },
              ]}></View>
            <RegularText
              text={item.completed ? 'Completed' : 'Mark as complete'}
            />
          </TouchableOpacity>

          {/* edit and delete icon conatiner  */}
          <View style={styles.action_conatiner}>
            <IconButton onPress={onEdit} src={AppImages.EDIT_ICON} />
            <IconButton onPress={onDelete} src={AppImages.DELETE_ICON} />
          </View>
        </View>
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  filter_cell_container: {
    borderRadius: 10,
    justifyContent: 'center',
    marginRight: 10,
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  task_cell_container: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 15,
    marginTop: 15,
  },
  description_text: {
    marginTop: 5,
    color: AppColors.GRAY_HEADING,
  },
  time_container: {
    // flexDirection: 'row',
    // alignItems: 'center',
    marginTop: 8,
  },
  clock_image: {
    height: 10,
    width: 10,
    resizeMode: 'contain',
  },
  bottom_view_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15,
  },
  checkbox_container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    borderRadius: 5,
    borderWidth: 1,
    height: 15,
    width: 15,
    marginRight: 10,
  },
  action_conatiner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
