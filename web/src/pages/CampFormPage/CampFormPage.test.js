import { render } from '@redwoodjs/testing'

import CampFormPage from './CampFormPage'

describe('CampFormPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CampFormPage />)
    }).not.toThrow()
  })
})
