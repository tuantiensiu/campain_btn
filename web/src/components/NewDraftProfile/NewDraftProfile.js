import { useMutation, useFlash } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import DraftProfileForm from 'src/components/DraftProfileForm'

const CREATE_DRAFT_PROFILE_MUTATION = gql`
  mutation CreateDraftProfileMutation($input: CreateDraftProfileInput!) {
    createDraftProfile(input: $input) {
      id
    }
  }
`

const NewDraftProfile = () => {
  const { addMessage } = useFlash()
  const [createDraftProfile, { loading, error }] = useMutation(
    CREATE_DRAFT_PROFILE_MUTATION,
    {
      onCompleted: () => {
        navigate(routes.draftProfiles())
        addMessage('DraftProfile created.', { classes: 'rw-flash-success' })
      },
    }
  )

  const onSave = (input) => {
    createDraftProfile({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New DraftProfile</h2>
      </header>
      <div className="rw-segment-main">
        <DraftProfileForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewDraftProfile
