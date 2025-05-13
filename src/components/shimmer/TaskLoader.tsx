import React from 'react';
import {StyleSheet, View} from 'react-native';
import {AppColors} from '../../utils/AppColors';
import ShimmerCustomView from './ShimmerCustomView';

const TaskLoader = (index:any) => {
  return (
    <View key={`cc_${index}`} style={styles.container}>
      <View style={styles.title_style}>
        <ShimmerCustomView />
      </View>
      <View style={styles.description_style}>
        <ShimmerCustomView />
      </View>
      <View style={styles.action_container}>
        <View style={styles.button}>
          <ShimmerCustomView />
        </View>
        <View style={styles.button}>
          <ShimmerCustomView />
        </View>
      </View>
    </View>
  );
};

export default TaskLoader;

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    backgroundColor: AppColors.LIGHT_BACKGROUND,
    paddingHorizontal: 10,
    height: 100,
    marginTop: 15,
  },
  title_style: {
    height: 20,
    borderRadius: 5,
    width: '80%',
  },
  description_style: {
    height: 12,
    borderRadius: 5,
    marginTop: 8,
    width: '55%',
  },
  action_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  button: {
    height: 35,
    width: '35%',
    borderRadius: 10,
  },
});
