import { FC } from 'react'
import { SmallPokemon } from '../../interfaces/pokemon-list'
import { Card, Grid, Row, Text } from '@nextui-org/react'
import { useRouter } from 'next/router'
interface Props {
  pokemon: SmallPokemon
}
export const PokemonCard: FC<Props> = ({ pokemon: { id, name, img } }) => {
  const router = useRouter()
  const handleOnClick = () => {
    router.push(`/name/${name}`)
  }
  return (
    <>
      <Grid key={id} xs={6} sm={3} md={2} xl={1}>
        <Card isHoverable isPressable onClick={handleOnClick}>
          <Card.Body css={{ p: 1 }}>
            <Card.Image src={img} width='100%' height={140} />
          </Card.Body>
          <Card.Footer>
            <Row justify='space-between'>
              <Text transform='capitalize'>{name}</Text>
              <Text>#{id}</Text>
            </Row>
          </Card.Footer>
        </Card>
      </Grid>
    </>
  )
}
