import { render } from '@redwoodjs/testing'

import SmsSentList from './SmsSentList'

describe('SmsSentList', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SmsSentList />)
    }).not.toThrow()
  })
})
