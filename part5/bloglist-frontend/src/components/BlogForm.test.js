import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { waitFor } from '@testing-library/dom'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('update blogform and submit', async () => {
    const addBlog = jest.fn()

    const component = render(
      <BlogForm addBlog={addBlog}/>
    )

    const in_title = component.container.querySelector('#title')
    const in_author = component.container.querySelector('#author')
    const in_url = component.container.querySelector('#url')

    const form = component.container.querySelector('form')

    fireEvent.change(in_title, {
      target: { value: 'testing of blogform with testing lib' }
    })
    fireEvent.change(in_author, {
      target: { value: 'a author' }
    })
    fireEvent.change(in_url, {
      target: { value: 'anyurl.com' }
    })

    fireEvent.submit(form)

    await waitFor(() => {
      expect(addBlog.mock.calls).toHaveLength(1)
      expect(addBlog.mock.calls[0][0].title).toBe('testing of blogform with testing lib')
      expect(addBlog.mock.calls[0][0].author).toBe('a author')
      expect(addBlog.mock.calls[0][0].url).toBe('anyurl.com')
    })

  })
})
