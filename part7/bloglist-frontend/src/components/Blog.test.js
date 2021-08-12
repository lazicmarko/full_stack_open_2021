import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders blog, heading visible, details invis', () => {
  const user = {
    name: 'root',
    username: 'root',
    id: '60acd2e69b4289331067bdde',
    password: 'fsopen2021'
  }

  const blog = {
    author: 'Bob Ross',
    title: 'BR rules',
    url: 'http://www.github.com',
    likes: 100,
    id: '60b513c6baecf00c203d6fa7',
    user: '60acd2e69b4289331067bdde'
  }

  const component = render(
    <Blog blog={blog} user={user}/>
  )

  const div = component.container.querySelector('.blog')
  expect(div).toBeDefined()

  const header = component.container.querySelector('.blog-heading')
  expect(header).toBeDefined()
  expect(header).toHaveTextContent('Bob Ross')
  expect(header).toHaveTextContent('BR rules')

  const details = component.container.querySelector('.blog-details')
  expect(details).toBeDefined()
  expect(details).toHaveStyle('display: none')
})

test('clicking view button shows details', () => {
  const user = {
    name: 'root',
    username: 'root',
    id: '60acd2e69b4289331067bdde',
    password: 'fsopen2021'
  }

  const blog = {
    author: 'Bob Ross',
    title: 'BR rules',
    url: 'http://www.github.com',
    likes: 100,
    id: '60b513c6baecf00c203d6fa7',
    user: '60acd2e69b4289331067bdde'
  }

  const component = render(
    <Blog blog={blog} user={user}/>
  )

  const details = component.container.querySelector('.blog-details')
  expect(details).toBeDefined()
  expect(details).toHaveStyle('display: none')

  const button = component.container.querySelector('.view-button')
  fireEvent.click(button)

  expect(details).not.toHaveStyle('display: none')
})

test('like button clicked twice equals event handler to be called twice', () => {
  const user = {
    name: 'root',
    username: 'root',
    id: '60acd2e69b4289331067bdde',
    password: 'fsopen2021'
  }

  const blog = {
    author: 'Bob Ross',
    title: 'BR rules',
    url: 'http://www.github.com',
    likes: 100,
    id: '60b513c6baecf00c203d6fa7',
    user: '60acd2e69b4289331067bdde'
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} user={user} handleLike={mockHandler}/>
  )

  const button = component.getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})



