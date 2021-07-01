import { Link, routes } from '@redwoodjs/router'

import ContainerTypes from 'src/components/ContainerTypes'

export const QUERY = gql`
  query CONTAINER_TYPES {
    containerTypes {
      id
      slug
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No containerTypes yet. '}
      <Link to={routes.newContainerType()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Success = ({ containerTypes }) => {
  return <ContainerTypes containerTypes={containerTypes} />
}
