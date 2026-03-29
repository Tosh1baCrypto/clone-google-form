import { useNavigate, useParams } from 'react-router-dom' 
import { 
  useCreateFormMutation, 
  useUpdateFormMutation, 
  type CreateFormInput, 
  type QuestionInput,
  QuestionType 
} from '../generated/graphql' 
import { useSelector } from 'react-redux' 
import { type RootState } from '../store/store' 
import ContentCopyIcon from '@mui/icons-material/ContentCopy' 
import HomeIcon from '@mui/icons-material/Home'
import { Avatar, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye' 

const HeaderForm = () => {
  const navigate = useNavigate() 
  const { id } = useParams<{ id: string }>() 
  
  const formData = useSelector((state: RootState) => state.formEditor) 

  const [createForm, { isLoading: isCreating }] = useCreateFormMutation() 
  const [updateForm, { isLoading: isUpdating }] = useUpdateFormMutation() 

  const isLoading = isCreating || isUpdating 

  const handleSave = async () => {
    const payload: CreateFormInput = {
      title: formData.title,
      description: formData.description,
      questions: formData.questions.map((q): QuestionInput => ({
        id: q.id.includes('temp') ? undefined : q.id, 
        title: q.title,
        type: q.type as QuestionType, 
        options: q.options || []
      }))
    } 

    try {
      if (id && id !== 'new') {
        await updateForm({ id, input: payload }).unwrap() 
        alert("Data updated!") 
      } 
      else {
        const result = await createForm({ input: payload }).unwrap() 
        navigate(`/form/${result.createForm.id}`, { replace: true }) 
        alert("The form has been created!") 
      }
    } catch (err: unknown) {
      console.error("Error while saving:", err) 
      
      let errorMessage = "Failed to save form."
      
      if (err instanceof Error) {
        errorMessage = err.message
      } else if (typeof err === 'object' && err !== null && 'message' in err) {
        errorMessage = (err as { message: string }).message
      }

      if (errorMessage.includes('not found')) {
        alert("This form is no longer in the server's memory. Please copy the data and create a new one.")
      } else {
        alert(errorMessage)
      }
    }
  }

  const handleCopyLink = () => {
    if (id && id !== 'new') {
      const url = `${window.location.origin}/form/${id}/fill` 
      
      navigator.clipboard.writeText(url)
        .then(() => alert("Link copied to clipboard!"))
        .catch((err: Error) => console.error("Could not copy link:", err)) 
    } else {
      alert("Save the form first to get a link!") 
    }
  }

  return (
    <header className='sticky top-0 z-50 py-2.5 px-4 flex justify-between items-center bg-white text-black font-medium shadow-sm'>
      <div className='flex items-center gap-x-2'>
        <div className='text-gray-500'>
          <MenuIcon />
        </div>
        <IconButton onClick={() => navigate('/')}>
          <HomeIcon className='text-gray-500' />
        </IconButton>
      </div>

      <div className='flex gap-x-3 items-center'>
        <IconButton 
          onClick={handleCopyLink} 
          disabled={!id || id === 'new'}
          title="Copy form link"
        >
          <ContentCopyIcon 
            className={id && id !== 'new' ? 'text-gray-500' : 'text-gray-200'} 
            fontSize="small" 
          />
        </IconButton>

        <IconButton onClick={() => id && id !== 'new' && window.open(`/form/${id}/fill`, '_blank')}>
          <RemoveRedEyeIcon className='text-gray-500'/>
        </IconButton>
        
        <button
          onClick={handleSave}
          disabled={isLoading}
          className="mr-2 group flex items-center justify-center px-1 py-1 rounded-3xl focus:outline-none transition-all bg-gray-200"
        >
          <span className='group-hover:bg-white px-3 rounded-3xl transition-colors'>
            {isLoading ? 'Saving...' : 'Save'}
          </span>
        </button>

        <Avatar>H</Avatar>
      </div>
    </header>
  )
}

export default HeaderForm