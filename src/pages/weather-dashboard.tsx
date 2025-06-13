import WeatherSkeleton from "@/components/loading-skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { useGeolocation } from "@/hooks/use-geolocation"
import { AlertTriangle, MapPin, RefreshCw } from "lucide-react"

export const WeatherDashboard = () => {
  const { coordinates, getLocation, isLoading: locationLoading, error: locationError } = useGeolocation()

  const handleRefresh = () => {
    getLocation()

    if (coordinates) {

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
  
  return (
    <div className="space-y-4">
      {/* Ciudades favoritas */}

      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">Mi ubicación</h1>
        <Button
          variant="outline"
          size="icon"
          onClick={handleRefresh}
        // disabled={weatherQuery.isFetching || forecastQuery.isFetching}
        >
          <RefreshCw
            // className={`h-4 w-4 ${weatherQuery.isFetching ? "animate-spin" : ""}`}
            className={`h-4 w-4`}
          />
        </Button>
      </div>

      {/* Clima actual y horario */}
    </div>
  )
}