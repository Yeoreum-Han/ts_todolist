import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

// Define a type for the slice state
interface DateState {
  day: number;
  localeDate: string;
}

// Define the initial state using that type
const initialState: DateState = {
  day: 0,
  localeDate: new Date().toLocaleDateString(),
}

export const dateSlice = createSlice({
  name: 'date',
  initialState,
  reducers: {
    saveDayNum: (state, action: PayloadAction<number>) => {
      state.day = action.payload;
    },
    saveLocaleDate: (state, action: PayloadAction<string>)=>{
      state.localeDate = action.payload;
    }
  },
})

// export const { saveDayNum, saveMonthNum, saveDateNum, saveFullDateNum } = dateSlice.actions
export const { saveDayNum, saveLocaleDate } = dateSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectDay = (state: RootState) => state.date.day;
export const selectLocaleDate = (state: RootState) => state.date.localeDate;

export default dateSlice.reducer
