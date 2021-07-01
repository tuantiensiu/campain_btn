import CampResult from 'src/components/CampResult'

export const QUERY = gql`
  query FIND_DRAFT_PROFILE_BY_ID($id: String!) {
    profile: draftProfile(id: $id) {
      id
      fullName
      nationalId
      phoneNumber
      birthday
      createdAt
      meta {
        key
        value
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => <div>Error: {error.message}</div>

export const Success = ({ profile }) => {
  return <CampResult profile={profile} />
}
