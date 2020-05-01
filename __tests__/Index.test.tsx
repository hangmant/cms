import { Button } from '@material-ui/core'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import App from '../pages/index'

configure({ adapter: new Adapter() })

describe('Index', () => {
  let app

  beforeAll(() => {
    app = shallow(<App />)
  })

  describe('"Get Stated" Button', () => {
    let getStartedButton

    beforeAll(() => {
      getStartedButton = app.find(Button)
    })

    it('should be defined', () => {
      expect(getStartedButton).toBeDefined()
    })

    it('should show Get Started Button', () => {
      expect(getStartedButton.text()).toEqual('Get Started')
    })

    it('should go to words route', () => {
      expect(getStartedButton.prop('href')).toEqual('/words')
    })
  })
})
