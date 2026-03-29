import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'
import Home from './pages/Home'
import Form from './pages/Form'
import FormFill from './pages/FormFill'
import FormResponses from './components/FormResponses'

function App() {
	return (
    <Provider store={store}>
      <div>
        <BrowserRouter>
          <Routes>
      
            <Route path='/' element={<Home />} />

            <Route path='/form/:id' element={<Form />} />

            <Route path='/form/:id/fill' element={<FormFill />} />

            <Route path="/form/:id/responses" element={<FormResponses />} />

          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
	)
}

export default App