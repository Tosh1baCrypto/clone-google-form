import FormImg from "../img/Content/form.jpg"
import MoreVertIcon from '@mui/icons-material/MoreVert' 
import { IconButton, CircularProgress } from "@mui/material" 
import { useGetFormsQuery } from "../generated/graphql"  
import { useNavigate } from "react-router-dom" 

const Blank = () => {
  const navigate = useNavigate() 
  const { data, isLoading, error } = useGetFormsQuery() 

  if (isLoading) return <div className="flex justify-center p-10"><CircularProgress /></div> 
  if (error) return <div className="text-red-500 p-10">Error loading forms</div> 

  const forms = data?.forms || [] 

  return (
    <div className="pt-2 px-44">
      <h1 className="font-medium text-2xl pb-4">Recent forms</h1>
      <div className="flex flex-wrap gap-6">
        {forms.map((form) => (
          <div key={form.id} className="w-62.5 rounded-sm border border-gray-400 transition-colors hover:border-black bg-white">
            <div 
              onClick={() => navigate(`/form/${form.id}`)} 
              className="cursor-pointer"
            >
              <img src={FormImg} alt="Form" loading="lazy" className="rounded-t-sm w-full h-40 object-cover"/>
              <div className="flex justify-between items-center p-2 border-t border-gray-400">
                <div className="overflow-hidden">
                  <h3 className="pl-2 font-medium truncate">
                    {form.title || "Untitled Form"}
                  </h3>
                  {form.description && (
                    <p className="pl-2 text-xs text-gray-500 truncate">{form.description}</p>
                  )}
                </div>
                <IconButton size="small">
                  <MoreVertIcon fontSize="small" />
                </IconButton>
              </div>
            </div>
          </div>
        ))}

        {forms.length === 0 && (
          <p className="text-gray-400 italic">No forms created yet. Create your first one!</p>
        )}
      </div>
    </div>
  )
}

export default Blank 