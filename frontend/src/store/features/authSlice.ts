import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { axiosInstance } from "./../../lib/axios.ts"
import Axios from "axios"
import { connectToSocket, disconnect } from '../../socket.ts'
import toast from 'react-hot-toast'

// Define a type for the slice state
export interface UserInfo {
  _id: string
  fullName: string
  email: string
  createdAt: string
  profilePic: string
}

export interface ResponseModel {
  success: boolean
  message: string
  data: UserInfo | UserInfo[] | string | ChatUserType[]
}

export const checkAuth = createAsyncThunk<UserInfo, void, { rejectValue: string }>("auth/checkAuth",
  async (_, {rejectWithValue, dispatch}) => {
  try{
    // await new Promise(resolve => setTimeout(resolve, 2000))
    const response = await axiosInstance.get("/auth/checkAuth")
    const responseModel: ResponseModel = response.data

    if(responseModel.success === false) {
      return rejectWithValue(responseModel.message || "Failed to authenticated.")
    }

    console.log("checking auth successfully")
    dispatch(connectSocket((responseModel.data as UserInfo)._id))

    return responseModel.data as UserInfo
  } catch (error) { 
    return rejectWithValue(Axios.isAxiosError(error) ? error.response?.data.message || error.message : "Unknown Error")
  }
})

export const signup =  createAsyncThunk<UserInfo, {fullName: string, email: string, password: string}, {rejectValue: string}>("auth/signup", 
  async (data, { rejectWithValue, dispatch }) => {
    console.log(data)
    try{  
      // await new Promise(resolve => setTimeout(resolve, 2000))
      const response = await axiosInstance.post("/auth/signup",{
        fullName: data.fullName,
        email: data.email,
        profilePic: "",
        password: data.password
      })
      const responseModel: ResponseModel = response.data

      if(responseModel.success === false) {
        return rejectWithValue(responseModel.message || "Failed to sign up.")
      }

      dispatch(connectSocket((responseModel.data as UserInfo)._id))

      return responseModel.data as UserInfo
    } catch (error) {
      return rejectWithValue(Axios.isAxiosError(error) ? error.response?.data.message || error.message : "Unknown Error")
    }
  }
)

export const login = createAsyncThunk<UserInfo, {email: string, password: string}, {rejectValue: string}>("auth/login", 
  async(data, {rejectWithValue, dispatch }) => {
    try{
      // await new Promise(resolve => setTimeout(resolve, 2000))
      const response = await axiosInstance.post("/auth/login", {
        email: data.email,
        password: data.password
      })
      const responseModel: ResponseModel = response.data

      if(responseModel.success === false)  {
        return rejectWithValue(responseModel.message || "Failed to log in.")
      }

      dispatch(connectSocket((responseModel.data as UserInfo)._id))

      return responseModel.data as UserInfo
    } catch (error) {
      console.log(error)
      return rejectWithValue(Axios.isAxiosError(error) ? error.response?.data.message || error.message : "Unknown Error")
    }
  }
)

export const logout = createAsyncThunk<void, void, {rejectValue: string}>("auth/logout",
  async(_, {rejectWithValue, dispatch}) => {
    try{
      // await new Promise(resolve => setTimeout(resolve, 2000))
      const response = await axiosInstance.post("/auth/logout")
      const responseModel: ResponseModel = response.data

      dispatch(disconnectSocket())
      if(responseModel.success === false) {
        return rejectWithValue(responseModel.message || "Failed to log out.")
      }

    } catch (error) {
      return rejectWithValue(Axios.isAxiosError(error) ? error.response?.data.message || error.message : "Unknown Error")
    }
  }
)

export const getUsers = createAsyncThunk<ChatUserType[], void, {rejectValue: string}>("auth/getUsers", 
  async(_, {rejectWithValue}) => {
    try{
      // await new Promise(resolve => setTimeout(resolve, 2000))
      const response = await axiosInstance.get("/users")
      const responseModel: ResponseModel = response.data
      if(responseModel.success === false) {
        return rejectWithValue(responseModel.message || "Failed to fetch chat users")
      }
      console.log("getUsers", responseModel)
      return responseModel.data as ChatUserType[]
    } catch (error) {
      return rejectWithValue(Axios.isAxiosError(error) ? error.response?.data.message || error.message : "Unknown Error")
    }
  }
) 
interface UserSliceState {
  // isLoading: boolean
  // isCheckingAuth: boolean
  // isLoggingIn: boolean
  // isSigningUp: boolean

