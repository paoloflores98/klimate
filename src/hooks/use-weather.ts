import { useQuery } from "@tanstack/react-query"
import { weatherAPI } from "@/api/weather"
import type { Coordinates } from "@/api/types"

export const WEATHER_KEYS = {
  weather: (coords: Coordinates) => ["weather", coords] as const,
  forecast: (coords: Coordinates) => ["forecast", coords] as const,
  location: (coords: Coordinates) => ["location", coords] as const,
  search: (query: string) => ["location-search", query] as const,
} as const

// Consultar el clima actual para unas coordenadas 
export function useWeatherQuery(coordinates: Coordinates | null) {
  return useQuery({
    queryKey: WEATHER_KEYS.weather(coordinates ?? { lat: 0, lon: 0 }), // Llave única para cada coordenada. Ej.: ["weather", { lat: 10.4, lon: 3.2 }]
    queryFn: () => coordinates ? weatherAPI.getCurrentWeather(coordinates) : null,
    enabled: !!coordinates, // Activar la consulta cuando coordinates tiene un valor válido
  })
}

// Consultar el pronóstico del clima para unas coordenadas dadas
export function useForecastQuery(coordinates: Coordinates | null) {
  return useQuery({
    queryKey: WEATHER_KEYS.forecast(coordinates ?? { lat: 0, lon: 0 }), // Llave única para cada coordenada. Ej.: ["forecast", { lat: 10.4, lon: 3.2 }]
    queryFn: () => (coordinates ? weatherAPI.getForecast(coordinates) : null),
    enabled: !!coordinates, // Activar la consulta cuando coordinates tiene un valor válido
  })
}

// Obtener la información de la ubicación (como ciudad, país, etc.) para unas coordenadas dadas
export function useReverseGeocodeQuery(coordinates: Coordinates | null) {
  return useQuery({
    queryKey: WEATHER_KEYS.location(coordinates ?? { lat: 0, lon: 0 }), // Llave única para cada coordenada. Ej.: ["location", { lat: 10.4, lon: 3.2 }]
    queryFn: () => coordinates ? weatherAPI.reverseGeocode(coordinates) : null,
    enabled: !!coordinates, // Activar la consulta cuando coordinates tiene un valor válido
  })
}

// Obtener la ubicación actual del usuario usando la API de geolocalización del navegador
export function useLocationSearch(query: string) {
  return useQuery({
    queryKey: WEATHER_KEYS.search(query), // Llave única para cada coordenada. Ej.: ["location-search", { lat: 10.4, lon: 3.2 }]
    queryFn: () => weatherAPI.searchLocations(query),
    enabled: query.length >= 3, // Activar la consulta cuando coordinates tiene igual o más de 3 caracteres
  })
}