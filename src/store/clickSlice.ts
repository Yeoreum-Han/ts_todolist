import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

interface ClickState {
    isClicked: boolean
}

const initialState: ClickState = {
    isClicked: false
}

export const clcikSlice = createSlice({
    name: 'clicked',
    initialState,
    reducers: {
        setIsDateClicked:(state, action: PayloadAction<boolean>) => {
            state.isClicked = action.payload;
        }
    },
})

export const { setIsDateClicked } = clcikSlice.actions

export const dateClicked = (state: RootState) => state.clicked;

export default clcikSlice.reducer