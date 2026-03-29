import blank from "../img/Content/model.jpg"
import blank1 from "../img/Content/model1.png"
import { useNavigate } from "react-router-dom"


const Template = () => {

  const navigate = useNavigate()

  const createForm = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    navigate("/form/new")
  }

  return (
    <div className="bg-gray-200 pb-10 pt-2 px-44">
      <h2 className="font-normal text-2xl">Start a new form</h2>
      <div className="flex pt-5 gap-x-3.5">
        <div className="flex flex-col items-center gap-y-1.5" >
          <a href="/" onClick={createForm}>
            <img src={blank} alt="Blank" loading="lazy" className="max-w-64 rounded-2xl border border-gray-200 hover:border-gray-900 transition-colors cursor-pointer"/> 
          </a>
          <p>Blank</p>   
        </div>
        <div title="Not work" aria-label="Not work" className="flex flex-col items-center gap-y-1.5">
          <div>
            <img src={blank1} loading="lazy" alt="Blank One" className="max-w-64 rounded-2xl border border-gray-200 hover:border-gray-900 transition-colors cursor-pointer"/> 
          </div>
          <p>Normal Form</p>   
        </div>
      </div>
    </div>
  )

}

export default Template