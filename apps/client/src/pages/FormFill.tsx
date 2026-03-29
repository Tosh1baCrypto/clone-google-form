import { useState } from 'react' 
import { useParams, useNavigate } from 'react-router-dom' 
import { 
  Radio, 
  Checkbox, 
  FormControlLabel, 
  CircularProgress,
  Paper
} from '@mui/material' 
import { useGetFormQuery, useSubmitResponseMutation, QuestionType } from '../generated/graphql' 

type AnswerValue = string | string[];
type AnswersState = Record<string, AnswerValue>;

const FormFill = () => {
  const { id } = useParams<{ id: string }>() 
  const navigate = useNavigate() 
  
  const { data, isLoading, error } = useGetFormQuery({ id: id || '' }) 
  const [submitResponse, { isLoading: isSubmitting }] = useSubmitResponseMutation() 

  const [answers, setAnswers] = useState<AnswersState>({}) 

  if (isLoading) return <div className="flex justify-center mt-20"><CircularProgress /></div> 
  if (error || !data?.form) return <div className="text-center mt-20 text-red-500">Form not found</div> 

  const { form } = data 

  const handleAnswerChange = (questionId: string, value: string, isCheckbox = false) => {
    setAnswers(prev => {
      if (isCheckbox) {
        const currentAnswers = (prev[questionId] as string[]) || [] 
        const newAnswers = currentAnswers.includes(value)
          ? currentAnswers.filter((a) => a !== value)
          : [...currentAnswers, value] 
        return { ...prev, [questionId]: newAnswers } 
      }
      return { ...prev, [questionId]: value } 
    }) 
  } 

  const handleSubmit = async () => {
    try {
      const formattedAnswers = Object.entries(answers).map(([questionId, value]) => ({
        questionId,
        value: Array.isArray(value) ? value.join(', ') : String(value)
      })) 

      await submitResponse({
        formId: id!,
        answers: formattedAnswers
      }).unwrap() 

      alert('Form submitted successfully!') 
      navigate('/') 
    } catch (e: unknown) {
      console.error(e) 
      alert('Error submitting form') 
    }
  } 

  return (
    <div className="min-h-screen bg-[#f0ebf8] pb-10">
      <div className="max-w-3xl mx-auto pt-8">
        {/* Header Card */}
        <Paper className="p-6 border-t-10 border-t-gray-400 rounded-t-lg shadow-sm mb-4">
          <h1 className="text-3xl font-bold mb-2">{form.title}</h1>
          <p className="text-gray-600">{form.description}</p>
        </Paper>

        {/* Questions List */}
        {form.questions.map((q) => (
          <Paper key={q.id} className="p-6 mb-4 shadow-sm border border-gray-200 rounded-lg">
            <p className="text-base font-medium mb-6">{q.title}</p>
            
            <div className="mt-2">
              {q.type === QuestionType.Text && (
                <input 
                  placeholder="Your answer"
                  value={(answers[q.id] as string) || ''}
                  onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                  className='w-full text-base font-normal outline-none border-b border-gray-200 focus:border-gray-500 transition-colors pb-1'
                />
              )}

              {q.type === QuestionType.MultipleChoice && (
                <div className="flex flex-col gap-1">
                  {q.options?.map((opt, i) => (
                    <FormControlLabel
                      key={i}
                      label={<span className="text-sm">{opt}</span>}
                      control={
                        <Radio 
                          checked={answers[q.id] === opt} 
                          onChange={() => handleAnswerChange(q.id, opt)}
                          sx={{
                            color: '#9ca3af', 
                            '&.Mui-checked': { color: '#4b5563' },
                          }}
                        />
                      }
                    />
                  ))}
                </div>
              )}

              {q.type === QuestionType.Checkbox && (
                <div className="flex flex-col gap-1">
                  {q.options?.map((opt, i) => (
                    <FormControlLabel
                      key={i}
                      control={
                        <Checkbox 
                          checked={((answers[q.id] as string[]) || []).includes(opt)}
                          onChange={() => handleAnswerChange(q.id, opt, true)}
                          sx={{
                            color: '#9ca3af',
                            '&.Mui-checked': { color: '#4b5563' },
                          }}
                        />
                      }
                      label={<span className="text-sm">{opt}</span>}
                    />
                  ))}
                </div>
              )}

              {q.type === QuestionType.Date && (
                <input 
                  type="date"
                  value={(answers[q.id] as string) || ''}
                  onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                  className="text-black border-b border-gray-300 outline-none pb-1 bg-transparent focus:border-gray-500"
                />
              )}
            </div>
          </Paper>
        ))}

        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-6">
          <div className="flex gap-2">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="group flex items-center justify-center px-1 py-1 rounded-3xl focus:outline-none transition-all bg-gray-200"
            >
              <span className='group-hover:bg-white px-6 rounded-3xl py-2 transition-colors font-medium'>
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </span>
            </button>
            
            <button
              onClick={() => setAnswers({})}
              className='group flex items-center justify-center px-1 py-1 rounded-3xl focus:outline-none transition-all bg-transparent'
            >
              <span className='hover:bg-gray-100 px-4 rounded-3xl py-2 transition-colors text-gray-600 text-sm font-medium'>
                Clear form
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  ) 
} 

export default FormFill