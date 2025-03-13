import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'
// import type { RootState } from '../../app/store'
import { PayloadAction } from '@reduxjs/toolkit'

interface ResponseModel {
  success: boolean,
  messages: MessageType[]
}

export const fetchMessage = createAsyncThunk<MessageType[], {userId: string}>('message/fetchMessage', async(arg) => {
  // 67cbf205787a828990371e13
  const {userId}  = arg
  try{
    const response = await fetch(`http://localhost:3000/api/message/getAllMessages/${userId}`, {
      method: "get"
    })
    if(!response.ok) throw new Error('fetching error in messages')
    const data: ResponseModel  =  await response.json()
    return data.messages
  } catch (error) {
    let errorMessage = error instanceof Error ? error.message : "Unknown Error Occurred."
    throw new Error(errorMessage)
  }
})

// Define a type for the slice state
export interface MessageType {
  to: string,
  content: string,
  time?: string
}

interface MessageSliceState {
  isLoading: boolean,
  errorMessage: string | null,
  messages: MessageType[]
}

// Define the initial state using that type
const initialState: MessageSliceState  = {
  isLoading: false,
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
    builder
    .addCase(fetchMessage.pending, (state) => {
      state.messages = []
      state.isLoading = true
      state.errorMessage = null
    })
    .addCase(fetchMessage.fulfilled, (state, action: PayloadAction<MessageType[]>) => {
      state.isLoading = false
      state.messages = action.payload
    })
    .addCase(fetchMessage.rejected, (state, action) => {
      state.isLoading = false
      state.errorMessage = action.error.message || 'Unknown Error'
    })
  }
})

// export const { increment, decrement, incrementByAmount } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default messageSlice.reducer