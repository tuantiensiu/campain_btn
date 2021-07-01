import { render } from '@redwoodjs/testing'

import ContainerCard from './ContainerCard'

describe('ContainerCard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ContainerCard />)
    }).not.toThrow()
  })
})
