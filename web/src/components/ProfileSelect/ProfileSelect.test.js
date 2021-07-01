import { render } from '@redwoodjs/testing'

import ProfileSelect from './ProfileSelect'

describe('ProfileSelect', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ProfileSelect />)
    }).not.toThrow()
  })
})