  status: "loading" | "checkingAuth" | "singingUp" | "loggingIn" | "loggingOut" | "error" | "idle" | "fetchingUsers"
  errorMessage: null | string

  authUser: UserInfo | null
  chatUsers: ChatUserType[]
  onlineUsers: string[]

  isSocketConnected: boolean
  selectedUser: string
}

interface ChatUserType {
  _id: string
  fullName: string
  profilePic: string
  active: boolean
}

// Define the initial state using that type
const initialState: UserSliceState  = {
  // isLoading: false,
  status: "idle",
  errorMessage: null, 

  authUser: null,
  chatUsers: [],
  onlineUsers: [],
  isSocketConnected: false,

  selectedUser: ""
}

export const authSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    connectSocket: (state, action) => {
      // let onlineUsers: string[] | [] = [];
      console.log("connectSocket Dispatch")
      console.log(state.authUser, state.isSocketConnected)
      if(state.authUser !== null || state.isSocketConnected === true) return 
      connectToSocket(action.payload)
      // const socket = connectToSocket(action.payload)
      // socket.on('getOnlineUsers', (userIds: string[]) => {
      //   console.log("userIds", [...userIds])
      //   // onlineUsers = [...userIds]
      //   // console.log("onlineUsers", onlineUsers)
      //   state.onlineUsers = userIds
      //   state.isSocketConnected = true
      // })
      state.isSocketConnected = true
    },
    disconnectSocket: (state) => { 
      disconnect()
      state.isSocketConnected = false
    },
    setSelectedUser: (state, action: PayloadAction<string>) => {
      state.selectedUser = action.payload
    },
    setOnlineUsers: (state, action: PayloadAction<string[]>) => {
      state.onlineUsers = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
    // checkAuth
    .addCase(checkAuth.pending, (state) => {
      state.status = "checkingAuth"
      state.errorMessage = null

      state.authUser = null
    })
    .addCase(checkAuth.fulfilled, (state, action: PayloadAction<UserInfo>) => {
      state.authUser = action.payload
      state.status = "idle"
    })
    .addCase(checkAuth.rejected, (state, action) => {
      state.status = "error"
      state.errorMessage = action.payload || "Unknown Error"
      toast.error(action.payload || "error in checking auth")
    })

    // Signup
    .addCase(signup.pending, (state) => {
      state.status = "singingUp";
      state.errorMessage = null

      state.authUser = null
    })
    .addCase(signup.fulfilled, (state, action) => {
      state.authUser = action.payload
      state.status = "idle"
    })
    .addCase(signup.rejected, (state, action) => {
      state.status = "error"
      state.errorMessage = action.payload || "Unknown Error"
      toast.error(action.payload || "error in sign up")
    })

    // Login
    .addCase(login.pending, (state) => {
      state.status = "loggingIn";
      state.errorMessage = null

      state.authUser = null
    })
    .addCase(login.fulfilled, (state, action) => {
      state.authUser = action.payload
      state.status = "idle"
    })
    .addCase(login.rejected, (state, action) => {
      state.status = "error"
      state.errorMessage = action.payload || "Unknown Error"
      toast.error(action.payload || "error in login")
    })

    // Logout
    .addCase(logout.pending, (state) => {
      state.status = "loggingOut";
      state.errorMessage = null
    })
    .addCase(logout.fulfilled, (state) => {
      state.authUser = null
      state.status = "idle"
    })
    .addCase(logout.rejected, (state, action) => {
      state.status = "error"
      state.errorMessage = action.payload || "Unknown Error"
      toast.error(action.payload || "error in logout")
    })

    // getUsers
    .addCase(getUsers.pending, (state) => {
      state.status = "fetchingUsers";
      state.errorMessage = null
    })
    .addCase(getUsers.fulfilled, (state, action: PayloadAction<ChatUserType[]>) => {
      state.chatUsers = action.payload
      state.status = "idle"
    })
    .addCase(getUsers.rejected, (state, action) => {
      state.status = "error"
      state.errorMessage = action.payload || "Unknown Error"
    });
  },
})

export const { connectSocket, disconnectSocket, setSelectedUser, setOnlineUsers } = authSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default authSlice.reducer