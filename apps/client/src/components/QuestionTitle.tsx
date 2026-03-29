import { useDispatch, useSelector } from 'react-redux' 
import { setGlobalTitle, setGlobalDescription } from '../store/formSlice' 
import { type RootState } from '../store/store' 

const QuestionTitle = () => {
  const dispatch = useDispatch() 
  const { title, description } = useSelector((state: RootState) => state.formEditor) 

  return (
    <div className='max-w-3xl mx-auto my-5'>
      <div className='bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 relative'>
        <div className='p-6 pl-8'>
          <div className='mb-4'>
            <input
              type='text'
              value={title}
              onChange={(e) => dispatch(setGlobalTitle(e.target.value))}
              className='w-full text-3xl font-normal outline-none border-b border-gray-200 pb-1'
              placeholder='Name form'
            />
          </div>
          <div>
            <input
              type='text'
              value={description}
              onChange={(e) => dispatch(setGlobalDescription(e.target.value))}
              className='w-full text-sm outline-none border-b border-transparent transition-all duration-300 focus:border-gray-300 pb-1 '
              placeholder='Form description'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuestionTitle 