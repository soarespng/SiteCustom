import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home.jsx'
import CreateHome from './pages/CreateHome/CreateHome.jsx'
import Details from './pages/Details/Details.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="cadastro-imovel" element={<CreateHome />} />
          <Route path="detalhes" element={<Details />} />
        </Routes>
      </App>
    </BrowserRouter>
  </StrictMode>
);