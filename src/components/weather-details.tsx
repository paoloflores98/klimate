import type { WeatherData } from "@/api/types"
import { format } from "date-fns"
import { Compass, Gauge, Sunrise, Sunset } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

interface WeatherDetailsProps {
  data: WeatherData
}

export function WeatherDetails({ data }: WeatherDetailsProps) {
  const { wind, main, sys } = data

  // Formatear la hora utilizando date-fns
  const formatTime = (timestamp: number) => {
    return format(new Date(timestamp * 1000), "h:mm a")
  }

  // Convertir grados de viento a dirección
  const getWindDirection = (degree: number) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"]
    const index = Math.round(((degree %= 360) < 0 ? degree + 360 : degree) / 45) % 8 // Ejemplo: 0° = N, 45° = NE, 90° = E, etc

    return directions[index]
  }

  const details = [
    {
      title: "Amanecer",
      value: formatTime(sys.sunrise),
      icon: Sunrise,
      color: "text-orange-500",
    },
    {
      title: "Puesta de sol",
      value: formatTime(sys.sunset),
      icon: Sunset,
      color: "text-blue-500",
    },
    {
      title: "Dirección del viento",
      value: `${getWindDirection(wind.deg)} (${wind.deg}°)`,
      icon: Compass,
      color: "text-green-500",
    },
    {
      title: "Presión",
      value: `${main.pressure} hPa`,
      icon: Gauge,
      color: "text-purple-500",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Detalles del tiempo</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid gap-6 sm:grid-cols-2">
          {details.map((detail) => (
            <div
              key={detail.title}
              className="flex items-center gap-3 rounded-lg border p-4"
            >
              <detail.icon className={`h-5 w-5 ${detail.color}`} />
              <div>
                <p className="text-sm font-medium leading-none">
                  {detail.title}
                </p>
                <p className="text-sm text-muted-foreground">{detail.value}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card >
  )
}