import { Link, routes } from '@redwoodjs/router'

import ContainerRoles from 'src/components/ContainerRoles'

export const QUERY = gql`
  query CONTAINER_ROLES {
    containerRoles {
      id
      slug
      name
      containerId
      profileId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No containerRoles yet. '}
      <Link to={routes.newContainerRole()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Success = ({ containerRoles }) => {
  return <ContainerRoles containerRoles={containerRoles} />
}
