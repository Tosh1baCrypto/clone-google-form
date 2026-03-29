import { IconButton, Select, MenuItem, FormControl, Divider } from '@mui/material'
import {
  Delete, ArrowUpward, ArrowDownward,
  ShortText, RadioButtonChecked,
  CheckBox as CheckBoxIcon,
  Event as EventIcon, 
  RadioButtonUnchecked,
  CheckBoxOutlineBlank
} from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { updateQuestions } from '../store/formSlice'
import type { RootState } from '../store/store'
import { QuestionType } from '../generated/graphql'

interface QuestionCardProps {
  id: string
  onDelete: (id: string) => void
  onMove: (id: string, direction: 'up' | 'down') => void
  isFirst: boolean
  isLast: boolean
  isOnlyOne: boolean
}

const QuestionCard = ({ id, onDelete, onMove, isFirst, isLast, isOnlyOne }: QuestionCardProps) => {
  const dispatch = useDispatch()

  const questions = useSelector((state: RootState) => state.formEditor.questions)
  const currentQuestion = questions.find(q => q.id === id)

  if (!currentQuestion) return null

  const syncWithRedux = (updates: Partial<(typeof questions)[number]>) => {
    const newQuestions = questions.map((q) => 
      q.id === id ? { ...q, ...updates } : q
    )
    dispatch(updateQuestions(newQuestions))
  }

  const handleTypeChange = (newType: string) => {
    let formattedType: QuestionType

    switch (newType) {
      case 'short_answer': formattedType = QuestionType.Text; break
      case 'multiple_choice': formattedType = QuestionType.MultipleChoice; break
      case 'checkboxes': formattedType = QuestionType.Checkbox; break
      case 'date': formattedType = QuestionType.Date; break
      default: formattedType = QuestionType.Text
    }

    syncWithRedux({ 
      type: formattedType,
      options: (formattedType === QuestionType.Text || formattedType === QuestionType.Date) ? [] : ['Option 1']
    })
  }

  const handleTitleChange = (newTitle: string) => syncWithRedux({ title: newTitle })

  const addOption = () => {
    const newOptions = [...(currentQuestion.options || []), `Option ${(currentQuestion.options?.length || 0) + 1}`]
    syncWithRedux({ options: newOptions })
  }

  const handleOptionChange = (index: number, newText: string) => {
    const newOptions = [...(currentQuestion.options || [])]
    newOptions[index] = newText
    syncWithRedux({ options: newOptions })
  }

  const removeOption = (index: number) => {
    const newOptions = currentQuestion.options?.filter((_, i) => i !== index)
    syncWithRedux({ options: newOptions })
  }

  const renderAnswerSection = () => {
    const type = currentQuestion.type

    switch (type) {
      case QuestionType.MultipleChoice:
      case QuestionType.Checkbox: {
        const Icon = type === QuestionType.MultipleChoice ? RadioButtonUnchecked : CheckBoxOutlineBlank
        return (
          <div className="space-y-3">
            {(currentQuestion.options || []).map((optionText, index) => (
              <div key={index} className="flex items-center gap-x-3 group max-w-2xs rounded-lg transition-colors">
                <Icon className="text-gray-300" fontSize="small" />
                <input 
                  type="text" 
                  value={optionText}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  className="text-sm outline-none border-b border-transparent focus:border-gray-300 pb-1 w-full max-w-36" 
                />
                {(currentQuestion.options?.length || 0) > 1 && (
                  <IconButton size="small" onClick={() => removeOption(index)} className="opacity-0 group-focus-within:opacity-100 transition-opacity">
                    <Delete fontSize="small" />
                  </IconButton>
                )}
              </div>
            ))}
            <div className="flex items-center gap-x-3">
              <Icon className="text-gray-300" fontSize="small" />
              <button onClick={addOption} className="text-sm text-gray-400 hover:text-gray-600 transition-colors text-left">
                Add option
              </button>
            </div>
          </div>
        )
      }
      case QuestionType.Text:
        return (
          <div className="w-3/5 border-b border-dotted border-gray-400 py-2">
            <p className="text-gray-400 text-sm">Short answer text</p>
          </div>
        )
      case QuestionType.Date:
        return (
          <div className="w-48 flex items-center justify-between border-b border-gray-300 py-2 text-gray-500">
            <span className="text-sm">Month, day, year</span>
            <EventIcon fontSize="small" /> 
          </div>
        )
      default: return null
    }
  }

  return (
    <div 
      tabIndex={0}
      className="max-w-3xl mx-auto my-4 bg-white rounded-lg shadow border-y border-r border-gray-200 relative overflow-hidden transition-all outline-none"
    >
      <div className="p-6">
        <div className="flex justify-center gap-x-7">
          <input 
            value={currentQuestion.title || ''}
            onChange={(e) => handleTitleChange(e.target.value)}
            type="text" 
            placeholder="Question" 
            className="w-full flex-1 gap-x-4 mb-8 bg-gray-50 p-4 border-b border-gray-300 rounded-lg hover:bg-gray-100 focus-within:bg-gray-100 transition-colors outline-none text-base text-gray-800 placeholder:text-gray-500"
          />

          <FormControl variant="outlined" size="small" className="w-52">
            <Select
              value={
                currentQuestion.type === QuestionType.Text ? 'short_answer' :
                currentQuestion.type === QuestionType.MultipleChoice ? 'multiple_choice' :
                currentQuestion.type === QuestionType.Checkbox ? 'checkboxes' :
                currentQuestion.type === QuestionType.Date ? 'date' : 'short_answer'
              }
              onChange={(e) => handleTypeChange(e.target.value as string)}
              className="text-sm bg-white"
              sx={{
                fontSize: '14px',
                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e0e0e0' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#bdbdbd' },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#4b5563', borderWidth: '1px' },
                '& .MuiSelect-icon': { color: '#6b7280' }
              }}
              renderValue={(selected) => {
                switch (selected) {
                  case 'short_answer': return <div className="flex items-center gap-2"><ShortText fontSize="small" /> Short answer</div>
                  case 'multiple_choice': return <div className="flex items-center gap-2"><RadioButtonChecked fontSize="small"/> Multiple choice</div>
                  case 'checkboxes': return <div className="flex items-center gap-2"><CheckBoxIcon fontSize="small" /> Checkboxes</div>
                  case 'date': return <div className="flex items-center gap-2"><EventIcon fontSize="small"/> Date</div>
                  default: return selected
                }
              }}
            >
              <MenuItem value="short_answer" className="flex items-center gap-2"><ShortText fontSize="small" /> Short answer</MenuItem>
              <MenuItem value="multiple_choice" className="flex items-center gap-2"><RadioButtonChecked fontSize="small" /> Multiple choice</MenuItem>
              <MenuItem value="checkboxes"className="flex items-center gap-2"><CheckBoxIcon fontSize="small" />Checkboxes</MenuItem>
              <MenuItem value="date"className="flex items-center gap-2"><EventIcon fontSize="small" />Date</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className="min-h-28 mb-8 px-2">
          {renderAnswerSection()}
        </div>

        <Divider />

        <div className="flex items-center justify-end mt-4 gap-x-2 text-gray-400">
          <IconButton size="small" onClick={() => onMove(id, 'up')} disabled={isFirst}>
            <ArrowUpward fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={() => onMove(id, 'down')} disabled={isLast}>
            <ArrowDownward fontSize="small" />
          </IconButton>
          {!isOnlyOne && (
            <IconButton size="small" onClick={() => onDelete(id)}>
              <Delete fontSize="small" />
            </IconButton>
          )}
        </div>
      </div>
    </div>
  )
}

export default QuestionCard