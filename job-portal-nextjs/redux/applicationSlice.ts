import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Application {
  _id: string
  job: any
  applicant: any
  status: string
  createdAt: string
}

interface ApplicationState {
  applicants: Application[]
}

const initialState: ApplicationState = {
  applicants: [],
}

const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    setAllApplicants: (state, action: PayloadAction<Application[]>) => {
      state.applicants = action.payload
    },
  },
})

export const { setAllApplicants } = applicationSlice.actions
export default applicationSlice.reducer
