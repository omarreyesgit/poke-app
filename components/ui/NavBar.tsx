import { Spacer, Text, useTheme, Link } from '@nextui-org/react'
import React from 'react'
import Image from 'next/image'
import NextLink from 'next/link'

export const NavBar = () => {
  const { theme } = useTheme()

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'start',
        padding: '0px 20px',
        alignItems: 'center',
        backgroundColor: theme?.colors.gray300.value,
      }}
    >
      <Image
        src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/2.svg'
        alt='pokeball'
        width={50}
        height={50}
      />
      <NextLink href='/' passHref legacyBehavior>
        <Link>
          <Text color='white' h2>
            P
          </Text>
          <Text color='white' h3>
            okémon
          </Text>
        </Link>
      </NextLink>

      <Spacer css={{ flex: 1 }} />
      <NextLink href='/favorites' passHref legacyBehavior>
        <Link>
          <Text color='white' h3>
            Favoritos
          </Text>
        </Link>
      </NextLink>
    </div>
  )
}
