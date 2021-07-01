import { render } from '@redwoodjs/testing'

import CampPostSubmitPage from './CampPostSubmitPage'

describe('CampPostSubmitPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CampPostSubmitPage />)
    }).not.toThrow()
  })
})
