import { FC, ReactNode } from 'react'
import Head from 'next/head'
import { NavBar } from '../ui'

type Props = {
  children: ReactNode
  title?: string
}
export const Layout: FC<Props> = ({ children, title = 'hola' }) => {
  return (
    <>
      <Head>
        <title>{title || 'Pokemon App'}</title>
        <meta name='author' content='Artur Reyes' />
        <meta
          name='description'
          content={`Información sobre pokemon ${title}`}
        />
        <meta name='keywords' content={`poke,pokemon,pokedex,${title}`} />
      </Head>
      <NavBar />
      <main
        style={{
          padding: '0px 20px',
        }}
      >
        {children}
      </main>
    </>
  )
}
