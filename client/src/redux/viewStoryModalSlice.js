import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: false,
    data: ""
}

export const viewStoryModalSlice = createSlice({
    name: 'viewstory',
    initialState,
    reducers: {
        setViewStoryModal: (state, action) => {
            state.value = action.payload
        },
        setDataViewStory: (state, action) => {
            state.data = action.payload
        }
    },
})

export const { setViewStoryModal ,setDataViewStory} = viewStoryModalSlice.actions

export default viewStoryModalSlice.reducer