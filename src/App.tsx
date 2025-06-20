import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout'
import { ThemeProvider } from './components/context/theme-provider'
import { WeatherDashboard } from './pages/weather-dashboard'
import CityPage from './pages/city-page'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


/**
 * staleTime: Los datos de las consultas se consideran frescos durante 5 minutos.
 * gcTime: Los datos en caché se eliminan después de 10 minutos si no se usan.
 * retry: No se reintenta automáticamente una consulta fallida.
 * refetchOnWindowFocus: No se vuelve a consultar automáticamente al enfocar la ventana.
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutos
      gcTime: 10 * 60 * 1000, // 10 minutos
      retry: false,
      refetchOnWindowFocus: false,
    },
  }
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider defaultTheme='dark' storageKey="vite-ui-theme">
          <Layout> {/* Componente */}
            <Routes>
              <Route path='/' element={<WeatherDashboard />} />
              <Route path='/city/:cityName' element={<CityPage />} />
            </Routes>
          </Layout>
        </ThemeProvider>
      </BrowserRouter>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
