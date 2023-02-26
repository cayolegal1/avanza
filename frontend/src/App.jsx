import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import {routes} from './routes';

function App() {
  const renderRoutes = (routes) => routes.map(r => (
      <Route key={r.key} path={r.path} element={r.page} />
  ))
  
  return (
    <BrowserRouter>
      <Routes>
        {renderRoutes(routes)}
        <Route path={'*'} element={<Navigate to='/people' />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App