import { render } from '@redwoodjs/testing'

import ProfileListItem from './ProfileListItem'

describe('ProfileListItem', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ProfileListItem />)
    }).not.toThrow()
  })
})
