import { GetStaticPaths, NextPage, GetStaticProps } from 'next'
import { Layout } from '../../components/layouts'
import { poketAPI } from '../../api'
import { Pokemon } from '../../interfaces/pokemon-full'
import confetti from 'canvas-confetti'
import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react'
import { getPopkemonInfo, localFavorites } from '../../utils'
import { useEffect, useState } from 'react'
import { PokemonListResponse } from '../../interfaces'
interface Props {
  pokemon: any
}

const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {
  const [isInFavorite, setIsInFavorite] = useState(false)

  useEffect(() => {
    setIsInFavorite(localFavorites.isInFavorites(pokemon.id))
  }, [pokemon.id])

  const onToogleFavorites = () => {
    localFavorites.toggleFavorite(pokemon.id)
    setIsInFavorite(!isInFavorite)
    if (isInFavorite) return
    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: {
        x: 1,
        y: 0.05,
      },
    })
  }

  return (
    <Layout title={pokemon.name}>
      <Grid.Container css={{ marginTop: '5px' }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card isHoverable css={{ padding: '30px' }}>
            <Card.Body>
              <Card.Image
                src={
                  pokemon.sprites.other?.dream_world.front_default ||
                  '/no-image.png'
                }
                alt={pokemon.name}
                width='100%'
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header
              css={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <Text h1 transform='capitalize'>
                {pokemon.name}
              </Text>
              <Button
                color='gradient'
                ghost={!isInFavorite}
                onPress={onToogleFavorites}
              >
                {isInFavorite ? 'En Favoritos' : 'Guardar en Favoritos'}
              </Button>
            </Card.Header>
            <Card.Body>
              <Text h3>Sprites</Text>
              <Container display='flex' direction='row' gap={0}>
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  )
}

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const { data } = await poketAPI.get<PokemonListResponse>('/pokemon?limit=151')

  const pokemonsNames: string[] = data.results.map((pokemon) => pokemon.name)

  return {
    paths: pokemonsNames.map((name: string) => ({
      params: {
        name,
      },
    })),
    //? fallback: false means that "not found" pages will be resolved at 404 page.
    //fallback: false,
    //? fallback: blocking means that the page will be server-side rendered on the first request to the route.
    //? In the background, Next.js will statically generate the path HTML and JSON files.
    //? On subsequent requests to the same route, the generated HTML and JSON files will be used.
    // en blocking va a entrar en ese id en la url y lo pasará a getStaticProps el cual va a hacer la petición a la api, teniendo luego que validar si existe o no el pokemon
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name } = params as { name: string }
  const lowerCaseName = name.toLowerCase()
  const pokemon = await getPopkemonInfo(lowerCaseName)
  if (!pokemon) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  return {
    props: {
      pokemon,
    },
    revalidate: 86400,
  }
}

export default PokemonByNamePage
