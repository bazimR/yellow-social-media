import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    profileModal: false,
    coverModal: false,
}

export const editProfileSlice = createSlice({
    name: 'editProfile',
    initialState,
    reducers: {
        setProfileModal: (state, action) => {
            state.profileModal = action.payload
        },
        setCoverModal: (state, action) => {
            state.coverModal = action.payload
        },
    },
})

export const { setProfileModal, setCoverModal } = editProfileSlice.actions

export default editProfileSlice.reducer