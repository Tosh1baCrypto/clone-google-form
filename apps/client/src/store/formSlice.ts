import { createSlice, type PayloadAction } from '@reduxjs/toolkit' 
import uuid from 'react-uuid' 

export interface QuestionState {
  id: string 
  title: string 
  type: string 
  options?: string[] | null 
}

interface FormState {
  title: string 
  description: string 
  questions: QuestionState[] 
}

const initialState: FormState = {
  title: 'Untitled Form',
  description: '',
  questions: [],
} 

export const formSlice = createSlice({
  name: 'formEditor',
  initialState,
  reducers: {
    resetForm: (state) => {
      state.title = 'Untitled Form' 
      state.description = '' 
      state.questions = [
        { 
          id: `temp-${uuid()}`, 
          title: '', 
          type: 'TEXT', 
          options: [] 
        }
      ] 
    },

    setGlobalTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload 
    },
    setGlobalDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload 
    },
    updateQuestions: (state, action: PayloadAction<QuestionState[]>) => {
      state.questions = action.payload 
    },
  },
}) 

export const { 
  setGlobalTitle, 
  setGlobalDescription, 
  updateQuestions, 
  resetForm 
} = formSlice.actions 

export default formSlice.reducer 