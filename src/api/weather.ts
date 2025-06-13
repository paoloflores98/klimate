import { API_CONFIG } from "./config"
import type { Coordinates, ForecastData, GeocodingResponse, WeatherData } from "./types"

class WeatherAPI {
  // Crear la URL con los parámetros necesarios para la petición a la API
  private createUrl(endppoint: string, params: Record<string, string | number>) {
    const searchParams = new URLSearchParams({
      appid: API_CONFIG.API_KEY,
      ...params
    })

    return `${endppoint}?${searchParams.toString()}`
  }

  // Realizar la petición HTTP a la URL dada y retorna la respuesta en formato JSON
  private async fetchData<T>(url: string): Promise<T> {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Error de la API meteorológica: ${response.statusText}`)
    }

    return response.json()
  }

  // Obtener el clima actual para las coordenadas dadas
  async getCurrentWeather({ lat, lon }: Coordinates): Promise<WeatherData> {
    const url = this.createUrl(`${API_CONFIG.BASE_URL}/weather`, {
      lat: lat.toString(),
      lon: lon.toString(),
      // units: "metric",
      units: API_CONFIG.DEFAULT_PARAMS.units,
    })

    return this.fetchData<WeatherData>(url)
  }

  // Obtener el pronóstico del clima para las coordenadas dadas
  async getForecast({ lat, lon }: Coordinates): Promise<ForecastData> {
    const url = this.createUrl(`${API_CONFIG.BASE_URL}/forecast`, {
      lat: lat.toString(),
      lon: lon.toString(),
      // units: "metric",
      units: API_CONFIG.DEFAULT_PARAMS.units,
    })
    return this.fetchData<ForecastData>(url)
  }

  // Obtener información de ubicación a partir de coordenadas (geocodificación inversa)
  async reverseGeocode({ lat, lon }: Coordinates): Promise<GeocodingResponse[]> {
    const url = this.createUrl(`${API_CONFIG.GEO}/reverse`, {
      lat: lat.toString(),
      lon: lon.toString(),
      limit: "1",
    })
    return this.fetchData<GeocodingResponse[]>(url)
  }

  // Buscar ubicaciones por nombre y retorna posibles coincidencias
  // async searchLocations(query: string): Promise<GeocodingResponse[]> {
  //   const url = this.createUrl(`${API_CONFIG.GEO}/direct`, {
  //     q: query,
  //     limit: "5",
  //   })
  //   return this.fetchData<GeocodingResponse[]>(url)
  // }
}

export const weatherAPI = new WeatherAPI()