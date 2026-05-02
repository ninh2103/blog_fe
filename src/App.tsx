import { BrowserRouter, useRoutes } from 'react-router-dom'
import { routes } from '@/routers/routes'
import { TooltipProvider } from '@/components/ui/tooltip'

function AppRoutes() {
  return useRoutes(routes)
}

function App() {
  return (
    <BrowserRouter>
      <TooltipProvider>
        <AppRoutes />
      </TooltipProvider>
    </BrowserRouter>
  )
}

export default App