import type { ForecastData } from "@/api/types"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { format } from "date-fns"

interface HourlyTemperatureProps {
  data: ForecastData
}

interface ChartData {
  time: string
  temp: number
  feels_like: number
}

export default function HourlyTemperature({ data }: HourlyTemperatureProps) {
  /*
  Arreglo con los datos de las próximas 8 horas para graficar. Ejemplo:
  [
    { time: "14:00", temp: 27, feels_like: 29 },
    { time: "15:00", temp: 28, feels_like: 30 },
    { time: "16:00", temp: 29, feels_like: 31 },
    { time: "17:00", temp: 30, feels_like: 32 },
    { time: "18:00", temp: 31, feels_like: 33 },
    { time: "19:00", temp: 30, feels_like: 32 },
    { time: "20:00", temp: 29, feels_like: 31 },
    { time: "21:00", temp: 28, feels_like: 30 }
  ]
  */
  const chartData: ChartData[] = data.list.slice(0, 8).map(item => ({
    time: format(new Date(item.dt * 1000), "HH:mm"),
    temp: Math.round(item.main.temp),
    feels_like: Math.round(item.main.feels_like)
  }))

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Temperatura de hoy</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis // Eje X
                dataKey="time"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />

              <YAxis // Eje Y
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}°`}
              />

              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Temperatura
                            </span>
                            <span className="font-bold">
                              {payload[0].value}°
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Se siente como
                            </span>
                            <span className="font-bold">
                              {payload[1].value}°
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  }

                  return null
                }}
              />

              <Line
                type="monotone"
                dataKey="temp"
                stroke="#2563eb"
                strokeWidth={2}
                dot={false}
              />

              <Line
                type="monotone"
                dataKey="feels_like"
                stroke="#64748b"
                strokeWidth={2}
                dot={false}
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}