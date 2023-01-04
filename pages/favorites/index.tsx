import React, { useEffect, useState } from 'react'
import { Layout } from '../../components/layouts'
import { NoFavorites } from '../../components/ui/NoFavorites'
import { localFavorites } from '../../utils'
import { Card, Grid } from '@nextui-org/react'
import { FavoritesPokemons } from '../../components/pokemon'

const Favorites = () => {
  const [favoritesPokemons, setFavoritesPokemons] = useState<number[]>([])
  useEffect(() => {
    setFavoritesPokemons(localFavorites.pokemons())
  }, [])

  return (
    <Layout title='Pókemons - Favoritos'>
      {favoritesPokemons.length === 0 ? (
        <NoFavorites />
      ) : (
        <FavoritesPokemons favoritesPokemons={favoritesPokemons} />
      )}
    </Layout>
  )
}

export default Favorites
