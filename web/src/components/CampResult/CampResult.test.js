import { render } from '@redwoodjs/testing'

import CampResult from './CampResult'

describe('CampResult', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CampResult />)
    }).not.toThrow()
  })
})
