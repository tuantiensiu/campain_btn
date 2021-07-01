import { useMutation, useFlash } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import ContainerForm from 'src/components/ContainerForm'

const CREATE_CONTAINER_MUTATION = gql`
  mutation CreateContainerMutation($input: CreateContainerInput!) {
    createContainer(input: $input) {
      id
    }
  }
`

const NewContainer = () => {
  const { addMessage } = useFlash()
  const [createContainer, { loading, error }] = useMutation(
    CREATE_CONTAINER_MUTATION,
    {
      onCompleted: () => {
        navigate(routes.containers())
        addMessage('Container created.', { classes: 'rw-flash-success' })
      },
    }
  )

  const onSave = (input) => {
    createContainer({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Container</h2>
      </header>
      <div className="rw-segment-main">
        <ContainerForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewContainer
