import { render } from '@redwoodjs/testing'

import BulkSMSLayout from './BulkSMSLayout'

describe('BulkSMSLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<BulkSMSLayout />)
    }).not.toThrow()
  })
})
