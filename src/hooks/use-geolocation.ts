import { useEffect, useState } from "react"
import type { Coordinates } from "@/api/types"

interface GeolocationState {
  coordinates: Coordinates | null
  isLoading: boolean
  error: string | null
}

export function useGeolocation() {
  const [locationData, setLocationData] = useState<GeolocationState>({
    coordinates: null,
    isLoading: true,
    error: null,
  })

  const getLocation = () => {
    setLocationData(prev => ({ ...prev, isLoading: true, error: null }))

    // Verificar si la API de geolocalización está disponible en el navegador del usuario
    if (!navigator.geolocation) {
      setLocationData({
        coordinates: null,
        isLoading: false,
        error: "La geolocalización no es compatible con este navegador.",
      })

      return
    }

    // Obtener la ubicación actual del usuario con la API de geolocalización
    navigator.geolocation.getCurrentPosition(
      position => {
        setLocationData({
          coordinates: {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          },
          isLoading: false,
          error: null,
        })
      },
      error => {
        let errorMessage: string

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Permiso denegado para acceder a la ubicación."
            break
          case error.POSITION_UNAVAILABLE:
            errorMessage = "La ubicación no está disponible."
            break
          case error.TIMEOUT:
            errorMessage = "La solicitud de geolocalización ha expirado."
            break
          default:
            errorMessage = "Error desconocido al obtener la ubicación."
        }

        setLocationData({
          coordinates: null,
          isLoading: false,
          error: errorMessage,
        })
      },
      {
        enableHighAccuracy: true, // Intentar obtener la ubicación más precisa posible
        timeout: 5000, // Tiempo máximo de espera para obtener la ubicación
        maximumAge: 0, // No usar una ubicación en caché
      }
    )
  }

  useEffect(() => {
    getLocation()
  }, [])

  return {
    ...locationData,
    getLocation,
  }
}