import { Grid, Card } from '@nextui-org/react'
import { FC } from 'react'
import { FavoriteCardPokemon } from './FavoriteCardPokemon'
interface Props {
  favoritesPokemons: number[]
}
export const FavoritesPokemons: FC<Props> = ({ favoritesPokemons }) => {
  return (
    <Grid.Container gap={2} direction='row' justify='flex-start'>
      {favoritesPokemons.map((id) => (
        <FavoriteCardPokemon id={id} key={id} />
      ))}
    </Grid.Container>
  )
}
