import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: '',
    postModal: false
}

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setPostRedux: (state, action) => {
            state.value = action.payload
        },
        setPostModal: (state, action) => {
            state.postModal = action.payload
        }
    },
})

export const { setPostRedux, setPostModal } = postSlice.actions

export default postSlice.reducer