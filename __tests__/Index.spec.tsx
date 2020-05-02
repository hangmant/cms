import React from 'react'
import App from '../pages/index'
import '@testing-library/jest-dom/extend-expect'
import { render } from '../utils/testing-utils'

describe('Index', () => {
  // let app
  // beforeAll(() => {
  //   app = render(<App />)
  // })

  describe('"Get Stated" Button', () => {
    it('should resolve', () => {
      const { getByText } = render(<App />)
      expect(getByText('Get Started')).toBeInTheDocument()
    })

    // let getStartedButton

    // beforeAll(() => {
    //   getStartedButton = app.getByDataCy('get-started-btn')
    //   console.log('Dante: getStartedButton', getStartedButton)
    // })

    // it('should be defined', () => {
    //   expect(getStartedButton).toBeDefined()
    // })

    // // it('should show Get Started Button', () => {
    // //   expect(getStartedButton).toHaveTextContent('Hello')
    // // })
  })
})
