import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFilterState } from '../../types/IFilterState';

const initialState: IFilterState = {
  startDate: null,
  transplants: [-1],
  currency: 'RUB',
  currencyRates: {
    RUB: 1,
    USD: 73,
    EUR: 85,
  },
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setStartDate: (state, action: PayloadAction<string | null>) => {
      state.startDate = action.payload;
    },
    setTransplants: (state, action: PayloadAction<number[]>) => {
      state.transplants = action.payload;
    },
    setCurrency: (state, action: PayloadAction<string>) => {
      state.currency = action.payload;
    },
  },
});

export const { setStartDate, setTransplants, setCurrency } = filterSlice.actions;
export default filterSlice.reducer;
