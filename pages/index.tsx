import styles from '../styles/Home.module.css'
import { Layout } from '../components/layouts'
import { GetStaticProps } from 'next'
import { poketAPI } from '../api'
import { PokemonListResponse, SmallPokemon } from '../interfaces'
import { Card, Grid, Row, Text } from '@nextui-org/react'
import { PokemonCard } from '../components/pokemon'
export default function Home({ pokemon }: { pokemon: SmallPokemon[] }) {
  //console.log(pokemon)

  return (
    <Layout title='Pokémons'>
      <Grid.Container gap={2} justify='flex-start'>
        {pokemon.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </Grid.Container>
    </Layout>
  )
}

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await poketAPI.get<PokemonListResponse>('/pokemon?limit=151')
  //https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/132.svg
  const pokemon: SmallPokemon[] = data.results.map((poke, i) => ({
    ...poke,
    id: i + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
      i + 1
    }.svg`,
  }))
  return {
    props: {
      pokemon,
    },
  }
}
