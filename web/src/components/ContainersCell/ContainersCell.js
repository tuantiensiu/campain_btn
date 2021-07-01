import { Link, routes } from '@redwoodjs/router'

import Containers from 'src/components/Containers'

export const QUERY = gql`
  query CONTAINERS {
    containers {
      id
      name
      note
      capacity
      profiles {
        profile {
          id
          fullName
          phoneNumber
          birthday
          metaByKeys(keys: "group,status")
        }
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No containers yet. '}
      <Link to={routes.newContainer()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Success = ({ containers }) => {
  return <Containers containers={containers} />
}
