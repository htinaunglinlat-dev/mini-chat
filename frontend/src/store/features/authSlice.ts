import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { axiosInstance } from "./../../lib/axios.ts"
import Axios from "axios"


// Define a type for the slice state
export interface UserInfo {
  _id: string
  fullName: string
  email: string
  createdAt: string
}

export interface ResponseModel {
  success: boolean
  message: string
  data: UserInfo | UserInfo[] | string
}

interface UserSliceState {
  isLoading: boolean
  errorMessage: null | string

  authUser: UserInfo | null
  onlineUsers: UserInfo[]
  socket: WebSocket | null,  
}

export const checkAuth = createAsyncThunk<UserInfo, void, { rejectValue: string }>("auth/checkAuth",
  async (_, {rejectWithValue}) => {
  try{
    await new Promise(resolve => setTimeout(resolve, 2000))
    const response = await axiosInstance.get("/auth/checkAuth")
    const responseModel: ResponseModel = response.data

    if(responseModel.success === false) {
      return rejectWithValue(responseModel.message || "Failed to authenticated.")
    }

    return responseModel.data as UserInfo
  } catch (error) { 
    return rejectWithValue(Axios.isAxiosError(error) ? error.response?.data.message || error.message : "Unknown Error")
  }
})

export const signup =  createAsyncThunk<UserInfo, {fullName: string, email: string, password: string}, {rejectValue: string}>("auth/signup", 
  async (data, { rejectWithValue }) => {
    try{  
      await new Promise(resolve => setTimeout(resolve, 2000))
      const response = await axiosInstance.post("/auth/signup",data)
      const responseModel: ResponseModel = response.data

      if(responseModel.success === false) {
        return rejectWithValue(responseModel.message || "Failed to sign up.")
      }

      return responseModel.data as UserInfo
    } catch (error) {
      return rejectWithValue(Axios.isAxiosError(error) ? error.response?.data.message || error.message : "Unknown Error")
    }
  }
)

export const login = createAsyncThunk<UserInfo, {email: string, password: string}, {rejectValue: string}>("auth/login", 
  async(data, {rejectWithValue}) => {
    try{
      await new Promise(resolve => setTimeout(resolve, 2000))
      const response = await axiosInstance.post("/auth/login", {
        email: data.email,
        password: data.password
      })
      const responseModel: ResponseModel = response.data

      if(responseModel.success === false)  {
        return rejectWithValue(responseModel.message || "Failed to log in.")
      }

      return responseModel.data as UserInfo
    } catch (error) {
      console.log(error)
      return rejectWithValue(Axios.isAxiosError(error) ? error.response?.data.message || error.message : "Unknown Error")
    }
  }
)

export const logout = createAsyncThunk<>("auth/logout",
  async(_, {rejectWithValue}) => {
    try{
      await new Promise(resolve => setTimeout(resolve, 2000))
      const response = await axiosInstance.post("/auth/logout")
      const responseModel: ResponseModel = response.data
      if(responseModel.success === false) {
        return rejectWithValue(responseModel.message || "Failed to log out.")
      }

      return responseModel.data as User
    } catch (error) {

    }
  }
)

// Define the initial state using that type
const initialState: UserSliceState  = {
  isLoading: false,
  errorMessage: null, 

  authUser: null,
  onlineUsers: [],
  socket: null,
}

export const authSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
    // checkAuth
    .addCase(checkAuth.pending, (state) => {
      state.isLoading = true
      state.errorMessage = null

      state.authUser = null
    })
    .addCase(checkAuth.fulfilled, (state, action: PayloadAction<UserInfo>) => {
      state.authUser = action.payload
      state.isLoading = false
    })
    .addCase(checkAuth.rejected, (state, action) => {
      state.isLoading = false
      state.errorMessage = action.payload || "Unknown Error"
    })

    // Signup
    .addCase(signup.pending, (state) => {
      state.isLoading = true;
      state.errorMessage = null

      state.authUser = null
    })
    .addCase(signup.fulfilled, (state, action) => {
      state.authUser = action.payload
      state.isLoading = false
    })
    .addCase(signup.rejected, (state, action) => {
      state.isLoading = false
      state.errorMessage = action.payload || "Unknown Error"
    })

    // Login
    .addCase(login.pending, (state) => {
      state.isLoading = true;
      state.errorMessage = null

      state.authUser = null
    })
    .addCase(login.fulfilled, (state, action) => {
      state.authUser = action.payload
      state.isLoading = false
    })
    .addCase(login.rejected, (state, action) => {
      state.isLoading = false
      state.errorMessage = action.payload || "Unknown Error"
    });
  },
})

// export const { increment, decrement, incrementByAmount } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default authSlice.reducer