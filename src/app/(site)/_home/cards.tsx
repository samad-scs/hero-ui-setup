'use client'

import { Button } from '@heroui/button'
import { Card, CardFooter, CardHeader } from '@heroui/card'
import { Image } from '@heroui/image'

export default function CardsComponent() {
  return (
    <div className='mx-auto grid max-w-[900px] grid-cols-12 grid-rows-2 gap-2 px-8 py-10 md:py-20'>
      <Card className='col-span-12 h-[300px] sm:col-span-4'>
        <CardHeader className='absolute top-1 z-10 flex-col items-start!'>
          <p className='text-tiny font-bold text-white/60 uppercase'>What to watch</p>
          <h4 className='text-large font-medium text-white'>Stream the Acme event</h4>
        </CardHeader>
        <Image
          removeWrapper
          alt='Card background'
          className='z-0 h-full w-full object-cover'
          src='https://heroui.com/images/card-example-4.jpeg'
        />
      </Card>
      <Card className='col-span-12 h-[300px] sm:col-span-4'>
        <CardHeader className='absolute top-1 z-10 flex-col items-start!'>
          <p className='text-tiny font-bold text-white/60 uppercase'>Plant a tree</p>
          <h4 className='text-large font-medium text-white'>Contribute to the planet</h4>
        </CardHeader>
        <Image
          removeWrapper
          alt='Card background'
          className='z-0 h-full w-full object-cover'
          src='https://heroui.com/images/card-example-3.jpeg'
        />
      </Card>
      <Card className='col-span-12 h-[300px] sm:col-span-4'>
        <CardHeader className='absolute top-1 z-10 flex-col items-start!'>
          <p className='text-tiny font-bold text-white/60 uppercase'>Supercharged</p>
          <h4 className='text-large font-medium text-white'>Creates beauty like a beast</h4>
        </CardHeader>
        <Image
          removeWrapper
          alt='Card background'
          className='z-0 h-full w-full object-cover'
          src='https://heroui.com/images/card-example-2.jpeg'
        />
      </Card>
      <Card isFooterBlurred className='col-span-12 h-[300px] w-full sm:col-span-5'>
        <CardHeader className='absolute top-1 z-10 flex-col items-start'>
          <p className='text-tiny font-bold text-white/60 uppercase'>New</p>
          <h4 className='text-2xl font-medium text-black'>Acme camera</h4>
        </CardHeader>
        <Image
          removeWrapper
          alt='Card example background'
          className='z-0 h-full w-full -translate-y-6 scale-125 object-cover'
          src='https://heroui.com/images/card-example-6.jpeg'
        />
        <CardFooter className='absolute bottom-0 z-10 justify-between border-t-1 border-zinc-100/50 bg-white/30'>
          <div>
            <p className='text-tiny text-black'>Available soon.</p>
            <p className='text-tiny text-black'>Get notified.</p>
          </div>
          <Button className='text-tiny' color='primary' radius='full' size='sm'>
            Notify Me
          </Button>
        </CardFooter>
      </Card>
      <Card isFooterBlurred className='col-span-12 h-[300px] w-full sm:col-span-7'>
        <CardHeader className='absolute top-1 z-10 flex-col items-start'>
          <p className='text-tiny font-bold text-white/60 uppercase'>Your day your way</p>
          <h4 className='text-xl font-medium text-white/90'>Your checklist for better sleep</h4>
        </CardHeader>
        <Image
          removeWrapper
          alt='Relaxing app background'
          className='z-0 h-full w-full object-cover'
          src='https://heroui.com/images/card-example-5.jpeg'
        />
        <CardFooter className='border-default-600 dark:border-default-100 absolute bottom-0 z-10 border-t-1 bg-black/40'>
          <div className='flex grow items-center gap-2'>
            <Image
              alt='Breathing app icon'
              className='h-11 w-10 rounded-full bg-black'
              src='https://heroui.com/images/breathing-app-icon.jpeg'
            />
            <div className='flex flex-col'>
              <p className='text-tiny text-white/60'>Breathing App</p>
              <p className='text-tiny text-white/60'>Get a good night&#39;s sleep.</p>
            </div>
          </div>
          <Button radius='full' size='sm'>
            Get App
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
