import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {store} from './store'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router'
import DetailView from './DetailView.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App/>}/>
          <Route path="/detail" element={<DetailView/>}/>
        </Routes>
      </BrowserRouter>  
    </Provider>
  </StrictMode>,
)
