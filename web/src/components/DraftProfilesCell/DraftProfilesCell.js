import { Link, routes } from '@redwoodjs/router'

import DraftProfiles from 'src/components/DraftProfiles'

export const QUERY = gql`
  query DRAFT_PROFILES {
    draftProfiles {
      id
      fullName
      nationalId
      phoneNumber
      birthday
      createdAt
      meta {
        id
        key
        value
      }
      containers {
        container {
          type {
            slug
          }
          name
        }
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No draftProfiles yet. '}
      <Link to={routes.newDraftProfile()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Success = ({ draftProfiles }) => {
  return <DraftProfiles draftProfiles={draftProfiles} />
}
