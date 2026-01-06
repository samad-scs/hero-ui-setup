import CardsComponent from './_home/cards'
import { HeroScrollDemo } from './_home/hero'
import Testimonials from './_home/testimonials'

export default function Home() {
  return (
    <main className=''>
      <HeroScrollDemo />
      <CardsComponent />
      <Testimonials />
    </main>
  )
}
