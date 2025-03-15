import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'
// import type { RootState } from '../../app/store'
import { PayloadAction } from '@reduxjs/toolkit'
import { axiosInstance } from '../../lib/axios'
import { RootState } from '../store'
import Axios from 'axios'
import toast from 'react-hot-toast'

interface MessageType {
  _id: string
  senderId: string
  receiverId: string
  message: string
  createdAt: string
  updatedAt: string
}

interface ResponseModel {
  success: boolean,
  message: string
  data: MessageType[]
}

interface MessageSliceState {
  status: "fetchingMessages" | "idle" | "error" | "sendingMessage"
  errorMessage: string | null,
  messages: MessageType[]
}

export const fetchMessage = createAsyncThunk<MessageType[], void, {rejectValue: string, state: RootState}>('message/fetchMessage', 
  async(_, {getState, rejectWithValue}) => {
  const state = getState()
  const selectedUser = state.auth.selectedUser
  // 67cbf205787a828990371e13
  try{
    const response = await axiosInstance.get(`/messages/${selectedUser}`) 
    const responseModel: ResponseModel = response.data
    if(responseModel.success === false) {
      return rejectWithValue(responseModel.message || "failed to fetch messages")
    }
    // console.log("messages", response.data)
    // console.log('responseModel.data', responseModel.data)
    return (responseModel.data || []) as MessageType[]
  } catch (error) {
    let errorMessage = error instanceof Error ? error.message : "Unknown Error Occurred."
    throw new Error(errorMessage)
  }
})

export const sendMessage = createAsyncThunk<void, string, {rejectValue: string, state: RootState}>('message/sendMessage', 
  async(message, {getState, rejectWithValue, dispatch}) => {
    const state = getState()
    const selectedUser = state.auth.selectedUser
    try{
      const response = await axiosInstance.post(`/messages/send/${selectedUser}`, {
        message
      })
      const responseModel: ResponseModel = response.data
      if(responseModel.success === false) {
        return rejectWithValue(responseModel.message || "failed to send message")
      }
      dispatch(fetchMessage())
      // return responseModel.data as MessageType[]
    } catch (error) {
      return rejectWithValue(Axios.isAxiosError(error) ? error.response?.data.message || error.message : "Unknown error at sending message.")
    }
  }
)

// Define the initial state using that type
const initialState: MessageSliceState  = {
  status: "idle",
  errorMessage: null, 
  messages: []
}

export const messageSlice = createSlice({
  name: 'message',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    // get all messages
    builder
    .addCase(fetchMessage.pending, (state) => {
      state.messages = []
      state.status = "fetchingMessages"
      state.errorMessage = null
    })
    .addCase(fetchMessage.fulfilled, (state, action: PayloadAction<MessageType[]>) => {
      state.status = "idle"
      state.messages = action.payload
    })
    .addCase(fetchMessage.rejected, (state, action) => {
      state.status = "error"
      state.errorMessage =  action.payload || 'Unknown Error'
    })

    // send message
    builder
    .addCase(sendMessage.pending, (state) => {
      state.status = "sendingMessage"
      state.errorMessage = null
    })
    .addCase(sendMessage.fulfilled, (state) => {
      state.status = "idle"
    })
    .addCase(sendMessage.rejected, (state, action) => {
      state.status = "error"
      state.errorMessage =  action.payload || 'Unknown Error'
      toast.error(action.payload || "unknown error in sending message")
    })
  }
})

// export const { increment, decrement, incrementByAmount } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default messageSlice.reducer