import { AddCircleOutline } from '@mui/icons-material' 
import { IconButton } from '@mui/material' 

interface SidebarProps {
  onAddQuestion: () => void 
}

const Sidebar = ({ onAddQuestion }: SidebarProps) => {
  return (
    <div className="fixed right-[calc(50%-450px)] top-1/9 bg-white shadow-md border border-gray-200 rounded-lg p-1">
      <IconButton onClick={onAddQuestion} title="Add question">
        <AddCircleOutline className="text-gray-500" />
      </IconButton>
    </div>
  ) 
} 

export default Sidebar 