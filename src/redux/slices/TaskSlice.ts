import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {taskModal} from '../../utils/StaticArray';

interface TaskState {
  allTask: Array<taskModal> | [];
}

const initialState: TaskState = {
  allTask: [],
};

const TaskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setAllTasks: (state, action: PayloadAction<Array<taskModal>>) => {
      state.allTask = action.payload;
    },
    toggleTaskComplete: (state, action: PayloadAction<number>) => {
      const index = state.allTask.findIndex(task => task.id === action.payload);
      if (index !== -1) {
        state.allTask[index].completed = !state.allTask[index].completed;
      }
    },
    editTask: (
      state,
      action: PayloadAction<{id: number; updatedTask: Partial<taskModal>}>,
    ) => {
      const {id, updatedTask} = action.payload;
      const index = state.allTask.findIndex(task => task.id === id);
      if (index !== -1) {
        state.allTask[index] = {...state.allTask[index], ...updatedTask};
      }
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.allTask = state.allTask.filter(task => task.id !== action.payload);
    },
    addTask: (state, action: PayloadAction<taskModal>) => {
      state.allTask.unshift(action.payload);
    },
    addMoreTask: (state, action: PayloadAction<taskModal[]>) => {
      state.allTask = [...state.allTask, ...action.payload];
    },
    clearAllTasks: state => {
      state.allTask = [];
    },
  },
});

export const {
  setAllTasks,
  clearAllTasks,
  toggleTaskComplete,
  editTask,
  deleteTask,
  addTask,
  addMoreTask,
} = TaskSlice.actions;

export default TaskSlice.reducer;
