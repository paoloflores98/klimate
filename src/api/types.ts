export interface Coordinates {
  lat: number
  lon: number
}

export interface WeatherCondition {
  id: number
  main: string
  description: string
  icon: string
}

// Formato extraído de https://openweathermap.org/current
export interface WeatherData {
  coord: Coordinates
  weather: WeatherCondition[]
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
  }
  wind: {
    speed: number
    deg: number
  }
  sys: {
    sunrise: number
    sunset: number
    country: string
  }
  name: string
  dt: number
}

// Formato extraído de https://openweathermap.org/forecast5
export interface ForecastData {
  list: Array<{
    dt: number
    main: WeatherData["main"]
    weather: WeatherData["weather"]
    wind: WeatherData["wind"]
    dt_txt: string
  }>
  city: {
    name: string
    country: string
    sunrise: number
    sunset: number
  }
}

// Formato extraído de https://openweathermap.org/api/geocoding-api#reverse
export interface GeocodingResponse {
  name: string
  local_names?: Record<string, string>
  lat: number
  lon: number
  country: string
  state?: string
}