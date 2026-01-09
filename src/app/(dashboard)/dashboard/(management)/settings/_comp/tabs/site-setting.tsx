'use client'

import { Button } from '@heroui/button'
import { Card, CardBody } from '@heroui/card'
import { Input } from '@heroui/input'
import { Form } from '@heroui/form'
import React from 'react'

export default function SiteSetting() {
  const [submitted, setSubmitted] = React.useState<{ email: string } | null>(null)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const data = Object.fromEntries(new FormData(e.currentTarget))

    setSubmitted(data as { email: string })
  }

  return (
    <Card className='bg-content1 w-full'>
      <CardBody>
        <Form className='w-full' onSubmit={onSubmit}>
          <Input
            isRequired
            errorMessage='Please enter a valid email'
            label='Email'
            isInvalid
            labelPlacement='outside'
            name='email'
            placeholder='Enter your email'
            type='email'
          />
          <Button type='submit' variant='bordered'>
            Submit
          </Button>
          {submitted && (
            <div className='text-small text-default-500'>
              You submitted: <code>{JSON.stringify(submitted)}</code>
            </div>
          )}
        </Form>
      </CardBody>
    </Card>
  )
}
