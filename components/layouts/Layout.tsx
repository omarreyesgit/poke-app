import { FC, ReactNode } from 'react'
import Head from 'next/head'
import { NavBar } from '../ui'

type Props = {
  children: ReactNode
  title?: string
}
const origin = (typeof window === 'undefined') ? '' : window.location.origin //prettier-ignore
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
        <meta
          property='og:title'
          content={`Información sobre pokemon ${title}`}
        />

        <meta
          property='og:description'
          content={`Esta es la información sobre el pokemon ${title}`}
        />
        <meta property='og:image' content={`${origin}/img/banner.png`} />
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
