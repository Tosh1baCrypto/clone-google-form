import { useParams } from 'react-router-dom'
import { useGetFormQuery } from '../generated/graphql'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { setGlobalTitle, setGlobalDescription, updateQuestions, resetForm } from '../store/formSlice'
import HeaderForm from "../components/HeaderForm"
import Question from "../components/Question"
import Tabs from "../components/Tabs"
import FormResponses from "../components/FormResponses"

const Form = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  
  const [activeTab, setActiveTab] = useState<'questions' | 'responses'>('questions')
  
  const { data, isLoading, refetch } = useGetFormQuery(
    { id: id || '' }, 
    { skip: !id || id === 'new' }
  )

  useEffect(() => {
    if (id === 'new') {
      dispatch(resetForm()) 
      setActiveTab('questions') 
    }
  }, [id, dispatch]) 

  useEffect(() => {
    if (id && id !== 'new' && data?.form) {
      dispatch(setGlobalTitle(data.form.title)) 
      dispatch(setGlobalDescription(data.form.description || '')) 
      dispatch(updateQuestions(data.form.questions || [])) 
    }
  }, [data, id, dispatch]) 

  useEffect(() => {
    if (id && id !== 'new') {
      refetch() 
    }
  }, [id, refetch]) 

  if (isLoading && id !== 'new') return <div className="flex justify-center mt-20">Loading...</div>

  return (
    <div className="min-h-screen bg-white">
      <HeaderForm />
      
      {id && id !== 'new' && (
        <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
      )}
      
      <main className="pb-10">
        {activeTab === 'questions' ? (
          <Question />
        ) : (
          <FormResponses />
        )}
      </main>
    </div>
  )
}

export default Form