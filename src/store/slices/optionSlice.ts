import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { optionTabs } from '../utils';
import { OptionState } from '../types';
import type { RootState } from '../index';

const initialState: OptionState = {
  activeTab: optionTabs[0],
};

const optionSlice = createSlice({
  name: 'option',
  initialState,
  reducers: {
    setActiveTab: (state, action:PayloadAction<string>) => {
      let current = state.activeTab;

      optionTabs.forEach((item) => {
        if (item.name === action.payload) {
          current = item;
        }
      });

      state.activeTab = current;
    },
  },
});

export const { setActiveTab } = optionSlice.actions;

export const selectActiveTab = ({ option }: RootState) => option.activeTab;

export default optionSlice.reducer;
