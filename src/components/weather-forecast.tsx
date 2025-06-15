import type { ForecastData } from "@/api/types"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react"

interface WeatherForecastProps {
  data: ForecastData
}

interface DailyForecast {
  date: number
  temp_min: number
  temp_max: number
  humidity: number
  wind: number
  weather: {
    id: number
    main: string
    description: string
    icon: string
  }
}

export function WeatherForecast({ data }: WeatherForecastProps) { 
  /*
  Esta función agrupa los pronósticos horarios por día y resume la información más relevante.
  Para cada día, guarda la temperatura mínima y máxima encontradas, la humedad, el viento,
  el primer estado del clima y la fecha del primer registro de ese día. Ejemplo: Si data.list contiene:
  [
    { dt: 1718200000, main: { temp_min: 15, temp_max: 21, humidity: 75 }, wind: { speed: 4 }, weather: [{ main: "Clear" }] },
    { dt: 1718228800, main: { temp_min: 13, temp_max: 23, humidity: 65 }, wind: { speed: 6 }, weather: [{ main: "Clouds" }] },
    { dt: 1718315200, main: { temp_min: 17, temp_max: 25, humidity: 60 }, wind: { speed: 5 }, weather: [{ main: "Rain" }] }
  ]
  El resultado será:
  {
    "2024-06-12": {
      temp_min: 13,         // menor de 15 y 13
      temp_max: 23,         // mayor de 21 y 23
      humidity: 75,         // del primer registro de ese día
      wind: 4,              // del primer registro de ese día
      weather: { main: "Clear" }, // del primer registro de ese día
      date: 1718200000
    },
    "2024-06-13": {
      temp_min: 17,
      temp_max: 25,
      humidity: 60,
      wind: 5,
      weather: { main: "Rain" },
      date: 1718315200
    }
  }
*/
  const dailyForecasts = data.list.reduce((acc, forecast) => {
    const date = format(new Date(forecast.dt * 1000), "yyyy-MM-dd")

    
    if (!acc[date]) {
      acc[date] = {
        temp_min: forecast.main.temp_min,
        temp_max: forecast.main.temp_max,
        humidity: forecast.main.humidity,
        wind: forecast.wind.speed,
        weather: forecast.weather[0], // Ejemplo: { id: 800, main: "Clear", description: "clear sky", icon: "01d" }
        date: forecast.dt,
      }
    } else {
      acc[date].temp_min = Math.min(acc[date].temp_min, forecast.main.temp_min)
      acc[date].temp_max = Math.max(acc[date].temp_max, forecast.main.temp_max)
    }
    
    return acc
  }, {} as Record<string, DailyForecast>)

  // Obtener los próximos 5 días
  const nextDays = Object.values(dailyForecasts).slice(1, 6) // Ej.: Si hoy es lunes, obtendremos martes a sábado
  
  // Formato de temperatura
  const formatTemp = (temp: number) => `${Math.round(temp)}°` // Ej.: 25.5 se convierte en "26°"

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pronóstico para 5 días</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid gap-4">
          {nextDays.map((day) => (
            <div
              className="grid grid-cols-3 items-center gap-4 rounded-lg border p-4"
              key={day.date}
            >
              <div>
                <p className="font-medium">
                  {format(new Date(day.date * 1000), "EEE, MMM d", { locale: es })}
                </p>
                <p className="text-sm text-muted-foreground capitalize">
                  {day.weather.description}
                </p>
              </div>

              <div className="flex flex-col lg:flex-row justify-center gap-4">
                <span className="flex items-center text-blue-500">
                  <ArrowDown className="mr-1 h-4 w-4" />
                  {formatTemp(day.temp_min)}
                </span>
                <span className="flex items-center text-red-500">
                  <ArrowUp className="mr-1 h-4 w-4" />
                  {formatTemp(day.temp_max)}
                </span>
              </div>

              <div className="flex flex-col lg:flex-row justify-end gap-4">
                <span className="flex items-center gap-1">
                  <Droplets className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">{day.humidity}%</span>
                </span>
                <span className="flex items-center gap-1">
                  <Wind className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">{day.wind}m/s</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}