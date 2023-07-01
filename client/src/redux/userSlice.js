import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: {},
    profileId: ''
}

export const userSlice = createSlice({
    name: 'username',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.value = action.payload
        },
        setProfileId: (state, action) => {
            state.profileId = action.payload
        },
    },
})

export const { setUser, setProfileId } = userSlice.actions

export default userSlice.reducer