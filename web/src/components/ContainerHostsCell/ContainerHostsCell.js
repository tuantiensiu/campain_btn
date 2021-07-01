import { Link, routes } from '@redwoodjs/router'

import ContainerHosts from 'src/components/ContainerHosts'

export const QUERY = gql`
  query CONTAINER_HOSTS {
    containerHosts {
      id
      name
      contact
      note
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No containerHosts yet. '}
      <Link to={routes.newContainerHost()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Success = ({ containerHosts }) => {
  return <ContainerHosts containerHosts={containerHosts} />
}
