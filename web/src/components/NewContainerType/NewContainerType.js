import { useMutation, useFlash } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import ContainerTypeForm from 'src/components/ContainerTypeForm'

const CREATE_CONTAINER_TYPE_MUTATION = gql`
  mutation CreateContainerTypeMutation($input: CreateContainerTypeInput!) {
    createContainerType(input: $input) {
      id
    }
  }
`

const NewContainerType = () => {
  const { addMessage } = useFlash()
  const [createContainerType, { loading, error }] = useMutation(
    CREATE_CONTAINER_TYPE_MUTATION,
    {
      onCompleted: () => {
        navigate(routes.containerTypes())
        addMessage('ContainerType created.', { classes: 'rw-flash-success' })
      },
    }
  )

  const onSave = (input) => {
    createContainerType({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New ContainerType</h2>
      </header>
      <div className="rw-segment-main">
        <ContainerTypeForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewContainerType
