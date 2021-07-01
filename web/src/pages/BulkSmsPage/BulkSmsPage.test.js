import { render } from '@redwoodjs/testing'

import BulkSMSPage from './BulkSMSPage'

describe('BulkSMSPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<BulkSMSPage />)
    }).not.toThrow()
  })
})
