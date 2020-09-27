import React from 'react'
import App from '../pages/index'
import '@testing-library/jest-dom/extend-expect'
import { render } from '../utils/testing-utils'

describe('Index', () => {
  // let app
  // beforeAll(() => {
  //   app = render(<App />)
  // })

  it('should be defined', () => {
    expect(App).toBeDefined()
  })
})
