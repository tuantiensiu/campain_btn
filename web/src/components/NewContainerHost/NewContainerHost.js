import { useMutation, useFlash } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import ContainerHostForm from 'src/components/ContainerHostForm'

const CREATE_CONTAINER_HOST_MUTATION = gql`
  mutation CreateContainerHostMutation($input: CreateContainerHostInput!) {
    createContainerHost(input: $input) {
      id
    }
  }
`

const NewContainerHost = () => {
  const { addMessage } = useFlash()
  const [createContainerHost, { loading, error }] = useMutation(
    CREATE_CONTAINER_HOST_MUTATION,
    {
      onCompleted: () => {
        navigate(routes.containerHosts())
        addMessage('ContainerHost created.', { classes: 'rw-flash-success' })
      },
    }
  )

  const onSave = (input) => {
    createContainerHost({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New ContainerHost</h2>
      </header>
      <div className="rw-segment-main">
        <ContainerHostForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewContainerHost
