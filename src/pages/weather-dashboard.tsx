import CurrentWeather from "@/components/current-weather"
import HourlyTemperature from "@/components/hourly-temprature"
import WeatherSkeleton from "@/components/loading-skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { useGeolocation } from "@/hooks/use-geolocation"
import { useWeatherQuery, useForecastQuery, useReverseGeocodeQuery } from "@/hooks/use-weather"
import { AlertTriangle, MapPin, RefreshCw } from "lucide-react"

export const WeatherDashboard = () => {
  const { coordinates, getLocation, isLoading: locationLoading, error: locationError } = useGeolocation()

  const weatherQuery = useWeatherQuery(coordinates)
  const forecastQuery = useForecastQuery(coordinates)
  const locationQuery = useReverseGeocodeQuery(coordinates)

  const handleRefresh = () => {
    getLocation()

    if (coordinates) {
      weatherQuery.refetch() // Forzar la actualización de los datos
      forecastQuery.refetch()
      locationQuery.refetch()
    }
  }

  if (locationLoading) {
    return <WeatherSkeleton /> // Componente
  }

  if (locationError) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error de ubicación</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>{locationError}</p>
          <p>Active su ubicación en la configuración del navegador.</p>

          {/* <Button variant="outline" onClick={getLocation} className="w-fit">
            <MapPin className="h-4 w-4" />
            Activar ubicación
          </Button> */}
        </AlertDescription>
      </Alert>
    )
  }

  if (!coordinates) {
    return (
      <Alert>
        <MapPin className="h-4 w-4" />
        <AlertTitle>Ubicación requerida</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>Activa el acceso por ubicación para ver el tiempo local.</p>
          {/* <Button variant="outline" onClick={getLocation} className="w-fit">
            <MapPin className="mr-2 h-4 w-4" />
            Activar ubicación
          </Button> */}
        </AlertDescription>
      </Alert>
    )
  }

  const locationName = locationQuery.data?.[0]

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>No se han podido obtener los datos meteorológicos. Inténtalo de nuevo.</p>
          {/* <Button variant="outline" onClick={handleRefresh} className="w-fit">
            <RefreshCw className="mr-2 h-4 w-4" />
            Reintentar
          </Button> */}
        </AlertDescription>
      </Alert>
    )
  }

  if (!weatherQuery.data || !forecastQuery.data) {
    return <WeatherSkeleton /> // Componente
  }

  return (
    <div className="space-y-4">
      {/* Ciudades favoritas */}
      {/* Aquí irá un componente */}

      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">Mi ubicación</h1>
        <Button
          variant="outline"
          size="icon"
          onClick={handleRefresh}
          disabled={weatherQuery.isFetching || forecastQuery.isFetching}
        >
          <RefreshCw className={`h-4 w-4 ${weatherQuery.isFetching ? "animate-spin" : ""}`} />
        </Button>
      </div>

      {/* Clima actual y horario */}
      <div className="grid gap-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Clima actual */}
          <CurrentWeather // Componente
            data={weatherQuery.data}
            locationName={locationName}
          />

          {/* Temperatura por hora */}
          <HourlyTemperature // Componente
            data={forecastQuery.data}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2 items-start">
          {/* Detalles  */}
          {/* <WeatherDetails data={weatherQuery.data} /> */}

          {/* Previsión */}
          {/* <WeatherForecast data={forecastQuery.data} /> */}
        </div>
      </div>
    </div>
  )
}