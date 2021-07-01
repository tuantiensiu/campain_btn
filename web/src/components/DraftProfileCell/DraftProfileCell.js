import DraftProfile from 'src/components/DraftProfile'

export const QUERY = gql`
  query FIND_DRAFT_PROFILE_BY_ID($id: String!) {
    draftProfile: draftProfile(id: $id) {
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
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>DraftProfile not found</div>

export const Success = ({ draftProfile }) => {
  return <DraftProfile draftProfile={draftProfile} />
}
