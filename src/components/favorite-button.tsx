// src/components/weather/favorite-button.tsx
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { WeatherData } from "@/api/types"
import { useFavorites } from "@/hooks/use-favorite"
import { toast } from "sonner"

interface FavoriteButtonProps {
  data: WeatherData
}

export default function FavoriteButton({ data }: FavoriteButtonProps) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites()
  const isCurrentlyFavorite = isFavorite(data.coord.lat, data.coord.lon)

  const handleToggleFavorite = () => {
    if (isCurrentlyFavorite) {
      removeFavorite.mutate(`${data.coord.lat}-${data.coord.lon}`)
      toast.error(`Eliminado ${data.name} de Favoritos`)
    } else {
      addFavorite.mutate({
        name: data.name,
        lat: data.coord.lat,
        lon: data.coord.lon,
        country: data.sys.country,
      })
      toast.success(`Agregado ${data.name} a Favoritos`)
    }
  }

  return (
    <Button
      className={isCurrentlyFavorite ? "bg-yellow-500 hover:bg-yellow-600" : ""}
      variant={isCurrentlyFavorite ? "default" : "outline"}
      size="icon"
      onClick={handleToggleFavorite}
    >
      <Star className={`h-4 w-4 ${isCurrentlyFavorite ? "fill-current" : ""}`} />
    </Button>
  )
}