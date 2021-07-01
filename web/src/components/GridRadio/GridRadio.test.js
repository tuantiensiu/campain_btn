import { render } from '@redwoodjs/testing'

import GridRadio from './GridRadio'

describe('GridRadio', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<GridRadio />)
    }).not.toThrow()
  })
})
