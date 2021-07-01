import { render } from '@redwoodjs/testing'

import CountDownPage from './CountDownPage'

describe('CountDownPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CountDownPage />)
    }).not.toThrow()
  })
})
