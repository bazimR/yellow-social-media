import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value:false,
}

export const commentModelSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setModalComment: (state, action) => {
            state.value = action.payload
        },
    },
})

export const { setModalComment } = commentModelSlice.actions

export default commentModelSlice.reducer