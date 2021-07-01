import { useMutation, useFlash } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import MetaForm from 'src/components/MetaForm'

const CREATE_META_MUTATION = gql`
  mutation CreateMetaMutation($input: CreateMetaInput!) {
    createMeta(input: $input) {
      id
    }
  }
`

const NewMeta = () => {
  const { addMessage } = useFlash()
  const [createMeta, { loading, error }] = useMutation(CREATE_META_MUTATION, {
    onCompleted: () => {
      navigate(routes.metas())
      addMessage('Meta created.', { classes: 'rw-flash-success' })
    },
  })

  const onSave = (input) => {
    createMeta({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Meta</h2>
      </header>
      <div className="rw-segment-main">
        <MetaForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewMeta
