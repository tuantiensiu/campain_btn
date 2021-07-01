import { useMutation, useFlash } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import DraftProfileForm from 'src/components/DraftProfileForm'

export const QUERY = gql`
  query FIND_DRAFT_PROFILE_BY_ID($id: String!) {
    draftProfile: draftProfile(id: $id) {
      id
      fullName
      nationalId
      phoneNumber
      birthday
    }
  }
`
const UPDATE_DRAFT_PROFILE_MUTATION = gql`
  mutation UpdateDraftProfileMutation(
    $id: String!
    $input: UpdateDraftProfileInput!
  ) {
    updateDraftProfile(id: $id, input: $input) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Success = ({ draftProfile }) => {
  const { addMessage } = useFlash()
  const [updateDraftProfile, { loading, error }] = useMutation(
    UPDATE_DRAFT_PROFILE_MUTATION,
    {
      onCompleted: () => {
        navigate(routes.draftProfiles())
        addMessage('DraftProfile updated.', { classes: 'rw-flash-success' })
      },
    }
  )

  const onSave = (input, id) => {
    updateDraftProfile({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit DraftProfile {draftProfile.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <DraftProfileForm
          draftProfile={draftProfile}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
