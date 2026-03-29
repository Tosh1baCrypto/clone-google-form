import uuid from 'react-uuid' 
import QuestionCard from "./QuestionCard" 
import Sidebar from "./Sidebar" 
import QuestionTitle from './QuestionTitle' 
import { useDispatch, useSelector } from 'react-redux' 
import { updateQuestions } from '../store/formSlice' 
import type { RootState } from '../store/store' 
import { QuestionType } from '../generated/graphql' 

const Question = () => {
  const dispatch = useDispatch() 
  const questions = useSelector((state: RootState) => state.formEditor.questions) 

  const addQuestion = () => {
    type SingleQuestion = (typeof questions)[number];
    const newQuestion: SingleQuestion = {
      id: `temp-${uuid()}`,
      title: '',
      type: QuestionType.MultipleChoice,
      options: ['Option 1'],
    } 

    dispatch(updateQuestions([...questions, newQuestion])) 
  } 

  const moveQuestion = (id: string, direction: 'up' | 'down') => {
    const index = questions.findIndex((q) => q.id === id) 
    if (index === -1) return 

    const newQuestions = [...questions] 
    const targetIndex = direction === 'up' ? index - 1 : index + 1 

    if (targetIndex < 0 || targetIndex >= newQuestions.length) return 

    [newQuestions[index], newQuestions[targetIndex]] = [newQuestions[targetIndex], newQuestions[index]] 

    dispatch(updateQuestions(newQuestions)) 
  } 

  const deleteQuestion = (id: string) => {
    const newQuestions = questions.filter((q) => q.id !== id) 
    dispatch(updateQuestions(newQuestions)) 
  } 

  return (
    <div className="pb-20">
      <QuestionTitle />

      {questions.map((q, index) => (
        <QuestionCard 
          key={q.id} 
          id={q.id} 
          onDelete={deleteQuestion}
          onMove={moveQuestion} 
          isFirst={index === 0} 
          isLast={index === questions.length - 1}
          isOnlyOne={questions.length === 1} 
        />
      ))}

      <Sidebar onAddQuestion={addQuestion}/>
    </div>
  ) 
} 

export default Question