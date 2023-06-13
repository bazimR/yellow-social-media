import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value:'',
}

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setPostRedux: (state, action) => {
            state.value = action.payload
        },
    },
})

export const { setPostRedux } = postSlice.actions

export default postSlice.reducer