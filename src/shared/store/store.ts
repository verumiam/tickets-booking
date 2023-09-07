import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { ticketsApi } from "../../entities";
import filtersReducer from '../../entities/ticketList/model/slices/filterSlices';

export const store = configureStore({
  reducer: {
    [ticketsApi.reducerPath]: ticketsApi.reducer,
    filters: filtersReducer
  },
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(ticketsApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
