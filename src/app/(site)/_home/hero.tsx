'use client'
import { ContainerScroll } from '@/components/ui/container-scroll'
import Image from 'next/image'

export function HeroScrollDemo() {
  return (
    <div className='flex flex-col'>
      <ContainerScroll
        titleComponent={
          <>
            <h1 className='text-4xl font-semibold text-black dark:text-white'>
              Unleash the power of <br />
              <span className='mt-1 text-4xl leading-none font-bold md:text-[6rem]'>Scroll Animations</span>
            </h1>
          </>
        }
      >
        <Image
          src={`/images/linear.webp`}
          alt='hero'
          height={720}
          width={1400}
          className='mx-auto h-full rounded-2xl object-cover object-left-top'
          draggable={false}
        />
      </ContainerScroll>
    </div>
  )
}
