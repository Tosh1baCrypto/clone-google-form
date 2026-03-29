import { type ChangeEvent } from 'react'

export type TabValue = 'questions' | 'responses'

interface TabsProps {
  activeTab: TabValue 
  onTabChange: (value: TabValue) => void 
}

const Tabs = ({ activeTab, onTabChange }: TabsProps) => {
  const handleTabChange = (e: ChangeEvent<HTMLInputElement>) => {
    onTabChange(e.target.value as TabValue)
  }

  return (
    <div className='flex w-full justify-center border-t border-gray-100 pt-4 bg-white'>
      <div className='flex w-80 flex-wrap rounded-lg bg-gray-200 p-1 font-medium shadow-inner box-border'>
        
        {/* Tab: Questions */}
        <label className='flex-auto text-center cursor-pointer'>
          <input
            type='radio'
            name='tabs'
            value='questions'
            checked={activeTab === 'questions'}
            onChange={handleTabChange}
            className='peer hidden'
          />
          <span className='flex items-center select-none justify-center rounded-lg py-2 text-black transition-colors peer-checked:bg-white peer-checked:shadow-sm'>
            Questions
          </span>
        </label>

        {/* Tab: Responses */}
        <label className='flex-auto text-center cursor-pointer'>
          <input
            type='radio'
            name='tabs'
            value='responses'
            checked={activeTab === 'responses'}
            onChange={handleTabChange}
            className='peer hidden'
          />
          <span className='flex items-center select-none justify-center rounded-lg py-2 text-black transition-colors peer-checked:bg-white peer-checked:shadow-sm'>
            Responses
          </span>
        </label>

      </div>
    </div>
  )
}

export default Tabs