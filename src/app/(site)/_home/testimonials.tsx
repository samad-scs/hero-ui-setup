'use client'
import React from 'react'

import { motion } from 'motion/react'

const testimonials = [
  {
    text: 'This ERP revolutionized our operations, streamlining finance and inventory. The cloud-based platform keeps us productive, even remotely.',
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
    name: 'Briana Patton',
    role: 'Operations Manager'
  },
  {
    text: 'Implementing this ERP was smooth and quick. The customizable, user-friendly interface made team training effortless.',
    image: 'https://randomuser.me/api/portraits/men/2.jpg',
    name: 'Bilal Ahmed',
    role: 'IT Manager'
  },
  {
    text: 'The support team is exceptional, guiding us through setup and providing ongoing assistance, ensuring our satisfaction.',
    image: 'https://randomuser.me/api/portraits/women/3.jpg',
    name: 'Saman Malik',
    role: 'Customer Support Lead'
  },
  {
    text: "This ERP's seamless integration enhanced our business operations and efficiency. Highly recommend for its intuitive interface.",
    image: 'https://randomuser.me/api/portraits/men/4.jpg',
    name: 'Omar Raza',
    role: 'CEO'
  },
  {
    text: 'Its robust features and quick support have transformed our workflow, making us significantly more efficient.',
    image: 'https://randomuser.me/api/portraits/women/5.jpg',
    name: 'Zainab Hussain',
    role: 'Project Manager'
  },
  {
    text: 'The smooth implementation exceeded expectations. It streamlined processes, improving overall business performance.',
    image: 'https://randomuser.me/api/portraits/women/6.jpg',
    name: 'Aliza Khan',
    role: 'Business Analyst'
  },
  {
    text: 'Our business functions improved with a user-friendly design and positive customer feedback.',
    image: 'https://randomuser.me/api/portraits/men/7.jpg',
    name: 'Farhan Siddiqui',
    role: 'Marketing Director'
  },
  {
    text: 'They delivered a solution that exceeded expectations, understanding our needs and enhancing our operations.',
    image: 'https://randomuser.me/api/portraits/women/8.jpg',
    name: 'Sana Sheikh',
    role: 'Sales Manager'
  },
  {
    text: 'Using this ERP, our online presence and conversions significantly improved, boosting business performance.',
    image: 'https://randomuser.me/api/portraits/men/9.jpg',
    name: 'Hassan Ali',
    role: 'E-commerce Manager'
  }
]

const firstColumn = testimonials.slice(0, 3)
const secondColumn = testimonials.slice(3, 6)
const thirdColumn = testimonials.slice(6, 9)

const TestimonialsColumn = (props: { className?: string; testimonials: typeof testimonials; duration?: number }) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: '-50%'
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: 'linear',
          repeatType: 'loop'
        }}
        className='bg-background flex flex-col gap-6 pb-6'
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div className='shadow-primary/10 w-full max-w-xs rounded-3xl border p-10 shadow-lg' key={i}>
                  <div>{text}</div>
                  <div className='mt-5 flex items-center gap-2'>
                    <img width={40} height={40} src={image} alt={name} className='h-10 w-10 rounded-full' />
                    <div className='flex flex-col'>
                      <div className='leading-5 font-medium tracking-tight'>{name}</div>
                      <div className='leading-5 tracking-tight opacity-60'>{role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          ))
        ]}
      </motion.div>
    </div>
  )
}

const Testimonials = () => {
  return (
    <section className='bg-background relative my-20'>
      <div className='z-10 container mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className='mx-auto flex max-w-[540px] flex-col items-center justify-center'
        >
          <div className='flex justify-center'>
            <div className='rounded-lg border px-4 py-1'>Testimonials</div>
          </div>

          <h2 className='mt-5 text-xl font-bold tracking-tighter sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl'>
            What our users say
          </h2>
          <p className='mt-5 text-center opacity-75'>See what our customers have to say about us.</p>
        </motion.div>

        <div className='mt-10 flex max-h-[740px] justify-center gap-6 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]'>
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className='hidden md:block' duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className='hidden lg:block' duration={17} />
        </div>
      </div>
    </section>
  )
}

export default Testimonials
