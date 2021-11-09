import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
describe('<Blog />', () => {

  let component

  beforeEach(() => {
    const blog = {
      title:'sample blog to test with testing library',
      author:'anonymous',
      url:'anyurl.com',
      likes:112
    }

    component = render(
      <Blog blog={blog} />
    )
  })

  test('initially render blog title and author only', () => {

    const blog_heading = component.container.querySelector('.blog-heading')
    expect(blog_heading).toHaveTextContent(
      'sample blog to test with testing library'
    )

    const blog_detail = component.container.querySelector('.blog-detail')
    expect(blog_detail).toBe(null)
  })

  test('after clicking view blog details are shown', () => {

    const btnView = component.container.querySelector('.btn-view')
    fireEvent.click(btnView)

    const blog_detail = component.container.querySelector('.blog-detail')
    expect(blog_detail).toHaveTextContent(
      'anyurl.com'
    )

  })

  test('clicking like btn twice calls handler twice', () => {
    const blog = {
      title:'sample blog to test with testing library',
      author:'anonymous',
      url:'anyurl.com',
      likes:112
    }

    const mockHandler = jest.fn()

    const component = render(
      <Blog blog={blog} likePost={mockHandler} />
    )

    //clicking view button that will display blog detail HTML block
    const btnView = component.container.querySelector('.btn-view')
    fireEvent.click(btnView)

    //now extracting like button and clicking two times
    const btn_like = component.container.querySelector('.btn-like')
    fireEvent.click(btn_like)
    fireEvent.click(btn_like)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
