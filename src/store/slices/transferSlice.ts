import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';
import { transferCheckboxes } from '../utils';
import { TransferPayload, TransferState } from '../types';

const initialState: TransferState = {
  checkboxes: transferCheckboxes,
};

export const transferSlice = createSlice({
  name: 'transfer',
  initialState,
  reducers: {
    setTransferCheckboxes: (state, action: PayloadAction<TransferPayload>) => {
      const { name, checked } = action.payload;
      const result = state.checkboxes.map((item) => {
        if (name === 'all') return { ...item, checked };
        return item.name === name ? { ...item, checked } : item;
      });
      const [all, ...rest] = result;
      const isAll = rest.every((item) => item.checked === true);
      all.checked = isAll;
      state.checkboxes = [all, ...rest];
    },
  },

});

export const { setTransferCheckboxes } = transferSlice.actions;

export const selectTransferCheckboxes = (state: RootState) => state.transfer.checkboxes;

export default transferSlice.reducer;
