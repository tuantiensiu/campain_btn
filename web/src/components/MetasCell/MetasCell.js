import { Link, routes } from '@redwoodjs/router'

import Metas from 'src/components/Metas'

export const QUERY = gql`
  query METAS {
    metas {
      id
      key
      value
      type
      draftProfileId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No metas yet. '}
      <Link to={routes.newMeta()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Success = ({ metas }) => {
  return <Metas metas={metas} />
}
