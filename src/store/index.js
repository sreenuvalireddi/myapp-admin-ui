import { configureStore, createSlice } from '@reduxjs/toolkit'

const initialAuthState = {
  users: [], // registered users
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    registerUser(state, action) {
      // action.payload should be { firstName, lastName, phone, email, password }
      const existing = state.users.find(
        (u) => u.email === action.payload.email || u.phone === action.payload.phone
      )
      if (!existing) {
        state.users.push(action.payload)
      }
    },
    clearUsers(state) {
      state.users = []
    }
  }
})

export const { registerUser, clearUsers } = authSlice.actions

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
})

export default store
