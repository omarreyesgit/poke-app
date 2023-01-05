import { poketAPI } from '../api'
import { Pokemon } from '../interfaces'

export const getPopkemonInfo = async (nameOrId: string) => {
  try {
    const { data } = await poketAPI.get<Pokemon>(`/pokemon/${nameOrId}`)
    return {
      id: data.id,
      name: data.name,
      sprites: data.sprites,
    }
  } catch (error) {
    return null
  }
}
