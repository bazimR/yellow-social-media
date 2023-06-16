import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: false,
}

export const storyModelSlice = createSlice({
    name: 'story',
    initialState,
    reducers: {
        setModalStory: (state, action) => {
            state.value = action.payload
        },
    },
})

export const { setModalStory } = storyModelSlice.actions

export default storyModelSlice.reducer