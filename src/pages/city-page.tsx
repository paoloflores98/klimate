import CurrentWeather from "@/components/current-weather"
import FavoriteButton from "@/components/favorite-button"
import HourlyTemperature from "@/components/hourly-temprature"
import WeatherSkeleton from "@/components/loading-skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { WeatherDetails } from "@/components/weather-details"
import { WeatherForecast } from "@/components/weather-forecast"
import { useForecastQuery, useWeatherQuery } from "@/hooks/use-weather"
import { AlertTriangle } from "lucide-react"
import { useParams, useSearchParams } from "react-router-dom"

export default function CityPage() {
  const [searchParams] = useSearchParams() // Obtener los parámetros URL
  const lat = parseFloat(searchParams.get("lat") || "0") // Obtener el parámetro URL latitud
  const lon = parseFloat(searchParams.get("lon") || "0") // Obtener el parámetro URL longitud
  const params = useParams()

  const coordinates = { lat, lon }

  const weatherQuery = useWeatherQuery(coordinates) // Custom hook
  const forecastQuery = useForecastQuery(coordinates) // Custom hook

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          No se han podido cargar los datos meteorológicos. Inténtalo de nuevo.
        </AlertDescription>
      </Alert>
    )
  }

  if (!weatherQuery.data || !forecastQuery.data || !params.cityName) {
    return <WeatherSkeleton />
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-2 justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          {params.cityName}, {weatherQuery.data.sys.country} {/* Ej.: Puno, PE */}
        </h1>

        <FavoriteButton // Componente
          data={{ ...weatherQuery.data, name: params.cityName }}
        />
      </div>

      <div className="grid gap-6">
        {/* Clima actual */}
        <CurrentWeather data={weatherQuery.data} /> {/* Componente */}

        {/* Temperatura por hora */}
        <HourlyTemperature data={forecastQuery.data} /> {/* Componente */}
        
        <div className="grid gap-6 md:grid-cols-2 items-start">
          {/* Detalles  */}
          <WeatherDetails data={weatherQuery.data} /> {/* Componente */}

          {/* Pronóstico */}
          <WeatherForecast data={forecastQuery.data} /> {/* Componente */}
        </div>
      </div>
    </div>
  )
}