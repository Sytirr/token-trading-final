// 'use client'
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UIState = {
  selectedTokenId: string | null;
  sortBy: { key: string; dir: 'asc' | 'desc' };
  modalOpen: boolean;
}

const initialState: UIState = {
  selectedTokenId: null,
  sortBy: { key: 'marketCap', dir: 'desc' },
  modalOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setSelectedToken(state, action: PayloadAction<string | null>) {
      state.selectedTokenId = action.payload;
    },
    setSort(state, action: PayloadAction<{ key: string; dir: 'asc' | 'desc' }>) {
      state.sortBy = action.payload;
    },
    setModalOpen(state, action: PayloadAction<boolean>) {
      state.modalOpen = action.payload;
    }
  }
});

export const { setSelectedToken, setSort, setModalOpen } = uiSlice.actions;
export default uiSlice.reducer;
